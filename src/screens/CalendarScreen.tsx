// src/screens/CalendarScreen.tsx
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store/store';
import { fetchHolidaysWithFacts } from '../store/holidaysSlice';
import { Calendar as RNCalendar, DateData } from 'react-native-calendars';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/navigation';
import { HolidayWithFact } from '../types/holiday';
import { Card, Title, ActivityIndicator } from 'react-native-paper';

type CalendarScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Calendar'>;

const CalendarScreen: React.FC = () => {
    const navigation = useNavigation<CalendarScreenNavigationProp>();
    const dispatch = useDispatch<AppDispatch>();

    const { holidays, loading } = useSelector((state: RootState) => state.holidays);
    const { selectedCountry, selectedYear } = useSelector((state: RootState) => state.settings);

    const [markedDates, setMarkedDates] = useState<any>({});
    const [selectedDate, setSelectedDate] = useState<string | null>(null);
    const [holidaysOnSelectedDate, setHolidaysOnSelectedDate] = useState<HolidayWithFact[]>([]);

    useEffect(() => {
        dispatch(fetchHolidaysWithFacts({
            countryCode: selectedCountry,
            year: selectedYear
        }));
    }, [selectedCountry, selectedYear]);

    useEffect(() => {
        if (holidays.length > 0) {
            const marked: any = {};

            holidays.forEach(holiday => {
                marked[holiday.date] = {
                    marked: true,
                    dotColor: '#1976D2',
                    selected: selectedDate === holiday.date,
                    selectedColor: '#1976D2',
                };
            });

            setMarkedDates(marked);
        }
    }, [holidays, selectedDate]);

    const handleDayPress = (day: DateData) => {
        setSelectedDate(day.dateString);

        // Find holidays on the selected date
        const holidaysOnDay = holidays.filter(holiday => holiday.date === day.dateString);
        setHolidaysOnSelectedDate(holidaysOnDay);
    };

    const handleHolidayPress = (holiday: HolidayWithFact) => {
        navigation.navigate('Details', { holiday });
    };

    return (
        <View style={styles.container}>
            <RNCalendar
                current={`${selectedYear}-01-01`}
                minDate={`${selectedYear}-01-01`}
                maxDate={`${selectedYear}-12-31`}
                onDayPress={handleDayPress}
                markedDates={markedDates}
                markingType={'dot'}
                theme={{
                    selectedDayBackgroundColor: '#1976D2',
                    todayTextColor: '#1976D2',
                    arrowColor: '#1976D2',
                }}
            />

            {loading ? (
                <ActivityIndicator style={styles.loader} size="large" />
            ) : (
                <View style={styles.holidaysContainer}>
                    {selectedDate ? (
                        holidaysOnSelectedDate.length > 0 ? (
                            <>
                                <Title style={styles.holidayTitle}>
                                    Holidays on {new Date(selectedDate).toDateString()}
                                </Title>
                                {holidaysOnSelectedDate.map((holiday, index) => (
                                    <Card
                                        key={index}
                                        style={styles.holidayCard}
                                        onPress={() => handleHolidayPress(holiday)}
                                    >
                                        <Card.Content>
                                            <Title>{holiday.localName}</Title>
                                            {holiday.localName !== holiday.name && (
                                                <Text style={styles.internationalName}>({holiday.name})</Text>
                                            )}
                                        </Card.Content>
                                    </Card>
                                ))}
                            </>
                        ) : (
                            <Text style={styles.noHolidays}>No holidays on this date</Text>
                        )
                    ) : (
                        <Text style={styles.selectDate}>Select a date to see holidays</Text>
                    )}
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    loader: {
        marginTop: 20,
    },
    holidaysContainer: {
        padding: 16,
        flex: 1,
    },
    holidayTitle: {
        fontSize: 18,
        marginBottom: 12,
    },
    holidayCard: {
        marginBottom: 8,
    },
    internationalName: {
        fontStyle: 'italic',
    },
    noHolidays: {
        textAlign: 'center',
        marginTop: 20,
        fontSize: 16,
        color: '#757575',
    },
    selectDate: {
        textAlign: 'center',
        marginTop: 20,
        fontSize: 16,
        color: '#757575',
    },
});

export default CalendarScreen;
