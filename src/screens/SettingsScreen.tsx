// src/screens/SettingsScreen.tsx
import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { toggleTheme } from '../store/settingsSlice';
import {
    List,
    Switch,
    Divider,
    Title,
    Card,
    Paragraph
} from 'react-native-paper';

const SettingsScreen: React.FC = () => {
    const dispatch = useDispatch();
    const { theme } = useSelector((state: RootState) => state.settings);

    const handleToggleTheme = () => {
        dispatch(toggleTheme());
    };

    return (
        <ScrollView style={styles.container}>
            <Title style={styles.title}>Settings</Title>

            <List.Section>
                <List.Subheader>Appearance</List.Subheader>
                <List.Item
                    title="Dark Mode"
                    left={props => <List.Icon {...props} icon="theme-light-dark" />}
                    right={() => (
                        <Switch
                            value={theme === 'dark'}
                            onValueChange={handleToggleTheme}
                        />
                    )}
                />
            </List.Section>

            <Divider />

            <Card style={styles.card}>
                <Card.Content>
                    <Title>About</Title>
                    <Paragraph>
                        Public Holiday Calendar App
                    </Paragraph>
                    <Paragraph style={styles.version}>
                        Version 1.0.0
                    </Paragraph>
                </Card.Content>
            </Card>

            <Card style={styles.card}>
                <Card.Content>
                    <Title>Data Source</Title>
                    <Paragraph>
                        This app uses the Nager.Date API to provide holiday information.
                    </Paragraph>
                </Card.Content>
            </Card>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    title: {
        margin: 16,
        fontSize: 24,
    },
    card: {
        margin: 16,
    },
    version: {
        marginTop: 8,
        color: '#757575',
    },
});

export default SettingsScreen;
