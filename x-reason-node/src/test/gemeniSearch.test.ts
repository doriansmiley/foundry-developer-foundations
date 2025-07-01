import dotenv from 'dotenv';

dotenv.config();

import { gemeniStockMarketConditions } from '@xreason/services/gemeniStockMarketConditions'; // Adjust the path

describe('gemeniStockMarketConditions', () => {

    afterAll(() => {
        jest.clearAllMocks()
    });
    // TODO get this test passing after we come up with a solution for Playwright
    xit('should return search results for a valid query', async () => {
        const query = 'What are the current market conditions including key indices such as volatility, SPX, SPY, QQQ including todays top movers and losers. Your report should include a table for each index mentioned. Seperate sections for Top Gainers, Top Losers, and Sector performers.';
        try {
            const results = await gemeniStockMarketConditions(query);

            expect(results).toBeDefined();
            expect(results?.length).toBeGreaterThan(0);

        } catch (error) {
            console.error("Test Failed:", error);
            throw error;
        }
    }, 120000);

});
