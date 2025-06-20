import { Bennie } from "@xreason/Bennie";

if (!process.env.E2E) {
    test.skip("e2e test skipped in default run", () => {
        // won't run
    });
} else {
    describe('testing Text2Action', () => {

        beforeAll(() => {
            jest.clearAllMocks();
        });

        it("Should generate a new machine execution and thread for rfp requests", async () => {
            // real e2e test
            const bennie = new Bennie();
            const result = await bennie.askBennie('Create a RFP for Northslope and Rangr to deliver a tariff solution on Foundry. The solution must include support for pricing models, simulations, and A/B testing of the outcomes. We expect this to be an 4 week engagement requiring 3 Python engineer, 1 TypeScript engineer, and 2 SME on developing pricing models. Then email me the responses. The company is John Doe\'s Manufacturing and there address is 123 main street dallas tx, 75081', process.env.FOUNDRY_TEST_USER);
            expect(result.executionId).toBeDefined();
            expect(result.message).toBeDefined();
            expect(result.status).toBe(200);
        }, 120000);
    });
}