// src/utils/dateUtils.ts
import moment from 'moment';

/**
 * Format a date string to a readable format
 */
export const formatDate = (dateString: string): string => {
    return moment(dateString).format('MMMM D, YYYY');
};

/**
 * Calculate days until a holiday
 */
export const calculateDaysUntil = (dateString: string): number => {
    const today = moment().startOf('day');
    const holidayDate = moment(dateString).startOf('day');

    let daysUntil = holidayDate.diff(today, 'days');

    // If the holiday has already passed this year, calculate for next year
    if (daysUntil < 0) {
        const nextYearDate = holidayDate.clone().add(1, 'year');
        daysUntil = nextYearDate.diff(today, 'days');
    }

    return daysUntil;
};

/**
 * Find the next upcoming holiday
 */
export const findNextHoliday = (holidays: { date: string }[]) => {
    const today = moment().startOf('day');

    // Sort holidays by date
    const sortedHolidays = [...holidays].sort((a, b) => {
        return moment(a.date).valueOf() - moment(b.date).valueOf();
    });

    // Find the first holiday that hasn't passed yet
    const upcomingHoliday = sortedHolidays.find(holiday => {
        return moment(holiday.date).isSameOrAfter(today);
    });

    // If all holidays have passed, return the first holiday of next year
    if (!upcomingHoliday && sortedHolidays.length > 0) {
        const firstHoliday = sortedHolidays[0];
        const nextYearDate = moment(firstHoliday.date).add(1, 'year');
        return { ...firstHoliday, date: nextYearDate.format('YYYY-MM-DD') };
    }

    return upcomingHoliday;
};
