import {
  formatFiles,
  generateFiles,
  getProjects,
  Tree,
  readProjectConfiguration,
  logger,
  updateProjectConfiguration,
} from '@nx/devkit';
import { libraryGenerator } from '@nx/js';
import * as path from 'path';
import { DataAccessGeneratorSchema } from './schema';

export async function dataAccessGenerator(
  tree: Tree,
  options: DataAccessGeneratorSchema
) {
  if (options.mode === 'new-library') {
    await createNewLibrary(tree, options);
  } else {
    await addDaoToExistingLibrary(tree, options);
  }

  await formatFiles(tree);
}

async function createNewLibrary(
  tree: Tree,
  options: DataAccessGeneratorSchema
) {
  if (!options.domain) {
    throw new Error(
      'Domain is required when creating a new library. Please provide --domain=<domain-name>'
    );
  }

  const libraryName = `data-access-${options.domain}`;
  const directory = `data-access/${options.domain}`;
  const importPath =
    options.importPath || `@codestrap/developer-foundations-${libraryName}`;

  logger.info(
    `Creating new data-access library: ${libraryName} in domain: ${options.domain}`
  );

  // Generate the library using Nx's built-in generator
  await libraryGenerator(tree, {
    name: options.domain, // Use domain as the library name
    directory: `packages/${directory}`,
    importPath,
    buildable: true,
    publishable: options.isPublic,
    testEnvironment: 'node',
    compiler: 'tsc',
    bundler: 'tsc',
    tags: 'type:data-access',
    strict: true,
    linter: 'eslint',
    unitTestRunner: 'jest',
    skipFormat: false,
    skipTsConfig: false,
  });

  // Update the project configuration to use our desired project name
  const generatedConfig = readProjectConfiguration(tree, options.domain);

  // Add the new project configuration with the correct name
  updateProjectConfiguration(tree, libraryName, {
    ...generatedConfig,
    name: libraryName,
  });

  // Update package.json with our dependencies
  const projectRoot = `packages/${directory}`;
  const packageJsonPath = `${projectRoot}/package.json`;

  if (tree.exists(packageJsonPath)) {
    const packageJson = JSON.parse(tree.read(packageJsonPath, 'utf-8'));

    // Update the name to follow our convention
    packageJson.name = importPath;

    // Add our standard dependencies
    packageJson.dependencies = {
      ...packageJson.dependencies,
      '@codestrap/developer-foundations-types': '*',
      '@codestrap/developer-foundations-di': '*',
      tslib: '^2.3.0',
    };

    // Ensure publishConfig is set correctly
    if (options.isPublic) {
      packageJson.publishConfig = {
        access: 'public',
      };
    }

    tree.write(packageJsonPath, JSON.stringify(packageJson, null, 2));
  }

  // Update the project.json to have the correct name
  const projectJsonPath = `${projectRoot}/project.json`;
  if (tree.exists(projectJsonPath)) {
    const projectConfig = JSON.parse(tree.read(projectJsonPath, 'utf-8'));
    projectConfig.name = libraryName;
    tree.write(projectJsonPath, JSON.stringify(projectConfig, null, 2));
  }

  // Remove the default generated files that don't match our pattern
  const defaultLibFile = `${projectRoot}/src/lib/${options.domain}.ts`;
  const defaultSpecFile = `${projectRoot}/src/lib/${options.domain}.spec.ts`;

  if (tree.exists(defaultLibFile)) {
    tree.delete(defaultLibFile);
  }
  if (tree.exists(defaultSpecFile)) {
    tree.delete(defaultSpecFile);
  }

  // Generate initial DAO file using our template
  const templateOptions = {
    ...options,
    domain: options.domain,
    projectName: libraryName,
    packageName: importPath,
    capitalizedName: capitalize(options.name),
    template: '',
  };

  generateFiles(
    tree,
    path.join(__dirname, 'files', 'dao'),
    `${projectRoot}/src/lib`,
    templateOptions
  );

  // Create test directory and generate test file
  generateFiles(
    tree,
    path.join(__dirname, 'files', 'test'),
    `${projectRoot}/src/lib/test`,
    templateOptions
  );

  // Update index.ts to export the DAO (replace default content)
  const indexPath = `${projectRoot}/src/index.ts`;
  const exportLine = `export * from './lib/${options.name}Dao';\n`;
  tree.write(indexPath, exportLine);
}

async function addDaoToExistingLibrary(
  tree: Tree,
  options: DataAccessGeneratorSchema
) {
  const projects = getProjects(tree);
  const dataAccessProjects = Array.from(projects.entries())
    .filter(([, project]) => project.tags?.includes('type:data-access'))
    .map(([name, project]) => ({ name, ...project }));

  if (dataAccessProjects.length === 0) {
    throw new Error(
      'No data-access libraries found. Create one first using the new-library mode.'
    );
  }

  let selectedLibrary = options.existingLibrary;

  // If no library specified, show available libraries and error
  if (!selectedLibrary) {
    const availableLibraries = dataAccessProjects.map((p) => p.name).join(', ');
    throw new Error(
      `Please specify an existing library using --existingLibrary. Available libraries: ${availableLibraries}`
    );
  }

  const project = projects.get(selectedLibrary);
  if (!project) {
    throw new Error(`Library ${selectedLibrary} not found.`);
  }

  if (!project.tags?.includes('type:data-access')) {
    throw new Error(`${selectedLibrary} is not a data-access library.`);
  }

  logger.info(`Adding DAO ${options.name} to ${selectedLibrary}`);

  const templateOptions = {
    ...options,
    projectName: selectedLibrary,
    capitalizedName: capitalize(options.name),
    template: '',
  };

  // Generate DAO file
  generateFiles(
    tree,
    path.join(__dirname, 'files', 'dao'),
    `${project.root}/src/lib`,
    templateOptions
  );

  // Generate test file
  generateFiles(
    tree,
    path.join(__dirname, 'files', 'test'),
    `${project.root}/src/lib/test`,
    templateOptions
  );

  // Update index.ts to export the new DAO
  const indexPath = `${project.root}/src/index.ts`;
  if (tree.exists(indexPath)) {
    const currentContent = tree.read(indexPath, 'utf-8');
    const exportLine = `export * from './lib/${options.name}Dao';\n`;

    // Only add if not already present
    if (!currentContent.includes(exportLine.trim())) {
      tree.write(indexPath, currentContent + exportLine);
    }
  }
}

function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export default dataAccessGenerator;
