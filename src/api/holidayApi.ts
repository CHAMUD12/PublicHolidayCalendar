// src/api/holidayApi.ts
import axios from 'axios';
import {Holiday} from "../types/holiday";

const BASE_URL = 'https://date.nager.at/api/v3';

export const fetchHolidays = async (
    countryCode: string,
    year: number = new Date().getFullYear()
): Promise<Holiday[]> => {
    try {
        const response = await axios.get<Holiday[]>(
            `${BASE_URL}/PublicHolidays/${year}/${countryCode}`
        );
        return response.data;
    } catch (error) {
        console.error('Error fetching holidays:', error);
        throw error;
    }
};

export const fetchAvailableCountries = async (): Promise<Array<{countryCode: string, name: string}>> => {
    try {
        const response = await axios.get(`${BASE_URL}/AvailableCountries`);
        return response.data;
    } catch (error) {
        console.error('Error fetching countries:', error);
        throw error;
    }
};

// For comparing holidays between two countries
export const compareHolidays = async (
    countryCode1: string,
    countryCode2: string,
    year: number = new Date().getFullYear()
): Promise<{country1: Holiday[], country2: Holiday[]}> => {
    try {
        const [holidays1, holidays2] = await Promise.all([
            fetchHolidays(countryCode1, year),
            fetchHolidays(countryCode2, year)
        ]);

        return {
            country1: holidays1,
            country2: holidays2
        };
    } catch (error) {
        console.error('Error comparing holidays:', error);
        throw error;
    }
};

// For holiday facts - this would be a mock as the API doesn't provide this
// In a real app, you might want to create your own database or use another API
export const fetchHolidayFact = async (holidayName: string): Promise<string> => {
    // This is a mock function - in a real app, you would call an actual API or database
    const facts: Record<string, string> = {
        "New Year's Day": "New Year's Day is celebrated on January 1st in most countries around the world, marking the start of a new calendar year.",
        "Christmas": "Christmas is celebrated on December 25th and commemorates the birth of Jesus Christ in Christianity.",
        "Independence Day": "Independence Day celebrates a country's declaration of independence from another nation or entity.",
        "Labor Day": "Labor Day honors the contributions and achievements of workers and the labor movement.",
        // Add more holiday facts here
    };

    // Try to find an exact match
    if (facts[holidayName]) {
        return facts[holidayName];
    }

    // Try to find a partial match
    const partialMatch = Object.keys(facts).find(key =>
        holidayName.toLowerCase().includes(key.toLowerCase()) ||
        key.toLowerCase().includes(holidayName.toLowerCase())
    );

    if (partialMatch) {
        return facts[partialMatch];
    }

    // Default response if no match is found
    return `${holidayName} is a public holiday celebrated in various countries around the world.`;
};
