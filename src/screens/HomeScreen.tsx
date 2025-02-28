// src/screens/HomeScreen.tsx
import React, { useEffect } from 'react';
import { View, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { fetchHolidaysWithFacts } from '../store/holidaysSlice';
import { setSelectedCountry, setSelectedYear } from '../store/settingsSlice';
import { AppDispatch } from '../store/store';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/navigation';
import HolidayCard from '../components/HolidayCard';
import HolidayCountdown from '../components/HolidayCountdown';
import CountrySelector from '../components/CountrySelector';
import { Button, Title, Divider } from 'react-native-paper';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

const HomeScreen: React.FC = () => {
    const navigation = useNavigation<HomeScreenNavigationProp>();
    const dispatch = useDispatch<AppDispatch>();

    const { holidays, loading, error } = useSelector((state: RootState) => state.holidays);
    const { selectedCountry, selectedYear } = useSelector((state: RootState) => state.settings);

    // Fetch holidays when the component mounts or when selectedCountry/selectedYear changes
    useEffect(() => {
        fetchHolidays();
    }, [selectedCountry, selectedYear]);

    const fetchHolidays = () => {
        dispatch(fetchHolidaysWithFacts({
            countryCode: selectedCountry,
            year: selectedYear
        }));
    };

    const handleCountryChange = (countryCode: string) => {
        dispatch(setSelectedCountry(countryCode));
    };

    const handleYearChange = (newYear: number) => {
        dispatch(setSelectedYear(newYear));
    };

    const handleHolidayPress = (holiday: any) => {
        navigation.navigate('Details', { holiday });
    };

    // Create an array of years for selection (current year and next year)
    const years = [
        selectedYear - 1,
        selectedYear,
        selectedYear + 1
    ];

    if (error) {
        return (
            <View style={styles.centered}>
                <Title>Error loading holidays</Title>
                <Button mode="contained" onPress={fetchHolidays} style={styles.button}>
                    Retry
                </Button>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.selectors}>
                <CountrySelector
                    value={selectedCountry}
                    onChange={handleCountryChange}
                />

                <View style={styles.yearButtons}>
                    {years.map(year => (
                        <Button
                            key={year}
                            mode={year === selectedYear ? "contained" : "outlined"}
                            onPress={() => handleYearChange(year)}
                            style={styles.yearButton}
                        >
                            {year}
                        </Button>
                    ))}
                </View>
            </View>

            {loading ? (
                <ActivityIndicator size="large" style={styles.loader} />
            ) : (
                // <FlatList
                //     data={holidays}
                //     keyExtractor={(item) => `${item.date}-${item.name}`}
                //     renderItem={({ item }) => (
                //         <HolidayCard
                //             holiday={item}
                //             onPress={() => handleHolidayPress(item)}
                //         />
                //     )}
                <FlatList
                    data={holidays}
                    keyExtractor={(item, index) => `${item.date}-${item.name}-${index}`}
                    renderItem={({ item }) => (
                        <HolidayCard
                            holiday={item}
                            onPress={() => handleHolidayPress(item)}
                        />
                    )}
                    ListHeaderComponent={() => (
                        holidays.length > 0 ? (
                            <>
                                <HolidayCountdown holidays={holidays} />
                                <Divider style={styles.divider} />
                                <Title style={styles.listTitle}>All Holidays</Title>
                            </>
                        ) : null
                    )}
                    ListEmptyComponent={() => (
                        <View style={styles.empty}>
                            <Title>No holidays found</Title>
                            <Button mode="contained" onPress={fetchHolidays} style={styles.button}>
                                Refresh
                            </Button>
                        </View>
                    )}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    selectors: {
        backgroundColor: 'white',
        elevation: 4,
        paddingBottom: 8,
    },
    yearButtons: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginVertical: 8,
    },
    yearButton: {
        marginHorizontal: 4,
    },
    loader: {
        marginTop: 20,
    },
    empty: {
        alignItems: 'center',
        marginTop: 50,
    },
    button: {
        marginTop: 16,
    },
    listTitle: {
        marginLeft: 16,
        marginTop: 8,
        marginBottom: 4,
    },
    divider: {
        marginVertical: 8,
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default HomeScreen;
