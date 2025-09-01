import { execSync } from 'child_process';
import * as fs from 'fs/promises';
import * as path from 'path';

type Args = {
  projectName: string;
};

type DependentPackage = {
  name: string;
  path: string;
  type: 'lib' | 'app' | 'e2e';
};

type NxGraphNode = {
  name: string;
  type: string;
  data: {
    root: string;
    projectType?: string;
  };
};

type NxGraphDependency = {
  source: string;
  target: string;
  type: string;
};

type NxGraph = {
  graph: {
    nodes: Record<string, NxGraphNode>;
    dependencies: Record<string, NxGraphDependency[]>;
  };
};

// search for all packages that depend on the given package
export async function getDependantNxPackages({
  projectName,
}: Args): Promise<DependentPackage[]> {
  try {
    // Generate the dependency graph and save to temp file
    const tempGraphPath = '/tmp/nx-graph.json';

    execSync(`npx nx graph --file=${tempGraphPath}`, {
      encoding: 'utf-8',
      cwd: process.cwd(),
    });

    // Read and parse the graph
    const graphContent = await fs.readFile(tempGraphPath, 'utf-8');
    const graphData: NxGraph = JSON.parse(graphContent);

    // Access the correct nested structure
    const graph = graphData.graph;
    const nodes = graph.nodes;
    const dependencies = graph.dependencies;

    if (!dependencies || !nodes) {
      throw new Error('Invalid graph structure: missing dependencies or nodes');
    }

    // Find all projects that depend on the target project
    const dependents: DependentPackage[] = [];

    // Look through all project dependencies to find ones that target our project
    for (const [sourceProject, deps] of Object.entries(dependencies)) {
      // Check if this project has a dependency targeting our project
      const dependsOnTarget = deps.some(
        (dep) =>
          dep.target === projectName ||
          // Handle exact matches first, then partial matches
          (projectName.includes('-') && dep.target === projectName) ||
          (!projectName.includes('-') && dep.target.includes(projectName))
      );

      if (dependsOnTarget && sourceProject !== projectName) {
        const nodeInfo = nodes[sourceProject];
        if (nodeInfo) {
          dependents.push({
            name: sourceProject,
            path: nodeInfo.data.root,
            type: (nodeInfo.data.projectType || nodeInfo.type || 'lib') as
              | 'lib'
              | 'app'
              | 'e2e',
          });
        }
      }
    }

    // Clean up temp file
    try {
      await fs.unlink(tempGraphPath);
    } catch (error) {
      // Ignore cleanup errors
    }

    console.log(
      `Found ${dependents.length} dependents for "${projectName}" via Nx graph`
    );
    return dependents;
  } catch (error) {
    console.error('Failed to get Nx dependency graph:', error);

    // Fallback: scan package.json files for dependencies
    console.log('Falling back to package.json scanning...');
    return await scanPackageJsonForDependents(projectName);
  }
}

// Fallback method to scan package.json files
async function scanPackageJsonForDependents(
  projectName: string
): Promise<DependentPackage[]> {
  const dependents: DependentPackage[] = [];
  const packagesDir = path.join(process.cwd(), 'packages');

  try {
    const categories = await fs.readdir(packagesDir);

    for (const category of categories) {
      const categoryPath = path.join(packagesDir, category);
      const stat = await fs.stat(categoryPath);

      if (stat.isDirectory()) {
        // Check if it's a direct package with package.json
        const packageJsonPath = path.join(categoryPath, 'package.json');

        try {
          await fs.access(packageJsonPath);
          const hasTargetDep = await checkPackageForDependency(
            packageJsonPath,
            projectName
          );
          if (hasTargetDep) {
            dependents.push({
              name: category,
              path: `packages/${category}`,
              type: 'lib',
            });
          }
        } catch {
          // No package.json, check subdirectories
          try {
            const subDirs = await fs.readdir(categoryPath);
            for (const subDir of subDirs) {
              const subPackageJsonPath = path.join(
                categoryPath,
                subDir,
                'package.json'
              );
              try {
                await fs.access(subPackageJsonPath);
                const hasTargetDep = await checkPackageForDependency(
                  subPackageJsonPath,
                  projectName
                );
                if (hasTargetDep) {
                  dependents.push({
                    name: `${category}-${subDir}`,
                    path: `packages/${category}/${subDir}`,
                    type: 'lib',
                  });
                }
              } catch {
                // Skip if can't read
              }
            }
          } catch {
            // Skip if can't read subdirectories
          }
        }
      }
    }
  } catch (error) {
    console.error('Failed to scan package.json files:', error);
  }

  console.log(
    `Found ${dependents.length} dependents for "${projectName}" via package.json scanning`
  );
  return dependents;
}

async function checkPackageForDependency(
  packageJsonPath: string,
  targetProject: string
): Promise<boolean> {
  try {
    const packageJson = JSON.parse(await fs.readFile(packageJsonPath, 'utf-8'));
    const allDeps = {
      ...packageJson.dependencies,
      ...packageJson.devDependencies,
      ...packageJson.peerDependencies,
    };

    // Look for exact package name matches first
    const exactMatch = Object.keys(allDeps).some((dep) => {
      // Convert project name to expected package name format
      const expectedPackageName = `@codestrap/developer-foundations-services-${targetProject}`;
      const alternativePackageName = `@codestrap/developer-foundations-${targetProject}`;

      return (
        dep === expectedPackageName ||
        dep === alternativePackageName ||
        dep.endsWith(`-${targetProject}`) ||
        dep === targetProject
      );
    });

    return exactMatch;
  } catch (error) {
    return false;
  }
}
