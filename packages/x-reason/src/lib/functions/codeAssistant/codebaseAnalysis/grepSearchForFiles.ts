import { execSync } from 'child_process';
import * as rg from '@vscode/ripgrep';

type Args = {
  path: string;
  searchTerm: string;
  fileExtensions: string[];
};

type SearchMatch = {
  line: number;
  content: string;
  byteOffset: number;
};

type Result = {
  path: string;
  matches: SearchMatch[];
  totalMatches: number;
};
export function grepSearchForFiles({
  path: searchPath,
  searchTerm,
  fileExtensions,
}: Args): Result[] {
  try {
    // Validate inputs
    if (!searchTerm.trim()) {
      console.log('Empty search term provided');
      return [];
    }

    if (!fileExtensions || fileExtensions.length === 0) {
      console.log('No file extensions provided');
      return [];
    }

    // Get the bundled ripgrep binary path
    const rgPath = rg.rgPath;

    // Try multiple search strategies to catch different formatting patterns
    const searchStrategies = generateSearchStrategies(searchTerm);

    const allResults = new Map<string, Result>();

    for (const strategy of searchStrategies) {
      const strategyResults = executeSearchStrategy(
        rgPath,
        strategy,
        searchPath,
        fileExtensions
      );

      // Merge results
      strategyResults.forEach((result) => {
        if (allResults.has(result.path)) {
          const existing = allResults.get(result.path)!;
          // Merge matches and avoid duplicates
          const existingLines = new Set(existing.matches.map((m) => m.line));
          const newMatches = result.matches.filter(
            (m) => !existingLines.has(m.line)
          );
          existing.matches.push(...newMatches);
          existing.totalMatches += newMatches.length;
        } else {
          allResults.set(result.path, result);
        }
      });
    }

    const finalResults = Array.from(allResults.values());

    return finalResults;
  } catch (error: any) {
    console.error('All search strategies failed:', error.message);

    // Fallback to basic search if ripgrep fails
    console.log('Falling back to basic file search...');
    return fallbackSearch(searchPath, searchTerm, fileExtensions);
  }
}

type SearchStrategy = {
  description: string;
  pattern: string;
  flags: string[];
};

function generateSearchStrategies(searchTerm: string): SearchStrategy[] {
  const strategies: SearchStrategy[] = [];

  // Strategy 1: Exact match (original behavior)
  strategies.push({
    description: 'Exact match',
    pattern: escapeRegexForRipgrep(searchTerm),
    flags: [],
  });

  // Strategy 2: Flexible whitespace version (fixed escaping)
  const flexiblePattern = searchTerm
    .replace(/\s+/g, '\\s+') // Replace spaces with flexible whitespace
    .replace(/\(/g, '\\(') // Escape parentheses
    .replace(/\)/g, '\\)')
    .replace(/</g, '<') // Don't escape angle brackets - they're literal in most contexts
    .replace(/>/g, '>') // Don't escape angle brackets
    .replace(/\./g, '\\.'); // Escape dots

  strategies.push({
    description: 'Flexible whitespace',
    pattern: flexiblePattern,
    flags: [],
  });

  // Strategy 3: Multi-line pattern (for patterns that might span lines)
  if (searchTerm.includes('(') && searchTerm.includes(')')) {
    const multilinePattern = searchTerm
      .replace(/\s+/g, '[\\s\\n\\r]+') // Allow line breaks in whitespace
      .replace(/\(/g, '\\(')
      .replace(/\)/g, '\\)')
      .replace(/</g, '<') // Keep angle brackets literal
      .replace(/>/g, '>')
      .replace(/\./g, '\\.');

    strategies.push({
      description: 'Multi-line pattern',
      pattern: multilinePattern,
      flags: ['--multiline'],
    });
  }

  // Strategy 4: Function call pattern detection (improved)
  if (searchTerm.includes('(')) {
    const parts = searchTerm.split('(');
    if (parts.length === 2) {
      const functionPart = parts[0].trim();
      const argsPart = parts[1].replace(')', '').trim();

      // Create a pattern that allows line breaks between function and args
      // Properly escape the function part and args part separately
      const escapedFunctionPart = functionPart
        .replace(/\./g, '\\.')
        .replace(/</g, '<')
        .replace(/>/g, '>');
      const escapedArgsPart = argsPart
        .replace(/\./g, '\\.')
        .replace(/</g, '<')
        .replace(/>/g, '>');

      const funcCallPattern = `${escapedFunctionPart}\\s*\\(\\s*${escapedArgsPart}`;

      strategies.push({
        description: 'Function call with line breaks',
        pattern: funcCallPattern,
        flags: ['--multiline'],
      });
    }
  }

  return strategies;
}

function executeSearchStrategy(
  rgPath: string,
  strategy: SearchStrategy,
  searchPath: string,
  fileExtensions: string[]
): Result[] {
  try {
    // Build ripgrep command
    const typeArgs = buildTypeArgs(fileExtensions);

    // Build the full command using the bundled binary
    const command = [
      `"${rgPath}"`,
      `"${strategy.pattern}"`,
      '--json',
      '--line-number',
      '--byte-offset',
      '--no-heading',
      '--with-filename',
      ...strategy.flags,
      typeArgs,
      `"${searchPath}"`,
    ]
      .filter(Boolean)
      .join(' ');

    // Execute ripgrep
    const output = execSync(command, {
      encoding: 'utf-8',
      cwd: process.cwd(),
      maxBuffer: 1024 * 1024 * 10, // 10MB buffer
    });

    // Parse ripgrep JSON output
    const results = parseRipgrepOutput(output);

    return results;
  } catch (error: any) {
    // Handle case where no matches are found (ripgrep exits with code 1)
    if (error.status === 1) {
      return [];
    }

    return [];
  }
}

