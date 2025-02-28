// src/components/HolidayCard.tsx
import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Card, Title, Paragraph, Text } from 'react-native-paper';
import { HolidayWithFact } from '../types/holiday';
import moment from 'moment';

interface HolidayCardProps {
    holiday: HolidayWithFact;
    onPress?: () => void;
    showCountdown?: boolean;
}

const HolidayCard: React.FC<HolidayCardProps> = ({
                                                     holiday,
                                                     onPress,
                                                     showCountdown = true
                                                 }) => {
    const formatDate = (dateString: string) => {
        return moment(dateString).format('MMMM D, YYYY');
    };

    return (
        <TouchableOpacity onPress={onPress} disabled={!onPress}>
            <Card style={styles.card}>
                <Card.Content>
                    <Title>{holiday.localName}</Title>
                    {holiday.localName !== holiday.name && (
                        <Paragraph style={styles.internationalName}>({holiday.name})</Paragraph>
                    )}
                    <Paragraph>Date: {formatDate(holiday.date)}</Paragraph>

                    {showCountdown && holiday.daysUntil !== undefined && (
                        <View style={styles.countdownContainer}>
                            <Text style={styles.countdownText}>
                                {holiday.daysUntil === 0
                                    ? 'Today!'
                                    : holiday.daysUntil === 1
                                        ? 'Tomorrow!'
                                        : `${holiday.daysUntil} days away`}
                            </Text>
                        </View>
                    )}
                </Card.Content>
            </Card>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        marginVertical: 8,
        marginHorizontal: 16,
        elevation: 4,
    },
    internationalName: {
        fontStyle: 'italic',
        marginBottom: 8,
    },
    countdownContainer: {
        marginTop: 8,
        padding: 6,
        backgroundColor: '#f0f0f0',
        borderRadius: 4,
        alignItems: 'center',
    },
    countdownText: {
        fontWeight: 'bold',
    },
});

export default HolidayCard;
