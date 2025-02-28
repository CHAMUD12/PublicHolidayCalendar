// src/components/HolidayCountdown.tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Title, Text } from 'react-native-paper';
import { HolidayWithFact } from '../types/holiday';

interface HolidayCountdownProps {
    holidays: HolidayWithFact[];
}

const HolidayCountdown: React.FC<HolidayCountdownProps> = ({ holidays }) => {
    // Find the upcoming holiday (with the smallest positive daysUntil)
    const upcomingHoliday = holidays
        .filter(h => h.daysUntil !== undefined && h.daysUntil >= 0)
        .sort((a, b) => (a.daysUntil || 0) - (b.daysUntil || 0))[0];

    if (!upcomingHoliday) {
        return (
            <Card style={styles.card}>
                <Card.Content>
                    <Title>No upcoming holidays found</Title>
                </Card.Content>
            </Card>
        );
    }

    // Display countdown
    return (
        <Card style={styles.card}>
            <Card.Content>
                <Title style={styles.title}>Next Holiday</Title>
                <Text style={styles.holidayName}>{upcomingHoliday.localName}</Text>
                <Text style={styles.date}>{new Date(upcomingHoliday.date).toDateString()}</Text>

                <View style={styles.countdownContainer}>
                    {upcomingHoliday.daysUntil === 0 ? (
                        <Text style={styles.today}>Today!</Text>
                    ) : upcomingHoliday.daysUntil === 1 ? (
                        <Text style={styles.tomorrow}>Tomorrow!</Text>
                    ) : (
                        <Text style={styles.countdown}>
                            {upcomingHoliday.daysUntil} days away
                        </Text>
                    )}
                </View>
            </Card.Content>
        </Card>
    );
};

const styles = StyleSheet.create({
    card: {
        margin: 16,
        elevation: 4,
    },
    title: {
        textAlign: 'center',
        marginBottom: 8,
    },
    holidayName: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    date: {
        textAlign: 'center',
        marginVertical: 8,
    },
    countdownContainer: {
        marginTop: 16,
        padding: 12,
        backgroundColor: '#f0f8ff',
        borderRadius: 8,
        alignItems: 'center',
    },
    countdown: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#2196F3',
    },
    today: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#4CAF50',
    },
    tomorrow: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#FF9800',
    },
});

export default HolidayCountdown;
