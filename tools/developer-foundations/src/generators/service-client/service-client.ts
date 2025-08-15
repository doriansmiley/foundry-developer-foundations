import {
  formatFiles,
  generateFiles,
  getProjects,
  Tree,
  logger,
} from '@nx/devkit';
import * as path from 'path';
import { ServiceClientGeneratorSchema } from './schema';

export async function serviceClientGenerator(
  tree: Tree,
  options: ServiceClientGeneratorSchema
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

  logger.info(`Adding client '${options.name}' to service '${projectName}'`);

  const templateOptions = {
    ...options,
    projectName,
    capitalizedName: capitalize(options.name),
    template: '',
  };

  const clientsPath = `${serviceProject.root}/src/lib/clients`;
  const testsPath = `${serviceProject.root}/src/lib/tests/clients`;

  // Generate client file
  generateFiles(
    tree,
    path.join(__dirname, 'files', 'client'),
    clientsPath,
    templateOptions
  );

  // Generate test file
  generateFiles(
    tree,
    path.join(__dirname, 'files', 'test'),
    testsPath,
    templateOptions
  );

  // Update clients index.ts if it exists
  const clientsIndexPath = `${serviceProject.root}/src/lib/clients/index.ts`;
  if (tree.exists(clientsIndexPath)) {
    const currentContent = tree.read(clientsIndexPath, 'utf-8') || '';
    const exportLine = `export * from './${options.name}';`;

    // Only add if not already present
    if (!currentContent.includes(exportLine)) {
      const newContent = currentContent.trim() + '\n' + exportLine + '\n';
      tree.write(clientsIndexPath, newContent);
    }
  } else {
    // Create the clients index.ts if it doesn't exist
    const exportLine = `export * from './${options.name}';\n`;
    tree.write(clientsIndexPath, exportLine);
  }

  await formatFiles(tree);
}

function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export default serviceClientGenerator;