function buildTypeArgs(fileExtensions: string[]): string {
  // Use ripgrep's built-in type system instead of custom types
  const typeArgs = [];

  for (const ext of fileExtensions) {
    const cleanExt = ext.startsWith('.') ? ext.slice(1) : ext;

    // Map common extensions to ripgrep's built-in types
    switch (cleanExt) {
      case 'ts':
      case 'tsx':
        typeArgs.push('--type ts');
        break;
      case 'js':
      case 'jsx':
        typeArgs.push('--type js');
        break;
      case 'json':
        typeArgs.push('--type json');
        break;
      case 'md':
        typeArgs.push('--type markdown');
        break;
      case 'py':
        typeArgs.push('--type py');
        break;
      case 'rs':
        typeArgs.push('--type rust');
        break;
      default:
        // For extensions without built-in types, use glob pattern
        typeArgs.push(`--glob "*.${cleanExt}"`);
        break;
    }
  }

  // Remove duplicates and join
  return Array.from(new Set(typeArgs)).join(' ');
}

function escapeRegexForRipgrep(searchTerm: string): string {
  // Escape special regex characters for ripgrep
  return searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function parseRipgrepOutput(output: string): Result[] {
  const results = new Map<string, Result>();

  // Split output into lines and parse each JSON object
  const lines = output.trim().split('\n').filter(Boolean);

  for (const line of lines) {
    try {
      const parsed = JSON.parse(line);

      // Only process match objects
      if (parsed.type === 'match') {
        const filePath = parsed.data.path.text;
        const lineNumber = parsed.data.line_number;
        const content = parsed.data.lines.text.trim();
        const byteOffset = parsed.data.absolute_offset;

        // Get or create result for this file
        if (!results.has(filePath)) {
          results.set(filePath, {
            path: filePath,
            matches: [],
            totalMatches: 0,
          });
        }

        const result = results.get(filePath)!;
        result.matches.push({
          line: lineNumber,
          content,
          byteOffset,
        });
        result.totalMatches++;
      }
    } catch (parseError) {}
  }

  return Array.from(results.values());
}

function fallbackSearch(
  searchPath: string,
  searchTerm: string,
  fileExtensions: string[]
): Result[] {
  try {
    // Improved fallback using Node.js fs instead of shell commands
    return nodeJsFallbackSearch(searchPath, searchTerm, fileExtensions);
  } catch (error) {
    console.error('Node.js fallback search failed:', error);
    return [];
  }
}

function nodeJsFallbackSearch(
  searchPath: string,
  searchTerm: string,
  fileExtensions: string[]
): Result[] {
  const fs = require('fs');
  const path = require('path');
  const results = new Map<string, Result>();

  // Create regex for search term
  const regex = new RegExp(searchTerm, 'gi');

  function scanDirectory(dir: string) {
    try {
      const entries = fs.readdirSync(dir, { withFileTypes: true });

      for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);

        if (entry.isDirectory()) {
          scanDirectory(fullPath);
        } else if (entry.isFile()) {
          const ext = path.extname(entry.name).slice(1);
          if (fileExtensions.includes(ext)) {
            try {
              const content = fs.readFileSync(fullPath, 'utf-8');
              const lines = content.split('\n');

              lines.forEach((line: string, index: number) => {
                if (regex.test(line)) {
                  if (!results.has(fullPath)) {
                    results.set(fullPath, {
                      path: fullPath,
                      matches: [],
                      totalMatches: 0,
                    });
                  }

                  const result = results.get(fullPath)!;
                  result.matches.push({
                    line: index + 1,
                    content: line.trim(),
                    byteOffset: 0,
                  });
                  result.totalMatches++;
                }
              });
            } catch (fileError) {
              // Skip files that can't be read
            }
          }
        }
      }
    } catch (dirError) {
      // Skip directories that can't be read
    }
  }

  scanDirectory(searchPath);
  return Array.from(results.values());
}

// Utility function to search for multiple patterns at once
export function grepSearchMultiplePatterns(
  searchPath: string,
  searchTerms: string[],
  fileExtensions: string[]
): Record<string, Result[]> {
  const results: Record<string, Result[]> = {};

  for (const term of searchTerms) {
    results[term] = grepSearchForFiles({
      path: searchPath,
      searchTerm: term,
      fileExtensions,
    });
  }

  return results;
}

// Utility function to get a summary of search results
export function summarizeSearchResults(results: Result[]): {
  totalFiles: number;
  totalMatches: number;
  fileBreakdown: Array<{ path: string; matches: number }>;
} {
  const totalFiles = results.length;
  const totalMatches = results.reduce((sum, r) => sum + r.totalMatches, 0);
  const fileBreakdown = results.map((r) => ({
    path: r.path,
    matches: r.totalMatches,
  }));

  return {
    totalFiles,
    totalMatches,
    fileBreakdown,
  };
}
