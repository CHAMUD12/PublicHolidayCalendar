// // src/navigation/index.tsx
// import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { Ionicons } from '@expo/vector-icons';
// import { useSelector } from 'react-redux';
// import { RootState } from '../store/store';
// import { DefaultTheme, DarkTheme } from '@react-navigation/native';
//
//
// // Import screens
// import HomeScreen from '../screens/HomeScreen';
// import DetailsScreen from '../screens/DetailsScreen';
// import CalendarScreen from '../screens/CalendarScreen';
// import ComparisonScreen from '../screens/ComparisonScreen';
// import SettingsScreen from '../screens/SettingsScreen';
//
// // Import types
// import { RootStackParamList } from '../types/navigation';
//
// const Stack = createStackNavigator<RootStackParamList>();
// const Tab = createBottomTabNavigator();
//
// // Main stack navigator for the home tab
// const HomeStack = () => {
//     return (
//         <Stack.Navigator>
//             <Stack.Screen
//                 name="Home"
//                 component={HomeScreen}
//                 options={{ title: 'Public Holidays' }}
//             />
//             <Stack.Screen
//                 name="Details"
//                 component={DetailsScreen}
//                 options={{ title: 'Holiday Details' }}
//             />
//         </Stack.Navigator>
//     );
// };
//
// // Main application navigator with bottom tabs
// const AppNavigator = () => {
//     const { theme } = useSelector((state: RootState) => state.settings);
//
//     return (
//         <NavigationContainer
//             theme={theme === 'dark' ? {
//                 ...DarkTheme,
//                 colors: {
//                     ...DarkTheme.colors,
//                     primary: '#1976D2',
//                     background: '#121212',
//                     card: '#1E1E1E',
//                     text: '#ffffff',
//                     border: '#333333',
//                     notification: '#FF4081',
//                 }
//             } : {
//                 ...DefaultTheme,
//                 colors: {
//                     ...DefaultTheme.colors,
//                     primary: '#1976D2',
//                     background: '#f5f5f5',
//                     card: '#ffffff',
//                     text: '#000000',
//                     border: '#e0e0e0',
//                     notification: '#FF4081',
//                 }
//             }
//
//         }
//         >
//             //------------
//
//             //------------
//             <Tab.Navigator
//                 screenOptions={({ route }) => ({
//                     tabBarIcon: ({ focused, color, size }) => {
//                         let iconName;
//
//                         if (route.name === 'HomeTab') {
//                             iconName = focused ? 'home' : 'home-outline';
//                         } else if (route.name === 'Calendar') {
//                             iconName = focused ? 'calendar' : 'calendar-outline';
//                         } else if (route.name === 'Comparison') {
//                             iconName = focused ? 'git-compare' : 'git-compare-outline';
//                         } else if (route.name === 'Settings') {
//                             iconName = focused ? 'settings' : 'settings-outline';
//                         }
//
//                         return <Ionicons name={iconName as any} size={size} color={color} />;
//                     },
//                     tabBarActiveTintColor: '#1976D2',
//                     tabBarInactiveTintColor: 'gray',
//                 })}
//             >
//                 <Tab.Screen
//                     name="HomeTab"
//                     component={HomeStack}
//                     options={{
//                         headerShown: false,
//                         title: 'Home'
//                     }}
//                 />
//                 <Tab.Screen
//                     name="Calendar"
//                     component={CalendarScreen}
//                     options={{ title: 'Calendar' }}
//                 />
//                 <Tab.Screen
//                     name="Comparison"
//                     component={ComparisonScreen}
//                     options={{ title: 'Compare' }}
//                 />
//                 <Tab.Screen
//                     name="Settings"
//                     component={SettingsScreen}
//                     options={{ title: 'Settings' }}
//                 />
//             </Tab.Navigator>
//         </NavigationContainer>
//     );
// };
//
// export default AppNavigator;
// src/navigation/index.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { DefaultTheme, DarkTheme } from '@react-navigation/native';


// Import screens
import HomeScreen from '../screens/HomeScreen';
import DetailsScreen from '../screens/DetailsScreen';
import CalendarScreen from '../screens/CalendarScreen';
import ComparisonScreen from '../screens/ComparisonScreen';
import SettingsScreen from '../screens/SettingsScreen';

// Import types
import { RootStackParamList } from '../types/navigation';

const Stack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

// Main stack navigator for the home tab
const HomeStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Home"
                component={HomeScreen}
                options={{ title: 'Public Holidays' }}
            />
            <Stack.Screen
                name="Details"
                component={DetailsScreen}
                options={{ title: 'Holiday Details' }}
            />
        </Stack.Navigator>
    );
};

// Main application navigator with bottom tabs
const AppNavigator = () => {
    const { theme } = useSelector((state: RootState) => state.settings);

    return (
        <NavigationContainer
            theme={theme === 'dark' ? {
                ...DarkTheme,
                colors: {
                    ...DarkTheme.colors,
                    primary: '#1976D2',
                    background: '#121212',
                    card: '#1E1E1E',
                    text: '#ffffff',
                    border: '#333333',
                    notification: '#FF4081',
                }
            } : {
                ...DefaultTheme,
                colors: {
                    ...DefaultTheme.colors,
                    primary: '#1976D2',
                    background: '#f5f5f5',
                    card: '#ffffff',
                    text: '#000000',
                    border: '#e0e0e0',
                    notification: '#FF4081',
                }
            }
            }
        >
            {/* Remove or comment properly */}

            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;

                        if (route.name === 'HomeTab') {
                            iconName = focused ? 'home' : 'home-outline';
                        } else if (route.name === 'Calendar') {
                            iconName = focused ? 'calendar' : 'calendar-outline';
                        } else if (route.name === 'Comparison') {
                            iconName = focused ? 'git-compare' : 'git-compare-outline';
                        } else if (route.name === 'Settings') {
                            iconName = focused ? 'settings' : 'settings-outline';
                        }

                        return <Ionicons name={iconName as any} size={size} color={color} />;
                    },
                    tabBarActiveTintColor: '#1976D2',
                    tabBarInactiveTintColor: 'gray',
                })}
            >
                <Tab.Screen
                    name="HomeTab"
                    component={HomeStack}
                    options={{
                        headerShown: false,
                        title: 'Home'
                    }}
                />
                <Tab.Screen
                    name="Calendar"
                    component={CalendarScreen}
                    options={{ title: 'Calendar' }}
                />
                <Tab.Screen
                    name="Comparison"
                    component={ComparisonScreen}
                    options={{ title: 'Compare' }}
                />
                <Tab.Screen
                    name="Settings"
                    component={SettingsScreen}
                    options={{ title: 'Settings' }}
                />
            </Tab.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;
