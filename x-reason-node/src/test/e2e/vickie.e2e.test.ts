import { Vickie } from "@xreason/Vickie";
import { container } from "@xreason/inversify.config";
import { Context, MachineEvent, StateConfig } from "@xreason/reasoning";
import { MachineDao, RfpRequestResponse, RfpRequestsDao, TYPES } from "@xreason/types";
import { State } from "xstate";

if (!process.env.E2E) {
    test.skip("e2e test skipped in default run", () => {
        // won't run
    });
} else {
    describe('testing Vickie', () => {

        beforeAll(() => {
            jest.clearAllMocks();
        });

        it("It should send an email", async () => {
            const vickie = new Vickie();

            const result = await vickie.askVickie('Send an email to me with the subject test and for the message tell me a joke and include the current day time.', process.env.FOUNDRY_TEST_USER);
            expect(result.executionId).toBeDefined();
            expect(result.message).toBeDefined();
            expect(result.status).toBe(200);

        }, 60000);

        it("It should send an slack message to the Foundry Devs channel", async () => {
            const vickie = new Vickie();

            const result = await vickie.askVickie('Send a slack message to the Foundry Devs channel with a joke and include the current day time. Also let them know this is part of a a unit test and to ignore.', process.env.FOUNDRY_TEST_USER);
            expect(result.executionId).toBeDefined();
            expect(result.message).toBeDefined();
            expect(result.status).toBe(200);

        }, 60000);
    });
}