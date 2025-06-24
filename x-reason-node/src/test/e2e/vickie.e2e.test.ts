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

        it("It should schedule a meeting, send an email, send a slack message, and create a task.", async () => {
            const vickie = new Vickie();

            const result = await vickie.askVickie(`
In parallel do all of the following:
Create a critical priority task for me to follow up with our rebranding and find a partner to handle our identity package.
Then schedule a meeting with me at 12:30 PM with the subject "Reminder - Prep for calls today" for 15 minutes
After that send a slack message to the Foundry Devs channel with a joke and include the current day time. Also let them know this is part of a a unit test and to ignore.
Finally,send an email to me with the subject test and for the message tell me a joke and include the current day time.
                `, process.env.FOUNDRY_TEST_USER);
            expect(result.executionId).toBeDefined();
            expect(result.message).toBeDefined();
            expect(result.status).toBe(200);

        }, 90000);
    });
}