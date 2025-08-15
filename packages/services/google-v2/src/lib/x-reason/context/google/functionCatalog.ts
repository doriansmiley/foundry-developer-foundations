import {
  Context,
  MachineEvent,
  Task,
  ActionType,
} from '@codestrap/developer-foundations-types';
import { execSync } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';

function getPayload(context: Context, result: Record<string, any>) {
  const stateId = context.stack?.[context.stack?.length - 1];
  if (!stateId) {
    throw new Error('Unable to find associated state in the machine stack.');
  }
  const payload = {
    stateId,
    [stateId]: {
      // we destructure to preserve other keys like result which holds values from user interaction
      ...context[stateId],
      ...result,
    },
  };

  return payload;
}

export function getFunctionCatalog(dispatch: (action: ActionType) => void) {
  return new Map<string, Task>([
    [
      'listCapabilities',
      {
        description:
          'Scan workspace to enumerate existing Google SDK functions and clients',
        implementation: async (
          context: Context,
          event?: MachineEvent,
          task?: string
        ) => {
          try {
            console.log('Listing Google SDK capabilities...');

            // Scan for existing functions and clients
            const workspaceRoot = process.cwd();
            const googleServicePath = path.join(
              workspaceRoot,
              'packages/services/google-v2/src/lib'
            );

            const capabilities: {
              functions: Array<{ domain: string; name: string; path: string }>;
              clients: Array<{ name: string; path: string }>;
            } = {
              functions: [],
              clients: [],
            };

            // Scan functions directory
            const functionsPath = path.join(googleServicePath, 'functions');
            if (fs.existsSync(functionsPath)) {
              const domains = fs
                .readdirSync(functionsPath, { withFileTypes: true })
                .filter((dirent) => dirent.isDirectory())
                .map((dirent) => dirent.name);

              for (const domain of domains) {
                const domainPath = path.join(functionsPath, domain);
                const functionFiles = fs
                  .readdirSync(domainPath)
                  .filter(
                    (file) => file.endsWith('.ts') && !file.endsWith('.test.ts')
                  )
                  .map((file) => ({
                    domain,
                    name: file.replace('.ts', ''),
                    path: path.join(domainPath, file),
                  }));
                capabilities.functions.push(...functionFiles);
              }
            }

            // Scan clients directory
            const clientsPath = path.join(googleServicePath, 'clients');
            if (fs.existsSync(clientsPath)) {
              const clientFiles = fs
                .readdirSync(clientsPath)
                .filter(
                  (file) => file.endsWith('.ts') && !file.endsWith('.test.ts')
                )
                .map((file) => ({
                  name: file.replace('.ts', ''),
                  path: path.join(clientsPath, file),
                }));
              capabilities.clients.push(...clientFiles);
            }

            const result = {
              success: true,
              capabilities,
              message: `Found ${capabilities.functions.length} functions and ${capabilities.clients.length} clients`,
            };

            console.log(result);

            const payload = getPayload(context, result);
            dispatch({ type: 'CONTINUE', payload });

            return result;
          } catch (error) {
            console.error('Error listing capabilities:', error);
            dispatch({
              type: 'HALT',
              payload: {
                error: error instanceof Error ? error.message : 'Unknown error',
              },
            });
            throw error;
          }
        },
      },
    ],
    [
      'createFunction',
      {
        description: 'Scaffold a new function using Nx generator',
        implementation: async (
          context: Context,
          event?: MachineEvent,
          task?: string
        ) => {
          try {
            console.log('Creating function scaffold...');

            const params = context['createFunction'] || {};
            const { domain, name, options = {} } = params;

            if (!domain || !name) {
              throw new Error(
                'Domain and name are required for createFunction'
              );
            }

            // Run Nx generator to scaffold function
            const command = `nx generate @codestrap/developer-foundations:service-function --name=${name} --serviceLib=google-service-v2 --path=${domain}`;
            console.log(`Running: ${command}`);

            const output = execSync(command, {
              cwd: process.cwd(),
              encoding: 'utf8',
              stdio: 'pipe',
            });

            // Run tests to ensure scaffold is valid
            const testCommand = `nx affected -t test,lint,typecheck --base=HEAD~1`;
            console.log(`Running tests: ${testCommand}`);
            execSync(testCommand, {
              cwd: process.cwd(),
              encoding: 'utf8',
              stdio: 'pipe',
            });

            const result = {
              success: true,
              functionPath: `packages/services/google-v2/src/lib/functions/${domain}/${name}.ts`,
              testPath: `packages/services/google-v2/src/lib/tests/${domain}/${name}.test.ts`,
              checkpoint: 'cp:function:created',
              message: `Function ${name} scaffolded successfully in ${domain}`,
            };

            const payload = getPayload(context, result);
            dispatch({ type: 'CONTINUE', payload });

            return result;
          } catch (error) {
            console.error('Error creating function:', error);
            dispatch({
              type: 'HALT',
              payload: {
                error: error instanceof Error ? error.message : 'Unknown error',
              },
            });
            throw error;
          }
        },
      },
    ],
    [
      'implementFunction',
      {
        description: 'Implement logic and unit tests for a scaffolded function',
        implementation: async (
          context: Context,
          event?: MachineEvent,
          task?: string
        ) => {
          try {
            console.log('Implementing function logic...');

            const params = context['implementFunction'] || {};
            const {
              path: functionPath,
              implHints = {},
              testHints = {},
            } = params;

            if (!functionPath) {
              throw new Error(
                'Function path is required for implementFunction'
              );
            }

            // For now, this is a placeholder that adds basic boilerplate
            // Real implementation would analyze implHints and add actual logic
            console.log(`Implementation hints for ${functionPath}:`, implHints);
            console.log(`Test hints for ${functionPath}:`, testHints);

            // Run unit tests for the function
            const testCommand = `nx affected -t test --base=HEAD~1`;
            console.log(`Running function tests: ${testCommand}`);
            execSync(testCommand, {
              cwd: process.cwd(),
              encoding: 'utf8',
              stdio: 'pipe',
            });
            const payload = getPayload(context, {});
            dispatch({ type: 'CONTINUE', payload });
          } catch (error) {
            console.error('Error implementing function:', error);
            dispatch({
              type: 'HALT',
              payload: {
                error: error instanceof Error ? error.message : 'Unknown error',
              },
            });
            throw error;
          }
        },
      },
    ],
    [
      'createClient',
      {
        description: 'Scaffold a new client using Nx generator',
        implementation: async (
          context: Context,
          event?: MachineEvent,
          task?: string
        ) => {
          try {
            console.log('Creating client scaffold...');

            const params = context['createClient'] || {};
            const { domain, name, options = {} } = params;

            if (!name) {
              throw new Error('Name is required for createClient');
            }

            // Run Nx generator to scaffold client
            const command = `nx generate @codestrap/developer-foundations:service-client --name=${name} --serviceLib=google-v2`;
            console.log(`Running: ${command}`);

            const output = execSync(command, {
              cwd: process.cwd(),
              encoding: 'utf8',
              stdio: 'pipe',
            });

            // Run tests to ensure scaffold is valid
            const testCommand = `nx affected -t test,lint,typecheck --base=HEAD~1`;
            console.log(`Running tests: ${testCommand}`);
            execSync(testCommand, {
              cwd: process.cwd(),
              encoding: 'utf8',
              stdio: 'pipe',
            });

            const result = {
              success: true,
              clientPath: `packages/services/google-v2/src/lib/clients/${name}.ts`,
              testPath: `packages/services/google-v2/src/lib/tests/clients/${name}.test.ts`,
              checkpoint: 'cp:client:created',
              message: `Client ${name} scaffolded successfully`,
            };

            const payload = getPayload(context, result);
            dispatch({ type: 'CONTINUE', payload });

            return result;
          } catch (error) {
            console.error('Error creating client:', error);
            dispatch({
              type: 'HALT',
              payload: {
                error: error instanceof Error ? error.message : 'Unknown error',
              },
            });
            throw error;
          }
        },
      },
    ],
    [
      'implementClient',
      {
        description:
          'Implement auth/transport wiring and minimal behavior for a scaffolded client',
        implementation: async (
          context: Context,
          event?: MachineEvent,
          task?: string
        ) => {
          try {
            console.log('Implementing client auth/transport...');

            const params = context['implementClient'] || {};
            const {
              path: clientPath,
              methods = [],
              transportHints = {},
              authHints = {},
            } = params;

            if (!clientPath) {
              throw new Error('Client path is required for implementClient');
            }

            // For now, this is a placeholder that logs the implementation details
            // Real implementation would analyze hints and add actual auth/transport logic
            console.log(`Client path: ${clientPath}`);
            console.log(`Methods to implement: ${methods.join(', ')}`);
            console.log(`Transport hints:`, transportHints);
            console.log(`Auth hints:`, authHints);

            // Run tests for the client
            const testCommand = `nx affected -t test --base=HEAD~1`;
            console.log(`Running client tests: ${testCommand}`);
            execSync(testCommand, {
              cwd: process.cwd(),
              encoding: 'utf8',
              stdio: 'pipe',
            });

            const result = {
              success: true,
              clientPath,
              methods,
              checkpoint: 'cp:client:implemented',
              message: `Client implementation completed for ${clientPath}`,
              note: 'This is first iteration - actual auth/transport logic will be added in subsequent iterations',
            };

            const payload = getPayload(context, result);
            dispatch({ type: 'CONTINUE', payload });

            return result;
          } catch (error) {
            console.error('Error implementing client:', error);
            dispatch({
              type: 'HALT',
              payload: {
                error: error instanceof Error ? error.message : 'Unknown error',
              },
            });
            throw error;
          }
        },
      },
    ],
    [
      'updateClient',
      {
        description: 'Expose a function via an existing client',
        implementation: async (
          context: Context,
          event?: MachineEvent,
          task?: string
        ) => {
          try {
            console.log('Updating client to expose new function...');

            const params = context['updateClient'] || {};
            const { clientPath, exportName, targetFunctionPath } = params;

            if (!clientPath || !exportName || !targetFunctionPath) {
              throw new Error(
                'clientPath, exportName, and targetFunctionPath are required for updateClient'
              );
            }

            // For now, this is a placeholder that logs the update details
            // Real implementation would modify the client file to expose the new function
            console.log(`Client path: ${clientPath}`);
            console.log(`Export name: ${exportName}`);
            console.log(`Target function: ${targetFunctionPath}`);

            // Run tests to ensure updates don't break existing functionality
            const testCommand = `nx affected -t test --base=HEAD~1`;
            console.log(`Running updated client tests: ${testCommand}`);
            execSync(testCommand, {
              cwd: process.cwd(),
              encoding: 'utf8',
              stdio: 'pipe',
            });

            const result = {
              success: true,
              clientPath,
              exportName,
              targetFunctionPath,
              checkpoint: 'cp:client:updated',
              message: `Client ${clientPath} updated to expose ${exportName}`,
              note: 'This is first iteration - actual client modification will be added in subsequent iterations',
            };

            const payload = getPayload(context, result);
            dispatch({ type: 'CONTINUE', payload });

            return result;
          } catch (error) {
            console.error('Error updating client:', error);
            dispatch({
              type: 'HALT',
              payload: {
                error: error instanceof Error ? error.message : 'Unknown error',
              },
            });
            throw error;
          }
        },
      },
    ],
  ]);
}
