// src/analyzers/tests.ts
import * as fs from 'fs';
import * as path from 'path';
import { PracticeProblem, WorkedExample } from '@codestrap/developer-foundations-types';

const TEST_PATTERNS = [/\.test\.(t|j)sx?$/, /\.spec\.(t|j)sx?$/];

function walk(dir: string, acc: string[] = []): string[] {
    const ents = fs.readdirSync(dir, { withFileTypes: true });
    for (const e of ents) {
        const p = path.join(dir, e.name);
        if (e.isDirectory()) {
            if (e.name === 'node_modules' || e.name.startsWith('.')) continue;
            walk(p, acc);
        } else {
            acc.push(p);
        }
    }
    return acc;
}

function looksLikeTestFile(p: string) {
    return TEST_PATTERNS.some(rx => rx.test(p)) || p.includes(`${path.sep}__tests__${path.sep}`);
}

export function discoverWorkedExamples(projectRoot: string, entryImportHint?: string): WorkedExample[] {
    const files = walk(projectRoot);
    const tests = files.filter(looksLikeTestFile);
    const examples: WorkedExample[] = [];

    for (const tf of tests) {
        const text = fs.readFileSync(tf, 'utf8');
        // crude parse: pull `it("...")`, `test("...")`, `describe("...")`
        const rx = /(it|test|describe)\s*\(\s*(['"`])([\s\S]*?)\2\s*,/g;
        let m: RegExpExecArray | null;
        while ((m = rx.exec(text))) {
            const title = m[3].trim();
            // try to pull a nearby code snippet
            const snippet = text.slice(Math.max(0, m.index - 200), Math.min(text.length, m.index + 600));
            examples.push({
                title,
                file: tf,
                inputSnippet: snippet,
                outputSnippet: undefined,
            });
            if (examples.length > 40) break; // keep it small
        }
    }
    return examples;
}

export function toPracticeProblems(examples: WorkedExample[]): PracticeProblem[] {
    return examples.slice(0, 30).map((ex, i) => ({
        title: `Task ${i + 1}: ${ex.title}`,
        file: ex.file,
        description: `Recreate the behavior demonstrated by the example "${ex.title}".`,
        promptTemplate: `Given code and configuration, perform the operation described in: "${ex.title}".`,
        answerKey: `See assertions in ${path.basename(ex.file)}.`,
        judgeNotes: `Compare output against assertions or snapshots in the source test.`,
    }));
}
