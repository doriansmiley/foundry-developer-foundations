import { Project, SourceFile, Node, SyntaxKind } from 'ts-morph';
import * as fs from 'fs';
import * as path from 'path';

type SearchInFileForFunctionUsageArgs = {
  path: string;
  functionName: string;
  clientReference: string;
};

type FunctionUsageMatch = {
  line: number;
  column: number;
  text: string;
  variableName: string;
  fullStatement: string;
};

type SearchInFileResult = {
  found: boolean;
  matches: FunctionUsageMatch[];
  clientVariables: string[];
  summary: string;
};

export function searchInFileForFunctionUsage({
  path: filePath,
  functionName, // officeService.sendEmail
  clientReference, // const officeService =container.getAsync<OfficeService>(TYPES.OfficeService)
}: SearchInFileForFunctionUsageArgs): SearchInFileResult {
  try {
    const cwd = process.cwd();

    let absolutePath: string;

    if (path.isAbsolute(filePath)) {
      absolutePath = filePath;
    } else if (filePath.startsWith('packages/')) {
      // This is a path relative to the repository root
      // Find the repo root by looking for the workspace root
      const repoRoot = findRepoRoot(cwd);
      absolutePath = path.resolve(repoRoot, filePath);
    } else {
      // This is a path relative to current directory
      absolutePath = path.resolve(cwd, filePath);
    }

    // Check if file exists
    if (!fs.existsSync(absolutePath)) {
      return {
        found: false,
        matches: [],
        clientVariables: [],
        summary: `File not found: ${absolutePath}`,
      };
    }

    // Create ts-morph project
    const project = new Project({
      useInMemoryFileSystem: true,
      compilerOptions: {
        allowJs: true,
        checkJs: false,
        allowSyntheticDefaultImports: true,
        esModuleInterop: true,
      },
    });

    // Add the file to the project
    let sourceFile: SourceFile;
    try {
      sourceFile = project.addSourceFileAtPath(absolutePath);
    } catch (morphError) {
      try {
        const fileContent = fs.readFileSync(absolutePath, 'utf-8');
        sourceFile = project.createSourceFile(absolutePath, fileContent);
      } catch (altError) {
        console.error(`Failed to add file in file search:`, altError);
        return {
          found: false,
          matches: [],
          clientVariables: [],
          summary: `ts-morph error: ${
            morphError instanceof Error ? morphError.message : 'Unknown error'
          }`,
        };
      }
    }

    // Step 1: Find variables that are assigned from the client reference
    const clientVariables = findClientVariables(sourceFile, clientReference);

    // Step 2: Find function calls on those variables
    const matches = findFunctionCalls(
      sourceFile,
      clientVariables,
      functionName
    );

    const summary = `Searched ${path.basename(
      absolutePath
    )} for ${functionName} usage:
  - Client variables found: ${clientVariables.length} (${clientVariables.join(
      ', '
    )})
  - Function calls found: ${matches.length}`;

    return {
      found: matches.length > 0,
      matches,
      clientVariables,
      summary,
    };
  } catch (error) {
    console.error(`Error analyzing file ${filePath}:`, error);
    return {
      found: false,
      matches: [],
      clientVariables: [],
      summary: `Error analyzing file: ${
        error instanceof Error ? error.message : 'Unknown error'
      }`,
    };
  }
}

function findClientVariables(
  sourceFile: SourceFile,
  clientReference: string
): string[] {
  const clientVariables: string[] = [];

  // Use traversal to find ALL variable declarations in the file
  sourceFile.forEachDescendant((node) => {
    // Check if this is a variable declaration
    if (Node.isVariableDeclaration(node)) {
      const initializer = node.getInitializer();
      if (initializer) {
        const varName = node.getName();
        const initializerText = initializer
          .getText()
          .replace(/\s+/g, ' ')
          .trim();
        // remove formatting spaces
        const normalizedClientRef = clientReference.replace(/\s+/g, ' ').trim();

        // Check for exact match or await version
        const directMatch =
          initializerText.includes(normalizedClientRef) ||
          initializerText.includes(`await ${normalizedClientRef}`);
        const flexibleMatch = containsClientReference(
          initializerText,
          normalizedClientRef
        );

        if (directMatch || flexibleMatch) {
          if (!clientVariables.includes(varName)) {
            clientVariables.push(varName);
          }
        }
      }
    }
  });

  return clientVariables;
}

