// src/screens/DetailsScreen.tsx
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { Card, Title, Paragraph, Divider } from 'react-native-paper';
import { RootStackParamList } from '../types/navigation';
import HolidayFact from '../components/HolidayFact';
import moment from 'moment';

type DetailsScreenRouteProp = RouteProp<RootStackParamList, 'Details'>;

const DetailsScreen: React.FC = () => {
    const route = useRoute<DetailsScreenRouteProp>();
    const { holiday } = route.params;

    const formatDate = (dateString: string) => {
        return moment(dateString).format('MMMM D, YYYY');
    };

    return (
        <ScrollView style={styles.container}>
            <Card style={styles.card}>
                <Card.Content>
                    <Title style={styles.title}>{holiday.localName}</Title>

                    {holiday.localName !== holiday.name && (
                        <Paragraph style={styles.internationalName}>
                            Also known as: {holiday.name}
                        </Paragraph>
                    )}

                    <Divider style={styles.divider} />

                    <View style={styles.infoRow}>
                        <Title style={styles.infoLabel}>Date:</Title>
                        <Paragraph style={styles.infoValue}>{formatDate(holiday.date)}</Paragraph>
                    </View>

                    <View style={styles.infoRow}>
                        <Title style={styles.infoLabel}>Country:</Title>
                        <Paragraph style={styles.infoValue}>{holiday.countryCode}</Paragraph>
                    </View>

                    {holiday.daysUntil !== undefined && (
                        <View style={styles.countdownContainer}>
                            <Title style={styles.countdownTitle}>
                                {holiday.daysUntil === 0
                                    ? 'Today!' // src/screens/DetailsScreen.tsx (continued)
                                    : holiday.daysUntil === 1
                                        ? 'Tomorrow!'
                                        : `${holiday.daysUntil} days away`}
                            </Title>
                        </View>
                    )}

                    {holiday.types && holiday.types.length > 0 && (
                        <>
                            <Divider style={styles.divider} />
                            <Title style={styles.sectionTitle}>Holiday Type</Title>
                            <View style={styles.typesContainer}>
                                {holiday.types.map((type, index) => (
                                    <View key={index} style={styles.typeChip}>
                                        <Paragraph>{type}</Paragraph>
                                    </View>
                                ))}
                            </View>
                        </>
                    )}
                </Card.Content>
            </Card>

            {holiday.fact && (
                <HolidayFact
                    holidayName={holiday.name}
                    fact={holiday.fact}
                />
            )}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    card: {
        margin: 16,
        elevation: 4,
    },
    title: {
        fontSize: 24,
        textAlign: 'center',
        marginBottom: 8,
    },
    internationalName: {
        textAlign: 'center',
        fontStyle: 'italic',
        marginBottom: 8,
    },
    divider: {
        marginVertical: 16,
    },
    infoRow: {
        flexDirection: 'row',
        marginVertical: 4,
        alignItems: 'center',
    },
    infoLabel: {
        fontSize: 16,
        marginRight: 8,
        flex: 1,
    },
    infoValue: {
        flex: 2,
        fontSize: 16,
    },
    countdownContainer: {
        marginTop: 16,
        padding: 12,
        backgroundColor: '#f0f8ff',
        borderRadius: 8,
        alignItems: 'center',
    },
    countdownTitle: {
        color: '#1976D2',
    },
    sectionTitle: {
        fontSize: 18,
        marginBottom: 8,
    },
    typesContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    typeChip: {
        backgroundColor: '#E3F2FD',
        borderRadius: 16,
        paddingVertical: 4,
        paddingHorizontal: 12,
        margin: 4,
    },
});

export default DetailsScreen;
