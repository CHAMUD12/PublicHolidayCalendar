// src/components/CountrySelector.tsx
import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { fetchAvailableCountries } from '../api/holidayApi';
import { Country } from '../types/holiday';

interface CountrySelectorProps {
    value: string;
    onChange: (value: string) => void;
    label?: string;
}

const CountrySelector: React.FC<CountrySelectorProps> = ({ value, onChange, label }) => {
    const [countries, setCountries] = useState<Country[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadCountries = async () => {
            try {
                const availableCountries = await fetchAvailableCountries();
                setCountries(availableCountries);
            } catch (error) {
                console.error('Failed to load countries:', error);
            } finally {
                setIsLoading(false);
            }
        };

        loadCountries();
    }, []);

    return (
        <View style={styles.container}>
            <Dropdown
                style={styles.dropdown}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                data={countries}
                search
                maxHeight={300}
                labelField="name"
                valueField="countryCode"
                placeholder={isLoading ? 'Loading...' : 'Select country'}
                searchPlaceholder="Search..."
                value={value}
                onChange={item => {
                    onChange(item.countryCode);
                }}
                disable={isLoading}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
    },
    dropdown: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 0.5,
        // borderRadius: a8,
        paddingHorizontal: 8,
    },
    placeholderStyle: {
        fontSize: 16,
    },
    selectedTextStyle: {
        fontSize: 16,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
});

export default CountrySelector;
