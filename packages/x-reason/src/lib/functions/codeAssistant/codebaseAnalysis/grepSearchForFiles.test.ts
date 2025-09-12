import { grepSearchForFiles } from './grepSearchForFiles';
import { searchInFileForFunctionUsage } from './searchInFile';

describe('grepSearch - Playground', () => {
  // Playground tests for different project names
  describe('Manual Testing Playground', () => {
    it('should find search term in codebase', async () => {
      const result = await grepSearchForFiles({
        path: 'packages/x-reason',
        searchTerm: 'container.getAsync<OfficeService>(TYPES.OfficeService)',
        fileExtensions: ['ts', 'tsx'],
      });

      console.log(
        'Result for "sendEmail" in "packages/x-reason":',
        JSON.stringify(result, null, 2)
      );

      // Basic assertion
      expect(Array.isArray(result)).toBe(true);

      // now search for particular function usage
      const functionUsages = result
        .map((r) =>
          searchInFileForFunctionUsage({
            path: r.path,
            functionName: 'sendEmail',
            clientReference:
              'container.getAsync<OfficeService>(TYPES.OfficeService)',
          })
        )
        .filter((r) => r.found);

      console.log(
        'sendEmail usages through DI',
        JSON.stringify(functionUsages, null, 2)
      );

      expect(Array.isArray(functionUsages)).toBe(true);
    });
  });
});
