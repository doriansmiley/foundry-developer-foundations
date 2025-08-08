export interface DataAccessGeneratorSchema {
  name: string;
  mode?: 'new-library' | 'add-dao';
  domain?: string;
  existingLibrary?: string;
  directory?: string;
  importPath?: string;
  isPublic?: boolean;
}
