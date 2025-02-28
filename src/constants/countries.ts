// countries.ts - Country definitions for holiday calendar

export interface Country {
    code: string;
    name: string;
    region?: string;
    flagEmoji?: string;
    timezone?: string;
}

export const countries: Country[] = [
    { code: 'US', name: 'United States', region: 'North America', flagEmoji: '🇺🇸', timezone: 'America/New_York' },
    { code: 'UK', name: 'United Kingdom', region: 'Europe', flagEmoji: '🇬🇧', timezone: 'Europe/London' },
    { code: 'CA', name: 'Canada', region: 'North America', flagEmoji: '🇨🇦', timezone: 'America/Toronto' },
    { code: 'AU', name: 'Australia', region: 'Oceania', flagEmoji: '🇦🇺', timezone: 'Australia/Sydney' },
    { code: 'JP', name: 'Japan', region: 'Asia', flagEmoji: '🇯🇵', timezone: 'Asia/Tokyo' },
    { code: 'DE', name: 'Germany', region: 'Europe', flagEmoji: '🇩🇪', timezone: 'Europe/Berlin' },
    { code: 'FR', name: 'France', region: 'Europe', flagEmoji: '🇫🇷', timezone: 'Europe/Paris' },
    { code: 'IT', name: 'Italy', region: 'Europe', flagEmoji: '🇮🇹', timezone: 'Europe/Rome' },
    { code: 'ES', name: 'Spain', region: 'Europe', flagEmoji: '🇪🇸', timezone: 'Europe/Madrid' },
    { code: 'BR', name: 'Brazil', region: 'South America', flagEmoji: '🇧🇷', timezone: 'America/Sao_Paulo' },
    { code: 'MX', name: 'Mexico', region: 'North America', flagEmoji: '🇲🇽', timezone: 'America/Mexico_City' },
    { code: 'IN', name: 'India', region: 'Asia', flagEmoji: '🇮🇳', timezone: 'Asia/Kolkata' },
    { code: 'CN', name: 'China', region: 'Asia', flagEmoji: '🇨🇳', timezone: 'Asia/Shanghai' },
    { code: 'RU', name: 'Russia', region: 'Europe/Asia', flagEmoji: '🇷🇺', timezone: 'Europe/Moscow' },
    { code: 'ZA', name: 'South Africa', region: 'Africa', flagEmoji: '🇿🇦', timezone: 'Africa/Johannesburg' },
    { code: 'SG', name: 'Singapore', region: 'Asia', flagEmoji: '🇸🇬', timezone: 'Asia/Singapore' },
    { code: 'NZ', name: 'New Zealand', region: 'Oceania', flagEmoji: '🇳🇿', timezone: 'Pacific/Auckland' },
    { code: 'AE', name: 'United Arab Emirates', region: 'Middle East', flagEmoji: '🇦🇪', timezone: 'Asia/Dubai' },
    { code: 'IL', name: 'Israel', region: 'Middle East', flagEmoji: '🇮🇱', timezone: 'Asia/Jerusalem' },
    { code: 'SE', name: 'Sweden', region: 'Europe', flagEmoji: '🇸🇪', timezone: 'Europe/Stockholm' },
    { code: 'NO', name: 'Norway', region: 'Europe', flagEmoji: '🇳🇴', timezone: 'Europe/Oslo' },
    { code: 'DK', name: 'Denmark', region: 'Europe', flagEmoji: '🇩🇰', timezone: 'Europe/Copenhagen' },
    { code: 'FI', name: 'Finland', region: 'Europe', flagEmoji: '🇫🇮', timezone: 'Europe/Helsinki' },
    { code: 'NL', name: 'Netherlands', region: 'Europe', flagEmoji: '🇳🇱', timezone: 'Europe/Amsterdam' },
    { code: 'BE', name: 'Belgium', region: 'Europe', flagEmoji: '🇧🇪', timezone: 'Europe/Brussels' },
    { code: 'CH', name: 'Switzerland', region: 'Europe', flagEmoji: '🇨🇭', timezone: 'Europe/Zurich' },
    { code: 'AT', name: 'Austria', region: 'Europe', flagEmoji: '🇦🇹', timezone: 'Europe/Vienna' },
    { code: 'PL', name: 'Poland', region: 'Europe', flagEmoji: '🇵🇱', timezone: 'Europe/Warsaw' },
    { code: 'PT', name: 'Portugal', region: 'Europe', flagEmoji: '🇵🇹', timezone: 'Europe/Lisbon' },
    { code: 'IE', name: 'Ireland', region: 'Europe', flagEmoji: '🇮🇪', timezone: 'Europe/Dublin' },
    { code: 'GR', name: 'Greece', region: 'Europe', flagEmoji: '🇬🇷', timezone: 'Europe/Athens' },
    { code: 'CZ', name: 'Czech Republic', region: 'Europe', flagEmoji: '🇨🇿', timezone: 'Europe/Prague' },
    { code: 'HU', name: 'Hungary', region: 'Europe', flagEmoji: '🇭🇺', timezone: 'Europe/Budapest' },
    { code: 'TR', name: 'Turkey', region: 'Europe/Asia', flagEmoji: '🇹🇷', timezone: 'Europe/Istanbul' },
    { code: 'KR', name: 'South Korea', region: 'Asia', flagEmoji: '🇰🇷', timezone: 'Asia/Seoul' },
    { code: 'TH', name: 'Thailand', region: 'Asia', flagEmoji: '🇹🇭', timezone: 'Asia/Bangkok' },
    { code: 'MY', name: 'Malaysia', region: 'Asia', flagEmoji: '🇲🇾', timezone: 'Asia/Kuala_Lumpur' },
    { code: 'ID', name: 'Indonesia', region: 'Asia', flagEmoji: '🇮🇩', timezone: 'Asia/Jakarta' },
    { code: 'PH', name: 'Philippines', region: 'Asia', flagEmoji: '🇵🇭', timezone: 'Asia/Manila' },
    { code: 'VN', name: 'Vietnam', region: 'Asia', flagEmoji: '🇻🇳', timezone: 'Asia/Ho_Chi_Minh' }
];

export const getCountryByCode = (code: string): Country | undefined => {
    return countries.find(country => country.code === code);
};

export const getCountriesByRegion = (region: string): Country[] => {
    return countries.filter(country => country.region === region);
};

export const regions = Array.from(new Set(countries.map(country => country.region))).filter(Boolean) as string[];

export default countries;
