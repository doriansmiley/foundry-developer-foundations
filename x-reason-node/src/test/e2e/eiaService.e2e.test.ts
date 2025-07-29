import { eiaService } from "@xreason/services/eiaService";

jest.setTimeout(30000); // Allow enough time for live EIA API call

if (!process.env.E2E) {
    test.skip("e2e test skipped in default run", () => {
        // won't run
    });
} else {
    describe("CA Gas Tracker E2E Tests (EIA v2)", () => {
        const SCENARIOS = [5, 6, 7, 8];

        test("read returns valid scenario data", async () => {
            const results = await eiaService.read(SCENARIOS);

            // Check array length
            expect(Array.isArray(results)).toBe(true);
            expect(results).toHaveLength(SCENARIOS.length);

            // Validate baseline price (must be realistic $/gal)
            const baselinePrice = results[0].baselinePrice;
            expect(baselinePrice).toBeGreaterThan(2);
            expect(baselinePrice).toBeLessThan(10);

            // Validate each scenario
            let prevCost = -Infinity;
            results.forEach((entry, index) => {
                expect(entry.scenarioPrice).toBeCloseTo(SCENARIOS[index], 2);
                expect(entry.deltaVsBaseline).toBeCloseTo(entry.scenarioPrice - baselinePrice, 3);
                expect(entry.annualIncrementalCostBn).toBeGreaterThanOrEqual(0);
                expect(entry.pctOfCaGdp).toBeGreaterThanOrEqual(0);
                expect(entry.impliedUsGdpDrag).toBeGreaterThanOrEqual(0);

                // Costs should be non-decreasing with higher scenario prices
                expect(entry.annualIncrementalCostBn).toBeGreaterThanOrEqual(prevCost);
                prevCost = entry.annualIncrementalCostBn;

                // Date format check
                expect(entry.date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
            });
        });

        test("getVegaGasTrackerData returns a valid Vega-Lite spec", async () => {
            const results = await eiaService.read(SCENARIOS);
            const spec: any = await eiaService.getVegaChartData(results);

            // Check for Vega spec structure
            expect(spec).toHaveProperty("$schema");
            expect(spec.$schema).toContain("vega-lite");

            // Check data values
            expect(spec.data).toHaveProperty("values");
            expect(Array.isArray(spec.data.values)).toBe(true);
            expect(spec.data.values.length).toBe(SCENARIOS.length);

            const first = spec.data.values[0];
            expect(first).toHaveProperty("scenario");
            expect(typeof first.scenario).toBe("number");
            expect(first).toHaveProperty("annualCost");
            expect(typeof first.annualCost).toBe("number");

            // Verify scenarios match
            const scenariosFromSpec = spec.data.values.map((v: any) => v.scenario);
            expect(scenariosFromSpec).toEqual(SCENARIOS);

            // Check encoding
            expect(spec).toHaveProperty("mark");
            expect(spec).toHaveProperty("encoding");
            expect(spec.encoding).toHaveProperty("x");
            expect(spec.encoding).toHaveProperty("y");
        });
    });
}