// src/analyzers/nxGraph.ts
import * as fs from 'fs';
import * as path from 'path';
import { NxDeps } from '@codestrap/developer-foundations-types';
import { execSync } from 'child_process';

function findRepoRoot(start: string): string {
    let dir = path.resolve(start);
    for (; ;) {
        if (fs.existsSync(path.join(dir, 'nx.json')) || fs.existsSync(path.join(dir, 'workspace.json'))) return dir;
        const up = path.dirname(dir);
        if (up === dir) return start;
        dir = up;
    }
}

export function findOwningProject(entryFile: string): { projectName: string; projectRoot: string } | null {
    const repo = findRepoRoot(path.dirname(entryFile));
    const projectJsonCandidates: string[] = [];

    // naive scan: go up from entry file looking for nearest project.json
    let dir = path.dirname(path.resolve(entryFile));
    while (true) {
        const pj = path.join(dir, 'project.json');
        if (fs.existsSync(pj)) {
            projectJsonCandidates.push(pj);
            break;
        }
        const up = path.dirname(dir);
        if (up === dir || !dir.startsWith(repo)) break;
        dir = up;
    }

    if (projectJsonCandidates.length) {
        const pj = JSON.parse(fs.readFileSync(projectJsonCandidates[0], 'utf8'));
        const projectRoot = path.dirname(projectJsonCandidates[0]);
        const projectName = pj.name ?? path.basename(projectRoot);
        return { projectName, projectRoot };
    }

    // fallback: try apps/* or packages/* inference
    const m = /(?:apps|packages)[/\\]([^/\\]+)/.exec(entryFile);
    if (m) {
        const projectRoot = path.join(repo, m[0]);
        const projectName = m[1];
        return { projectName, projectRoot };
    }

    return null;
}

export function readNxDeps(projectName: string, repoRoot: string): NxDeps | null {
    try {
        const jsonPath = path.join(repoRoot, 'project-graph.json');
        if (!fs.existsSync(jsonPath)) {
            // generate once (no scaffolding; safe in CI/local)
            execSync('npx nx graph --file=project-graph.json --focus ' + projectName, {
                cwd: repoRoot,
                stdio: 'ignore',
            });
        }
        const graph = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
        const nodes = graph.nodes || graph.projects || {};
        const deps = graph.dependencies || {};

        const node = nodes[projectName];
        if (!node) return null;

        const outbound = (deps[projectName] || [])
            .map((d: any) => d.target)
            .filter((x: string) => !!x);

        // inbound (dependents): scan all edges
        const inbound: string[] = [];
        for (const [src, arr] of Object.entries<any>(deps)) {
            if ((arr || []).some((e: any) => e.target === projectName)) inbound.push(src);
        }

        return {
            projectName,
            tags: node.data?.tags || node.data?.metadata?.tags || [],
            dependencies: outbound,
            dependents: inbound,
            fileGraph: undefined,
        };
    } catch {
        return null;
    }
}