function containsClientReference(
  initializerText: string,
  clientReference: string
): boolean {
  // Remove 'await' prefix for comparison
  const cleanInitializer = initializerText.replace(/^await\s+/, '');
  const cleanReference = clientReference.replace(/^await\s+/, '');

  // Check for exact match
  if (cleanInitializer === cleanReference) {
    return true;
  }

  // Check for container patterns
  if (
    clientReference.includes('container.getAsync') ||
    clientReference.includes('container.get')
  ) {
    const containerPattern =
      /container\.(getAsync|get)<([^>]+)>\s*\(\s*([^)]+)\s*\)/;
    const initMatch = cleanInitializer.match(containerPattern);
    const refMatch = cleanReference.match(containerPattern);

    if (initMatch && refMatch) {
      const methodMatch = initMatch[1] === refMatch[1];
      const typeMatch = initMatch[2].trim() === refMatch[2].trim();
      const paramMatch = initMatch[3].trim() === refMatch[3].trim();

      // Compare method, type, and parameter
      const result = methodMatch && typeMatch && paramMatch;
      return result;
    }
  }

  // TODO add more client reference patterns e.g for makeGSuiteClient or other client patterns usages if needed
  // most likely they will be catched with exact match, but if there will specific like container we can add it here
  return false;
}

function findFunctionCalls(
  sourceFile: SourceFile,
  clientVariables: string[],
  functionName: string
): FunctionUsageMatch[] {
  const matches: FunctionUsageMatch[] = [];

  if (clientVariables.length === 0) {
    return matches;
  }

  // Find all call expressions in the file
  sourceFile
    .getDescendantsOfKind(SyntaxKind.CallExpression)
    .forEach((callExpression) => {
      const expression = callExpression.getExpression();

      // Check if it's a property access expression (e.g., officeService.sendEmail)
      if (Node.isPropertyAccessExpression(expression)) {
        const objectName = expression.getExpression().getText();
        const propertyName = expression.getName();

        // Check if the object is one of our client variables and property matches function name
        if (
          clientVariables.includes(objectName) &&
          propertyName === functionName
        ) {
          const startLinePos = sourceFile.getLineAndColumnAtPos(
            callExpression.getStart()
          );
          const fullStatement = getFullStatement(callExpression);

          matches.push({
            line: startLinePos.line,
            column: startLinePos.column,
            text: callExpression.getText(),
            variableName: objectName,
            fullStatement,
          });
        }
      }
    });

  return matches;
}

function getFullStatement(node: Node): string {
  // Walk up the tree to find the full statement
  let current: Node = node;
  while (current.getParent() && !Node.isStatement(current)) {
    current = current.getParent()!;
  }

  // If we found a statement, return its text, otherwise return the node text
  return Node.isStatement(current)
    ? current.getText().trim()
    : node.getText().trim();
}

// Helper function to search multiple files for function usage
export function searchMultipleFilesForFunctionUsage(
  filePaths: string[],
  functionName: string,
  clientReference: string
): Record<string, SearchInFileResult> {
  const results: Record<string, SearchInFileResult> = {};

  filePaths.forEach((filePath) => {
    results[filePath] = searchInFileForFunctionUsage({
      path: filePath,
      functionName,
      clientReference,
    });
  });

  return results;
}

// Helper function to extract client references from grep results
export function extractClientReferencesFromGrepResults(
  grepResults: any[]
): string[] {
  const references = new Set<string>();

  grepResults.forEach((result: any) => {
    result.matches?.forEach((match: any) => {
      // Extract container.getAsync patterns
      const containerMatch = match.content.match(
        /container\.(getAsync|get)<[^>]+>\([^)]+\)/
      );
      if (containerMatch) {
        references.add(containerMatch[0]);
      }

      // Extract makeGSuiteClient patterns
      const gsuiteMatch = match.content.match(/makeGSuiteClient(V2)?\([^)]*\)/);
      if (gsuiteMatch) {
        references.add(gsuiteMatch[0]);
      }
    });
  });

  return Array.from(references);
}

// Helper function to find the repository root
function findRepoRoot(currentDir: string): string {
  let dir = currentDir;

  // Look for package.json or nx.json or .git to identify repo root
  while (dir !== path.dirname(dir)) {
    const packageJsonPath = path.join(dir, 'package.json');
    const nxJsonPath = path.join(dir, 'nx.json');
    const gitPath = path.join(dir, '.git');

    if (fs.existsSync(nxJsonPath) || fs.existsSync(gitPath)) {
      return dir;
    }

    // Also check if package.json has workspaces (indicating it's the root)
    if (fs.existsSync(packageJsonPath)) {
      try {
        const packageJson = JSON.parse(
          fs.readFileSync(packageJsonPath, 'utf-8')
        );
        if (packageJson.workspaces) {
          return dir;
        }
      } catch (error) {
        // Continue searching
      }
    }

    dir = path.dirname(dir);
  }

  // Fallback: assume we're in packages/x-reason and go up 2 levels
  return path.resolve(currentDir, '../..');
}
