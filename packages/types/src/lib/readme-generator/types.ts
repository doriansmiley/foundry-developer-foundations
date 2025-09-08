// src/types.ts
export type FilePath = string;

export type ExportedSymbol = {
    name: string;
    kind: 'function' | 'class' | 'const' | 'type' | 'enum' | 'interface' | 'variable' | 'namespace' | 'unknown';
    signature?: string;
    isDefault?: boolean;
    jsDoc?: string;
    sourceFile?: FilePath;
};

export type WorkedExample = {
    title: string;
    file: FilePath;
    startLine?: number;
    endLine?: number;
    inputSnippet?: string;
    outputSnippet?: string;
    notes?: string;
};

export type PracticeProblem = {
    title: string;
    file?: FilePath;
    description: string;
    promptTemplate: string;
    answerKey?: string; // or pointer to oracle/fixture
    judgeNotes?: string;
};

export type EnvVar = {
    name: string;
    required: boolean;
    defaultValue?: string;
    files: FilePath[];
    notes?: string;
};

export type NxDeps = {
    projectName: string;
    tags?: string[];
    dependencies: string[];      // outbound (this -> others)
    dependents: string[];        // inbound (others -> this)
    fileGraph?: Record<string, string[]>;
};

export type EntryPointSummary = {
    entryFile: FilePath;
    projectRoot: FilePath;
    tsconfigPath?: FilePath;
};

export type CodeFileSummary = {
    file: FilePath;
    sizeBytes: number;
    numLines: number;
    exported: ExportedSymbol[];
};

export type Exposition = {
    purpose?: string;
    architecture?: string;
    invariants?: string[];
    failureModes?: string[];
    performanceNotes?: string[];
    additionalNotes?: string[];
};

export type ReadmeContext = {
    entry: EntryPointSummary;
    files: CodeFileSummary[];
    importTree: FilePath[];
    nx: NxDeps | null;
    env: EnvVar[];
    worked: WorkedExample[];
    practice: PracticeProblem[];
    exposition: Exposition;
    unknowns: string[];
    projectConfig?: ProjectConfigSummary;
};

export type ReadmeInputForTemplate = {
    expositionMd: string;
    workedSFT: WorkedExample[];
    practiceRL: PracticeProblem[];
    syntheticGenerators: Array<{
        name: string;
        description: string;
        params: Record<string, string>;
        oracleDescription?: string;
    }>;
    indexingPlan: {
        chunking: string;
        ids: string;
        embeddings: string;
        crossReferences: string;
    };
    apiSurface: ExportedSymbol[];
    envTable: EnvVar[];
    nxSummary: {
        projectName: string;
        dependencies: string[];
        dependents: string[];
        notes?: string;
    } | null;
    gapsAndQuestions: string[];
    projectConfig?: ProjectConfigSummary;
    toolCallingTasks?: ToolCallingTask[];
    currentUserEmail?: string;
    entryExportedFunctions?: string[];
    entryFile?: string;
};

export type AssembleOptions = {
    askUserIfInsufficient?: boolean;
    maxFiles?: number;
    includePrivate?: boolean;
    cwd?: string;
};

export type Ctx = {
    // inputs
    entryFile: string;
    tsconfigPath?: string;

    // gathered
    projectRoot?: string;
    nx?: NxDeps | null;
    importTree: string[];
    files: CodeFileSummary[];
    apiSurface: ExportedSymbol[];
    worked: WorkedExample[];
    practice: PracticeProblem[];
    env: EnvVar[];
    exposition: Exposition;
    unknowns: string[];
    projectConfig?: ProjectConfigSummary;

    // synthesized
    readmeInput?: ReadmeInputForTemplate;
    readmeMarkdown?: string;

    // execution
    error?: string;
};

// ✱ ADD these near your other types

export type PackageJsonSummary = {
    path: string;
    name?: string;
    version?: string;
    private?: boolean;
    scripts?: Record<string, string>;
    dependencies?: Record<string, string>;
    devDependencies?: Record<string, string>;
    peerDependencies?: Record<string, string>;
};

export type TsConfigSummary = {
    path: string;
    extends?: string;
    compilerOptions?: Partial<{
        target: string;
        module: string;
        baseUrl: string;
        rootDir: string;
        outDir: string;
        paths: Record<string, string[]>;
        jsx: string;
        moduleResolution: string;
        strict: boolean;
    }>;
};

export type ProjectJsonSummary = {
    path: string;
    name?: string;
    sourceRoot?: string;
    tags?: string[];
    targets?: string[]; // just the target names
};

export type ProjectConfigSummary = {
    packageJson?: PackageJsonSummary;
    tsconfigs: TsConfigSummary[];
    projectJson?: ProjectJsonSummary;
    jestConfigs: string[];   // paths only
    eslintConfigs: string[]; // paths only
    envFiles: string[];      // .env, .env.local, etc (paths only)
};

export type ToolCallingTask = {
    tool: string;
    question: string;
    answerCode: string;
    notes?: string;
};

