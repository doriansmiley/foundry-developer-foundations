import { google } from 'googleapis';

import { findOptimalMeetingTimeV2, Slot } from './findOptimalMeetingTime.v2';
import { OfficeServiceV2 } from '@codestrap/developer-foundations-types';
import { makeGSuiteClientV2 } from '../gsuiteClient.v2';

if (!process.env.E2E) {
    test.skip('e2e test skipped in default run', () => {
        // won't run
    });
} else {
    describe('findOptimalMeetingTimeV2 E2E tests', () => {
        const timezone = 'America/Los_Angeles';
        const workingHours = { start_hour: 8, end_hour: 17 };
        const durationMinutes = 30;
        const slotStepMinutes = 30;
        const fallbackOffsetMinutes = -420; // PDT

        let client: OfficeServiceV2;

        beforeAll(async () => {
            // Force Node's wall-clock to PT so Date('YYYY-MM-DDTHH:mm:ss') is deterministic.
            process.env.TZ = 'America/Los_Angeles';
            client = await makeGSuiteClientV2(process.env.OFFICE_SERVICE_ACCOUNT);
        });

        afterEach(() => {
            jest.clearAllMocks();
        });

        it('should get an exact time within PT working hours', async () => {

            const slots = await client.getAvailableMeetingTimes({
                participants: ['dsmiley@codestrap.me'],
                subject: 'Circle Up',
                timeframe_context: 'user defined exact date/time',
                localDateString: 'Tue Sep 09 2025 10:30:00 GMT-0700 (Pacific Daylight Time)',
                duration_minutes: 30,
                working_hours: {
                    start_hour: 8,
                    end_hour: 17,
                },
            });

            expect(slots.suggested_times.length).toBeGreaterThan(0);
        }, 60000);

    });
}