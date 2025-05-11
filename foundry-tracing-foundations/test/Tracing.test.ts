import {
  collectTelemetryFetchWrapper,
} from '../src/Tracing';
import { mockPayload } from './__fixtures__/telemetryPayload';

global.fetch = jest.fn();

describe('Tracing', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    (global.fetch as jest.Mock).mockImplementation((url: string) => {
      if (/\/api\/v2\/ontologies\/ontology-c0c8a326-cd0a-4f69-a575-b0399c04b74d\/actions\/collect-telemetry\/apply/.test(url)) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ message: 'thanks for tracing with us!' }),
        });
      }
      return Promise.reject(new Error('URL not matched'));
    });
  });

  it('should collect telemetry data', async () => {
    const result = await collectTelemetryFetchWrapper(JSON.stringify(mockPayload));
    expect(result).toBeDefined();
    expect(result).toEqual({ message: 'Hello World' });
  });
});
