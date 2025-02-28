import React, { useEffect } from 'react';
import { StyleSheet, View, ScrollView, ActivityIndicator } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store/store';
import { compareCountryHolidays } from '../store/holidaysSlice';
import {
    setComparisonCountry1,
    setComparisonCountry2,
    setSelectedYear
} from '../store/settingsSlice';
import { Card, Title, Paragraph, Divider, Button } from 'react-native-paper';
import CountrySelector from '../components/CountrySelector';
import HolidayCard from '../components/HolidayCard';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/navigation';

type ComparisonScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Comparison'>;

const ComparisonScreen: React.FC = () => {
    const navigation = useNavigation<ComparisonScreenNavigationProp>();
    const dispatch = useDispatch<AppDispatch>();

    const { comparisonHolidays, loading } = useSelector((state: RootState) => state.holidays);
    const { comparisonCountries, selectedYear } = useSelector((state: RootState) => state.settings);

    useEffect(() => {
        compareHolidays();
    }, [comparisonCountries.country1, comparisonCountries.country2, selectedYear]);

    const compareHolidays = () => {
        dispatch(compareCountryHolidays({
            countryCode1: comparisonCountries.country1,
            countryCode2: comparisonCountries.country2,
            year: selectedYear
        }));
    };

    const handleCountry1Change = (countryCode: string) => {
        dispatch(setComparisonCountry1(countryCode));
    };

    const handleCountry2Change = (countryCode: string) => {
        dispatch(setComparisonCountry2(countryCode));
    };

    const handleYearChange = (newYear: number) => {
        dispatch(setSelectedYear(newYear));
    };

    const handleHolidayPress = (holiday: any) => {
        navigation.navigate('Details', { holiday });
    };

    // Find common holidays (by name)
    const commonHolidays = comparisonHolidays.country1.filter(holiday1 =>
        comparisonHolidays.country2.some(holiday2 =>
            holiday1.name === holiday2.name ||
            holiday1.localName === holiday2.name ||
            holiday1.name === holiday2.localName
        )
    );

    // Create an array of years for selection
    const years = [
        selectedYear - 1,
        selectedYear,
        selectedYear + 1
    ];

    return (
        <View style={styles.container}>
            <View style={styles.selectors}>
                <View style={styles.countrySelectors}>
                    <View style={styles.selectorContainer}>
                        <Title style={styles.selectorTitle}>Country 1</Title>
                        <CountrySelector
                            value={comparisonCountries.country1}
                            onChange={handleCountry1Change}
                        />
                    </View>

                    <View style={styles.selectorContainer}>
                        <Title style={styles.selectorTitle}>Country 2</Title>
                        <CountrySelector
                            value={comparisonCountries.country2}
                            onChange={handleCountry2Change}
                        />
                    </View>
                </View>

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
                <ScrollView>
                    <Card style={styles.summaryCard}>
                        <Card.Content>
                            <Title>Comparison Summary</Title>
                            <Paragraph>
                                Country 1 ({comparisonCountries.country1}): {comparisonHolidays.country1.length} holidays
                            </Paragraph>
                            <Paragraph>
                                Country 2 ({comparisonCountries.country2}): {comparisonHolidays.country2.length} holidays
                            </Paragraph>
                            <Paragraph>
                                Common holidays: {commonHolidays.length}
                            </Paragraph>
                        </Card.Content>
                    </Card>

                    {commonHolidays.length > 0 && (
                        <>
                            <Title style={styles.sectionTitle}>Common Holidays</Title>
                            {commonHolidays.map((holiday, index) => (
                                <HolidayCard
                                    key={`common-${index}`}
                                    holiday={holiday}
                                    onPress={() => handleHolidayPress(holiday)}
                                    showCountdown={false}
                                />
                            ))}
                            <Divider style={styles.divider} />
                        </>
                    )}

                    <View style={styles.comparisonContainer}>
                        <View style={styles.countryColumn}>
                            <Title style={styles.countryTitle}>
                                {comparisonCountries.country1} Holidays
                            </Title>
                            {comparisonHolidays.country1.map((holiday, index) => (
                                <HolidayCard
                                    key={`c1-${index}`}
                                    holiday={holiday}
                                    onPress={() => handleHolidayPress(holiday)}
                                    showCountdown={false}
                                />
                            ))}
                        </View>

                        <View style={styles.countryColumn}>
                            <Title style={styles.countryTitle}>
                                {comparisonCountries.country2} Holidays
                            </Title>
                            {comparisonHolidays.country2.map((holiday, index) => (
                                <HolidayCard
                                    key={`c2-${index}`}
                                    holiday={holiday}
                                    onPress={() => handleHolidayPress(holiday)}
                                    showCountdown={false}
                                />
                            ))}
                        </View>
                    </View>
                </ScrollView>
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
    countrySelectors: {
        flexDirection: 'row',
    },
    selectorContainer: {
        flex: 1,
    },
    selectorTitle: {
        fontSize: 16,
        textAlign: 'center',
        marginTop: 8,
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
        flex: 1,
        justifyContent: 'center',
    },
    summaryCard: {
        margin: 16,
    },
    sectionTitle: {
        marginLeft: 16,
        marginTop: 8,
    },
    divider: {
        marginVertical: 16,
    },
    comparisonContainer: {
        flexDirection: 'row',
    },
    countryColumn: {
        flex: 1,
        padding: 8,
    },
    countryTitle: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 8,
    },
});

export default ComparisonScreen;
