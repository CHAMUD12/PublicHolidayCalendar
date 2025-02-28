// import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, Text, View } from 'react-native';
//
// export default function App() {
//   return (
//     <View style={styles.container}>
//       <Text>Open up App.tsx to start working on your app!</Text>
//       <StatusBar style="auto" />
//     </View>
//   );
// }
//
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
// App.tsx
import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { Provider as StoreProvider } from 'react-redux';
import { store } from './src/store/store';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigator from './src/navigation';
import { StatusBar } from 'expo-status-bar';
import { useSelector } from 'react-redux';
import { RootState } from './src/store/store';

// Theme configuration for react-native-paper
const ThemeWrapper = () => {
  const { theme } = useSelector((state: RootState) => state.settings);

  const paperTheme = {
    ...(theme === 'dark'
        ? {
          colors: {
            primary: '#2196F3',
            accent: '#FF4081',
            background: '#121212',
            surface: '#1E1E1E',
            text: '#FFFFFF',
            error: '#CF6679'
          }
        }
        : {
          colors: {
            primary: '#2196F3',
            accent: '#FF4081',
            background: '#F5F5F5',
            surface: '#FFFFFF',
            text: '#000000',
            error: '#B00020'
          }
        }),
    dark: theme === 'dark',
  };

  return (
      <>
        <StatusBar style={theme === 'dark' ? 'light' : 'dark'} />
        <PaperProvider theme={paperTheme as any}>
          <AppNavigator />
        </PaperProvider>
      </>
  );
};

// Root component
export default function App() {
  return (
      <StoreProvider store={store}>
        <SafeAreaProvider>
          <ThemeWrapper />
        </SafeAreaProvider>
      </StoreProvider>
  );
}
