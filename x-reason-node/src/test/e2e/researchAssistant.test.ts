import dotenv from 'dotenv';

dotenv.config();

import { researchAssistant } from '@xreason/services/researchAssistant'; // Adjust the path

if (!process.env.E2E) {
    test.skip("e2e test skipped in default run", () => {
        // won't run
    });
} else {
    describe('researchAssistant', () => {

        afterAll(() => {
            jest.clearAllMocks()
        });
        // TODO get this test passing after we come up with a solution for Playwright
        it('should return search results for a valid query', async () => {
            const query = 'What are the current market conditions including key indices such as volatility, SPX, SPY, QQQ including todays top movers and losers. Your report should include a table for each index mentioned. Seperate sections for Top Gainers, Top Losers, and Sector performers.';
            try {
                const results = await researchAssistant(
                    query,
                    1,
                    'd1',
                    'finance.yahoo.com',
                    'i'
                );

                expect(results).toBeDefined();
                expect(results?.length).toBeGreaterThan(0);

            } catch (error) {
                console.error("Test Failed:", error);
                throw error;
            }
        }, 600000);

    });
}