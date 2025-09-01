import { getDependantNxPackages } from './getDependantNxPackages';

describe('getDependantNxPackages - Playground', () => {
  // Playground tests for different project names
  describe('Manual Testing Playground', () => {
    it('should find dependents for google-services', async () => {
      const result = await getDependantNxPackages({
        projectName: 'google-service',
      });

      console.log(
        'Result for "google-service":',
        JSON.stringify(result, null, 2)
      );
      console.log(`Found ${result.length} dependent packages`);

      // Basic assertion
      expect(Array.isArray(result)).toBe(true);
    });

    it('should test x-reason dependencies', async () => {
      const result = await getDependantNxPackages({ projectName: 'x-reason' });

      console.log('Result for "x-reason":', JSON.stringify(result, null, 2));
      console.log(`Found ${result.length} dependent packages`);

      // Basic assertion
      expect(Array.isArray(result)).toBe(true);
    });
  });
});
