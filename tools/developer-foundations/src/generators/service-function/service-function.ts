import {
  formatFiles,
  generateFiles,
  getProjects,
  Tree,
  logger,
} from '@nx/devkit';
import * as path from 'path';
import { ServiceFunctionGeneratorSchema } from './schema';

export async function serviceFunctionGenerator(
  tree: Tree,
  options: ServiceFunctionGeneratorSchema
) {
  const projects = getProjects(tree);

  // Find the service library project
  let serviceProject = null;
  let projectName = '';

  // Try different naming patterns for the service library
  const possibleNames = [
    options.serviceLib,
    `services-${options.serviceLib}`,
    `service-${options.serviceLib}`,
    options.serviceLib.replace('service-', 'services-'),
  ];

  for (const name of possibleNames) {
    if (projects.has(name)) {
      serviceProject = projects.get(name);
      projectName = name;
      break;
    }
  }

  // Also check if it's in packages/services/ directory
  if (!serviceProject) {
    for (const [name, project] of projects.entries()) {
      if (
        name.includes(options.serviceLib) &&
        project.root.includes('packages/services/')
      ) {
        serviceProject = project;
        projectName = name;
        break;
      }
    }
  }

  if (!serviceProject) {
    const availableServices = Array.from(projects.entries())
      .filter(([, project]) => project.root.includes('packages/services/'))
      .map(([name]) => name)
      .join(', ');

    throw new Error(
      `Service library '${options.serviceLib}' not found. Available services: ${availableServices}`
    );
  }

  logger.info(
    `Adding function '${options.name}' to service '${projectName}' at path '${options.path}'`
  );

  const templateOptions = {
    ...options,
    projectName,
    capitalizedName: capitalize(options.name),
    template: '',
  };

  const functionsPath = `${serviceProject.root}/src/lib/functions/${options.path}`;
  const testsPath = `${serviceProject.root}/src/lib/tests/${options.path}`;

  // Generate function file
  generateFiles(
    tree,
    path.join(__dirname, 'files', 'function'),
    functionsPath,
    templateOptions
  );

  // Generate test file
  generateFiles(
    tree,
    path.join(__dirname, 'files', 'test'),
    testsPath,
    templateOptions
  );

  // Update functions index.ts if it exists
  const functionsIndexPath = `${serviceProject.root}/src/lib/functions/index.ts`;
  if (tree.exists(functionsIndexPath)) {
    const currentContent = tree.read(functionsIndexPath, 'utf-8') || '';
    const exportLine = `export * from './${options.path}/${options.name}';`;

    // Only add if not already present
    if (!currentContent.includes(exportLine)) {
      const newContent = currentContent.trim() + '\n' + exportLine + '\n';
      tree.write(functionsIndexPath, newContent);
    }
  } else {
    // Create the functions index.ts if it doesn't exist
    const exportLine = `export * from './${options.path}/${options.name}';\n`;
    tree.write(functionsIndexPath, exportLine);
  }

  // Update path-specific index.ts if it exists
  const pathIndexPath = `${functionsPath}/index.ts`;
  if (tree.exists(pathIndexPath)) {
    const currentContent = tree.read(pathIndexPath, 'utf-8') || '';
    const exportLine = `export * from './${options.name}';`;

    if (!currentContent.includes(exportLine)) {
      const newContent = currentContent.trim() + '\n' + exportLine + '\n';
      tree.write(pathIndexPath, newContent);
    }
  } else {
    // Create the path index.ts if it doesn't exist
    const exportLine = `export * from './${options.name}';\n`;
    tree.write(pathIndexPath, exportLine);
  }

  await formatFiles(tree);
}

function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export default serviceFunctionGenerator;
