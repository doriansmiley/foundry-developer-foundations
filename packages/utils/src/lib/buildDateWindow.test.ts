import { buildDateWindowUTC } from './buildDateWindow';

describe('buildDateWindowUTC', () => {
  // Helper function to create a UTC reference date
  const createUTCDate = (year: number, month: number, day: number, hour: number = 12, minute: number = 0, second: number = 0): Date => {
    return new Date(Date.UTC(year, month - 1, day, hour, minute, second));
  };

  // Helper function to get a stable test date 
  const getTestDate = (): Date => {
    // Use a fixed UTC date in 2024 for consistent testing
    return createUTCDate(2024, 6, 15, 14, 30, 45); // June 15, 2024, 2:30:45 PM UTC
  };

  // Helper function to get a test date for a specific day of week
  const getTestDateForDayOfWeek = (dayOfWeek: number): Date => {
    // June 10, 2024 is a Monday, so we can calculate other days
    const monday = createUTCDate(2024, 6, 10, 12, 0, 0);
    const dayOffset = dayOfWeek === 0 ? 6 : dayOfWeek - 1; // Convert Sunday=0 to Sunday=6
    return new Date(monday.getTime() + dayOffset * 24 * 60 * 60 * 1000);
  };

  describe('all time and undefined timeframes', () => {
    it('should return undefined dates for "all time"', () => {
      const refDate = getTestDate();
      const result = buildDateWindowUTC('all time', refDate);
      
      expect(result.startDate).toBeUndefined();
      expect(result.endDate).toBeUndefined();
    });

    it('should return undefined dates for undefined timeframe', () => {
      const refDate = getTestDate();
      const result = buildDateWindowUTC(undefined, refDate);
      
      expect(result.startDate).toBeUndefined();
      expect(result.endDate).toBeUndefined();
    });

    it('should return undefined dates for empty string', () => {
      const refDate = getTestDate();
      const result = buildDateWindowUTC('', refDate);
      
      expect(result.startDate).toBeUndefined();
      expect(result.endDate).toBeUndefined();
    });
  });

  describe('today timeframe', () => {
    it('should return start and end of day for today', () => {
      const refDate = getTestDate();
      const result = buildDateWindowUTC('today', refDate);
      
      expect(result.startDate).toBeDefined();
      expect(result.endDate).toBeDefined();
      
      // Check that start is beginning of day (UTC)
      expect(result.startDate!.getUTCHours()).toBe(0);
      expect(result.startDate!.getUTCMinutes()).toBe(0);
      expect(result.startDate!.getUTCSeconds()).toBe(0);
      expect(result.startDate!.getUTCFullYear()).toBe(2024);
      expect(result.startDate!.getUTCMonth()).toBe(5); // June is month 5 (0-indexed)
      expect(result.startDate!.getUTCDate()).toBe(15);
      
      // Check that end is end of day (UTC)
      expect(result.endDate!.getUTCHours()).toBe(23);
      expect(result.endDate!.getUTCMinutes()).toBe(59);
      expect(result.endDate!.getUTCSeconds()).toBe(59);
      expect(result.endDate!.getUTCFullYear()).toBe(2024);
      expect(result.endDate!.getUTCMonth()).toBe(5); // June is month 5 (0-indexed)
      expect(result.endDate!.getUTCDate()).toBe(15);
    });

    it('should handle different times of day correctly', () => {
      const testDate = getTestDate();
      const morning = new Date(testDate.getTime());
      morning.setUTCHours(morning.getUTCHours() - 6); // 8:30 AM PT
      const afternoon = new Date(testDate.getTime());
      afternoon.setUTCHours(afternoon.getUTCHours() + 1); // 3:30 PM PT
      const evening = new Date(testDate.getTime());
      evening.setUTCHours(evening.getUTCHours() + 8); // 10:30 PM PT
      
      const morningResult = buildDateWindowUTC('today', morning);
      const afternoonResult = buildDateWindowUTC('today', afternoon);
      const eveningResult = buildDateWindowUTC('today', evening);
      
      // All should have the same start and end times
      expect(morningResult.startDate?.getTime()).toBe(afternoonResult.startDate?.getTime());
      expect(morningResult.endDate?.getTime()).toBe(afternoonResult.endDate?.getTime());
      expect(afternoonResult.startDate?.getTime()).toBe(eveningResult.startDate?.getTime());
      expect(afternoonResult.endDate?.getTime()).toBe(eveningResult.endDate?.getTime());
    });
  });

  describe('yesterday timeframe', () => {
    it('should return start and end of yesterday', () => {
      const refDate = getTestDate();
      const result = buildDateWindowUTC('yesterday', refDate);
      
      expect(result.startDate).toBeDefined();
      expect(result.endDate).toBeDefined();
      
      // Check that it's yesterday's date (June 14, 2024 UTC)
      expect(result.startDate!.getUTCFullYear()).toBe(2024);
      expect(result.startDate!.getUTCMonth()).toBe(5); // June is month 5 (0-indexed)
      expect(result.startDate!.getUTCDate()).toBe(14);
      expect(result.startDate!.getUTCHours()).toBe(0);
      expect(result.startDate!.getUTCMinutes()).toBe(0);
      expect(result.startDate!.getUTCSeconds()).toBe(0);
      
      expect(result.endDate!.getUTCFullYear()).toBe(2024);
      expect(result.endDate!.getUTCMonth()).toBe(5); // June is month 5 (0-indexed)
      expect(result.endDate!.getUTCDate()).toBe(14);
      expect(result.endDate!.getUTCHours()).toBe(23);
      expect(result.endDate!.getUTCMinutes()).toBe(59);
      expect(result.endDate!.getUTCSeconds()).toBe(59);
    });

    it('should handle month boundary correctly', () => {
      const refDate = createUTCDate(2024, 6, 1, 12, 0); // June 1st
      const result = buildDateWindowUTC('yesterday', refDate);
      
      expect(result.startDate!.getUTCFullYear()).toBe(2024);
      expect(result.startDate!.getUTCMonth()).toBe(4); // May is month 4 (0-indexed)
      expect(result.startDate!.getUTCDate()).toBe(31);
      expect(result.startDate!.getUTCHours()).toBe(0);
      expect(result.startDate!.getUTCMinutes()).toBe(0);
      expect(result.startDate!.getUTCSeconds()).toBe(0);
      
      expect(result.endDate!.getUTCFullYear()).toBe(2024);
      expect(result.endDate!.getUTCMonth()).toBe(4); // May is month 4 (0-indexed)
      expect(result.endDate!.getUTCDate()).toBe(31);
      expect(result.endDate!.getUTCHours()).toBe(23);
      expect(result.endDate!.getUTCMinutes()).toBe(59);
      expect(result.endDate!.getUTCSeconds()).toBe(59);
    });

    it('should handle year boundary correctly', () => {
      const refDate = createUTCDate(2024, 1, 1, 12, 0); // Jan 1st
      const result = buildDateWindowUTC('yesterday', refDate);
      
      expect(result.startDate!.getUTCFullYear()).toBe(2023);
      expect(result.startDate!.getUTCMonth()).toBe(11); // December is month 11 (0-indexed)
      expect(result.startDate!.getUTCDate()).toBe(31);
      expect(result.startDate!.getUTCHours()).toBe(0);
      expect(result.startDate!.getUTCMinutes()).toBe(0);
      expect(result.startDate!.getUTCSeconds()).toBe(0);
      
      expect(result.endDate!.getUTCFullYear()).toBe(2023);
      expect(result.endDate!.getUTCMonth()).toBe(11); // December is month 11 (0-indexed)
      expect(result.endDate!.getUTCDate()).toBe(31);
      expect(result.endDate!.getUTCHours()).toBe(23);
      expect(result.endDate!.getUTCMinutes()).toBe(59);
      expect(result.endDate!.getUTCSeconds()).toBe(59);
    });
  });

  describe('this week timeframe', () => {
    it('should return Monday to Friday for a weekday', () => {
      const wednesday = getTestDateForDayOfWeek(3); // Wednesday (June 12, 2024)
      const result = buildDateWindowUTC('this week', wednesday);
      
      expect(result.startDate).toBeDefined();
      expect(result.endDate).toBeDefined();
      
      // Check Monday start (June 10, 2024 UTC)
      expect(result.startDate!.getUTCFullYear()).toBe(2024);
      expect(result.startDate!.getUTCMonth()).toBe(5); // June is month 5 (0-indexed)
      expect(result.startDate!.getUTCDate()).toBe(10); // Monday
      expect(result.startDate!.getUTCHours()).toBe(0); // Start of day UTC
      
      // Check Friday end (June 14, 2024 UTC)
      expect(result.endDate!.getUTCFullYear()).toBe(2024);
      expect(result.endDate!.getUTCMonth()).toBe(5); // June is month 5 (0-indexed)
      expect(result.endDate!.getUTCDate()).toBe(14); // Friday
      expect(result.endDate!.getUTCHours()).toBe(23); // End of day UTC
    });

    it('should handle weekend correctly', () => {
      const saturday = getTestDateForDayOfWeek(6); // Saturday (June 15, 2024)
      const result = buildDateWindowUTC('this week', saturday);
      
      // Should still return the Monday-Friday of that week
      expect(result.startDate!.getUTCDate()).toBe(10); // Monday of that week
      expect(result.endDate!.getUTCDate()).toBe(14); // Friday of that week
    });
  });

  describe('last week timeframe', () => {
    it('should return Monday to Friday of previous week', () => {
      const wednesday = getTestDateForDayOfWeek(3); // Wednesday (June 12, 2024)
      const result = buildDateWindowUTC('last week', wednesday);
      
      expect(result.startDate).toBeDefined();
      expect(result.endDate).toBeDefined();
      
      // Check previous Monday (June 3, 2024 UTC)
      expect(result.startDate!.getUTCFullYear()).toBe(2024);
      expect(result.startDate!.getUTCMonth()).toBe(5); // June is month 5 (0-indexed)
      expect(result.startDate!.getUTCDate()).toBe(3); // Previous Monday
      expect(result.startDate!.getUTCHours()).toBe(0); // Start of day UTC
      
      // Check previous Friday (June 7, 2024 UTC)
      expect(result.endDate!.getUTCFullYear()).toBe(2024);
      expect(result.endDate!.getUTCMonth()).toBe(5); // June is month 5 (0-indexed)
      expect(result.endDate!.getUTCDate()).toBe(7); // Previous Friday
      expect(result.endDate!.getUTCHours()).toBe(23); // End of day UTC
    });
  });

  describe('this month timeframe', () => {
    it('should return start and end of current month', () => {
      const midMonth = getTestDate(); // June 15, 2024
      const result = buildDateWindowUTC('this month', midMonth);
      
      expect(result.startDate).toBeDefined();
      expect(result.endDate).toBeDefined();
      
      // Check start of month (UTC)
      expect(result.startDate!.getUTCFullYear()).toBe(2024);
      expect(result.startDate!.getUTCMonth()).toBe(5); // June is month 5 (0-indexed)
      expect(result.startDate!.getUTCDate()).toBe(1);
      expect(result.startDate!.getUTCHours()).toBe(0);
      expect(result.startDate!.getUTCMinutes()).toBe(0);
      expect(result.startDate!.getUTCSeconds()).toBe(0);
      
      // Check end of month (start of next month UTC)
      expect(result.endDate!.getUTCFullYear()).toBe(2024);
      expect(result.endDate!.getUTCMonth()).toBe(6); // July is month 6 (0-indexed)
      expect(result.endDate!.getUTCDate()).toBe(1);
      expect(result.endDate!.getUTCHours()).toBe(0);
      expect(result.endDate!.getUTCMinutes()).toBe(0);
      expect(result.endDate!.getUTCSeconds()).toBe(0);
    });

    it('should handle December correctly', () => {
      const december = createUTCDate(2024, 12, 15, 14, 30);
      const result = buildDateWindowUTC('this month', december);
      
      expect(result.startDate!.getUTCFullYear()).toBe(2024);
      expect(result.startDate!.getUTCMonth()).toBe(11); // December is month 11 (0-indexed)
      expect(result.startDate!.getUTCDate()).toBe(1);
      expect(result.startDate!.getUTCHours()).toBe(0);
      expect(result.startDate!.getUTCMinutes()).toBe(0);
      expect(result.startDate!.getUTCSeconds()).toBe(0);
      
      expect(result.endDate!.getUTCFullYear()).toBe(2025);
      expect(result.endDate!.getUTCMonth()).toBe(0); // January is month 0 (0-indexed)
      expect(result.endDate!.getUTCDate()).toBe(1);
      expect(result.endDate!.getUTCHours()).toBe(0);
      expect(result.endDate!.getUTCMinutes()).toBe(0);
      expect(result.endDate!.getUTCSeconds()).toBe(0);
    });
  });

  describe('last month timeframe', () => {
    it('should return start and end of previous month', () => {
      const midMonth = createUTCDate(2024, 6, 15, 14, 30); // June
      const result = buildDateWindowUTC('last month', midMonth);
      
      expect(result.startDate).toBeDefined();
      expect(result.endDate).toBeDefined();
      
      // Check start of last month (May UTC)
      expect(result.startDate!.getUTCFullYear()).toBe(2024);
      expect(result.startDate!.getUTCMonth()).toBe(4); // May is month 4 (0-indexed)
      expect(result.startDate!.getUTCDate()).toBe(1);
      expect(result.startDate!.getUTCHours()).toBe(0);
      expect(result.startDate!.getUTCMinutes()).toBe(0);
      expect(result.startDate!.getUTCSeconds()).toBe(0);
      
      // Check end of last month (start of current month UTC)
      expect(result.endDate!.getUTCFullYear()).toBe(2024);
      expect(result.endDate!.getUTCMonth()).toBe(5); // June is month 5 (0-indexed)
      expect(result.endDate!.getUTCDate()).toBe(1);
      expect(result.endDate!.getUTCHours()).toBe(0);
      expect(result.endDate!.getUTCMinutes()).toBe(0);
      expect(result.endDate!.getUTCSeconds()).toBe(0);
    });

    it('should handle January correctly (previous year)', () => {
      const january = createUTCDate(2024, 1, 15, 14, 30);
      const result = buildDateWindowUTC('last month', january);
      
      expect(result.startDate!.getUTCFullYear()).toBe(2023);
      expect(result.startDate!.getUTCMonth()).toBe(11); // December is month 11 (0-indexed)
      expect(result.startDate!.getUTCDate()).toBe(1);
      expect(result.startDate!.getUTCHours()).toBe(0);
      expect(result.startDate!.getUTCMinutes()).toBe(0);
      expect(result.startDate!.getUTCSeconds()).toBe(0);
      
      expect(result.endDate!.getUTCFullYear()).toBe(2024);
      expect(result.endDate!.getUTCMonth()).toBe(0); // January is month 0 (0-indexed)
      expect(result.endDate!.getUTCDate()).toBe(1);
      expect(result.endDate!.getUTCHours()).toBe(0);
      expect(result.endDate!.getUTCMinutes()).toBe(0);
      expect(result.endDate!.getUTCSeconds()).toBe(0);
    });
  });

  describe('default case (unknown timeframe)', () => {
    it('should default to today for unknown timeframe', () => {
      const refDate = getTestDate();
      const result = buildDateWindowUTC('unknown_timeframe', refDate);
      
      expect(result.startDate).toBeDefined();
      expect(result.endDate).toBeDefined();
      
      // Should behave like 'today' (UTC)
      expect(result.startDate!.getUTCFullYear()).toBe(2024);
      expect(result.startDate!.getUTCMonth()).toBe(5); // June is month 5 (0-indexed)
      expect(result.startDate!.getUTCDate()).toBe(15);
      expect(result.startDate!.getUTCHours()).toBe(0);
      expect(result.startDate!.getUTCMinutes()).toBe(0);
      expect(result.startDate!.getUTCSeconds()).toBe(0);
      
      expect(result.endDate!.getUTCFullYear()).toBe(2024);
      expect(result.endDate!.getUTCMonth()).toBe(5); // June is month 5 (0-indexed)
      expect(result.endDate!.getUTCDate()).toBe(15);
      expect(result.endDate!.getUTCHours()).toBe(23);
      expect(result.endDate!.getUTCMinutes()).toBe(59);
      expect(result.endDate!.getUTCSeconds()).toBe(59);
    });
  });


  describe('edge cases', () => {
    it('should handle leap year correctly', () => {
      const leapYear = createUTCDate(2024, 2, 29, 14, 30); // Leap year
      const result = buildDateWindowUTC('today', leapYear);
      
      expect(result.startDate!.getUTCFullYear()).toBe(2024);
      expect(result.startDate!.getUTCMonth()).toBe(1); // February is month 1 (0-indexed)
      expect(result.startDate!.getUTCDate()).toBe(29);
      expect(result.startDate!.getUTCHours()).toBe(0);
      expect(result.startDate!.getUTCMinutes()).toBe(0);
      expect(result.startDate!.getUTCSeconds()).toBe(0);
    });

    it('should handle UTC dates consistently', () => {
      // Test with a specific UTC date
      const testDate = createUTCDate(2024, 3, 10, 14, 30);
      const result = buildDateWindowUTC('today', testDate);
      
      expect(result.startDate).toBeDefined();
      expect(result.endDate).toBeDefined();
      
      // Should work consistently regardless of DST
      expect(result.startDate!.getUTCFullYear()).toBe(2024);
      expect(result.startDate!.getUTCMonth()).toBe(2); // March is month 2 (0-indexed)
      expect(result.startDate!.getUTCDate()).toBe(10);
      expect(result.startDate!.getUTCHours()).toBe(0);
      expect(result.startDate!.getUTCMinutes()).toBe(0);
      expect(result.startDate!.getUTCSeconds()).toBe(0);
    });

    it('should handle very early morning times', () => {
      const testDate = getTestDate();
      const earlyMorning = new Date(testDate.getTime());
      earlyMorning.setUTCHours(earlyMorning.getUTCHours() - 11); // 1:30 AM PT
      const result = buildDateWindowUTC('today', earlyMorning);
      
      expect(result.startDate!.getUTCHours()).toBe(0);
      expect(result.startDate!.getUTCMinutes()).toBe(0);
      expect(result.startDate!.getUTCSeconds()).toBe(0);
    });

    it('should handle very late night times', () => {
      const testDate = getTestDate();
      const lateNight = new Date(testDate.getTime());
      lateNight.setUTCHours(lateNight.getUTCHours() + 9); // 11:30 PM PT
      const result = buildDateWindowUTC('today', lateNight);
      
      expect(result.endDate!.getUTCHours()).toBe(23);
      expect(result.endDate!.getUTCMinutes()).toBe(59);
      expect(result.endDate!.getUTCSeconds()).toBe(59);
    });
  });

  describe('return type validation', () => {
    it('should return DateWindow interface correctly', () => {
      const refDate = getTestDate();
      const result = buildDateWindowUTC('today', refDate);
      
      expect(result).toHaveProperty('startDate');
      expect(result).toHaveProperty('endDate');
      expect(typeof result.startDate).toBe('object');
      expect(typeof result.endDate).toBe('object');
      
      if (result.startDate) {
        expect(result.startDate).toBeInstanceOf(Date);
      }
      if (result.endDate) {
        expect(result.endDate).toBeInstanceOf(Date);
      }
    });

    it('should ensure startDate is before endDate', () => {
      const refDate = getTestDate();
      const result = buildDateWindowUTC('today', refDate);
      
      if (result.startDate && result.endDate) {
        expect(result.startDate.getTime()).toBeLessThan(result.endDate.getTime());
      }
    });
  });
});
