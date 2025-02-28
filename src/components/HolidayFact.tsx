// src/components/HolidayFact.tsx
import React from 'react';
import { StyleSheet } from 'react-native';
import { Card, Paragraph, Title } from 'react-native-paper';

interface HolidayFactProps {
    holidayName: string;
    fact: string;
}

const HolidayFact: React.FC<HolidayFactProps> = ({ holidayName, fact }) => {
    return (
        <Card style={styles.card}>
            <Card.Content>
                <Title>Did you know?</Title>
                <Paragraph style={styles.fact}>{fact}</Paragraph>
            </Card.Content>
        </Card>
    );
};

const styles = StyleSheet.create({
    card: {
        margin: 16,
        backgroundColor: '#FFFDE7',
        elevation: 2,
    },
    fact: {
        fontStyle: 'italic',
        marginTop: 8,
        lineHeight: 22,
    },
});

export default HolidayFact;
