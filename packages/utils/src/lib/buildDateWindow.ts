import { partsInTZ, wallClockToUTC, mondayOfWeek, fridayOfWeek } from './utc';

export interface DateWindow {
  startDate: Date | undefined;
  endDate: Date | undefined;
}

/**
 * Builds a date window based on timeframe string and UTC reference date
 * @param timeframe - The timeframe string (today, yesterday, this week, etc.)
 * @param refDateUTC - The reference date in UTC
 * @returns DateWindow object with startDate and endDate in UTC
 */
export function buildDateWindowUTC(
  timeframe: string | undefined,
  refDateUTC: Date
): DateWindow {
  if (!timeframe || timeframe === 'all time') {
    return {
      startDate: undefined,
      endDate: undefined,
    };
  }

  const pad = (n: number, len = 2) => String(n).padStart(len, '0');

  switch (timeframe) {
    case 'today': {
      const startOfDay = new Date(refDateUTC);
      startOfDay.setUTCHours(0, 0, 0, 0);
      const endOfDay = new Date(refDateUTC);
      endOfDay.setUTCHours(23, 59, 59, 999);
      return {
        startDate: startOfDay,
        endDate: endOfDay,
      };
    }

    case 'yesterday': {
      const yesterday = new Date(refDateUTC.getTime() - 24 * 60 * 60 * 1000);
      const startOfDay = new Date(yesterday);
      startOfDay.setUTCHours(0, 0, 0, 0);
      const endOfDay = new Date(yesterday);
      endOfDay.setUTCHours(23, 59, 59, 999);
      return {
        startDate: startOfDay,
        endDate: endOfDay,
      };
    }

    case 'this week': {
      // Get Monday of current week
      const dayOfWeek = refDateUTC.getUTCDay();
      const mondayOffset = dayOfWeek === 0 ? -6 : 1 - dayOfWeek; // Sunday = 0, Monday = 1
      const monday = new Date(refDateUTC);
      monday.setUTCDate(refDateUTC.getUTCDate() + mondayOffset);
      monday.setUTCHours(0, 0, 0, 0);
      
      // Get Friday of current week
      const friday = new Date(monday);
      friday.setUTCDate(monday.getUTCDate() + 4);
      friday.setUTCHours(23, 59, 59, 999);
      
      return {
        startDate: monday,
        endDate: friday,
      };
    }

    case 'last week': {
      // Get Monday of last week
      const dayOfWeek = refDateUTC.getUTCDay();
      const mondayOffset = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
      const lastMonday = new Date(refDateUTC);
      lastMonday.setUTCDate(refDateUTC.getUTCDate() + mondayOffset - 7);
      lastMonday.setUTCHours(0, 0, 0, 0);
      
      // Get Friday of last week
      const lastFriday = new Date(lastMonday);
      lastFriday.setUTCDate(lastMonday.getUTCDate() + 4);
      lastFriday.setUTCHours(23, 59, 59, 999);
      
      return {
        startDate: lastMonday,
        endDate: lastFriday,
      };
    }

    case 'this month': {
      const startOfMonth = new Date(Date.UTC(refDateUTC.getUTCFullYear(), refDateUTC.getUTCMonth(), 1));
      const endOfMonth = new Date(Date.UTC(refDateUTC.getUTCFullYear(), refDateUTC.getUTCMonth() + 1, 1));
      return {
        startDate: startOfMonth,
        endDate: endOfMonth,
      };
    }

    case 'last month': {
      const lastMonth = refDateUTC.getUTCMonth() === 0 ? 11 : refDateUTC.getUTCMonth() - 1;
      const lastMonthYear = refDateUTC.getUTCMonth() === 0 ? refDateUTC.getUTCFullYear() - 1 : refDateUTC.getUTCFullYear();
      const startOfLastMonth = new Date(Date.UTC(lastMonthYear, lastMonth, 1));
      const endOfLastMonth = new Date(Date.UTC(refDateUTC.getUTCFullYear(), refDateUTC.getUTCMonth(), 1));
      return {
        startDate: startOfLastMonth,
        endDate: endOfLastMonth,
      };
    }

    default:
      // Default to today if timeframe is not recognized
      const startOfDay = new Date(refDateUTC);
      startOfDay.setUTCHours(0, 0, 0, 0);
      const endOfDay = new Date(refDateUTC);
      endOfDay.setUTCHours(23, 59, 59, 999);
      return {
        startDate: startOfDay,
        endDate: endOfDay,
      };
  }
}

