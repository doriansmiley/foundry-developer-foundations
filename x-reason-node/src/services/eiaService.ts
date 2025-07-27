import { EnergyService } from "@xreason/types";
import { getCaGasTracker, getVegaGasTrackerData } from "./delegates/eia/read";

export const eiaService: EnergyService = {
    read: getCaGasTracker,
    getVegaChartData: getVegaGasTrackerData,
};