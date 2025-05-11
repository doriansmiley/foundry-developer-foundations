// __tests__/traceDecorators.test.ts
import * as crypto from 'crypto';
import * as uuid from '@tracing/utils/uuid';
import { DecoratorTest } from './__fixtures__/mockDecorators';
import { parentTelemetryPayload } from './__fixtures__/parentTelemetryPayload';
import { childTelemetryPayload } from './__fixtures__/childTelemetryPayload';

global.fetch = jest.fn();

describe('Tracing', () => {
    beforeEach(() => {
        jest.clearAllMocks();

        // 0) Fix Date so toISOString() is deterministic:
        //    1st call → parent start (2025-05-11T00:00:00.000Z)
        //    2nd call → child start  (2025-05-11T00:00:00.000Z)
        //    3rd call → child end    (2025-05-11T00:00:00.500Z)
        //    4th call → parent end   (2025-05-11T00:00:01.000Z)
        const base = Date.parse('2025-05-11T00:00:00.000Z');
        jest
            .spyOn(Date, 'now')
            .mockImplementationOnce(() => base)
            .mockImplementationOnce(() => base)
            .mockImplementationOnce(() => base + 500)
            .mockImplementationOnce(() => base + 1000);

        // 1) Spy randomBytes for trace & span IDs
        jest
            .spyOn(crypto, 'randomBytes')
            .mockImplementationOnce((size) => Buffer.alloc(size, 0xaa))  // traceId
            .mockImplementationOnce((size) => Buffer.alloc(size, 0xbb))  // parent spanId
            .mockImplementationOnce((size) => Buffer.alloc(size, 0xcc)); // child spanId

        // 2) Spy uuidv4() to match our fixture resource_id
        jest
            .spyOn(uuid, 'uuidv4')
            .mockReturnValue(parentTelemetryPayload.resource.resource_id);

        // 3) Stub fetch for the telemetry endpoint
        (global.fetch as jest.Mock).mockImplementation((url: string, opts: any) => {
            if (/\/actions\/collect-telemetry\/apply/.test(url)) {
                return Promise.resolve({
                    ok: true,
                    json: () => Promise.resolve({ message: 'OK' }),
                });
            }
            return Promise.reject(new Error('URL not matched'));
        });
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('calls fetch twice with the correct child & parent payloads', async () => {
        const dt = new DecoratorTest();
        const result = await dt.testDecorator();
        expect(result).toBe('segments traces');

        // two spans → two fetch calls
        expect(global.fetch).toHaveBeenCalledTimes(2);
        const calls = (global.fetch as jest.Mock).mock.calls as Array<[string, any]>;

        // [0] child span
        const [childUrl, childOpts] = calls[0];
        expect(childUrl).toMatch(/\/actions\/collect-telemetry\/apply/);
        expect(childOpts.method).toBe('POST');
        expect(JSON.parse(childOpts.body)).toEqual(childTelemetryPayload);

        // [1] parent span
        const [parentUrl, parentOpts] = calls[1];
        expect(parentUrl).toMatch(/\/actions\/collect-telemetry\/apply/);
        expect(parentOpts.method).toBe('POST');
        expect(JSON.parse(parentOpts.body)).toEqual(parentTelemetryPayload);
    });
});
