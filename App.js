import React, { useEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFonts } from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, Text, View } from 'react-native';
import { ThemeContext } from './contexts/ThemeManager';
import { UserContext } from './contexts/UserManager';
import { LanguageContext } from './contexts/LanguageManager';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Loading from './components/Loading';
import LogIn from './screens/auth/login';
import SignUp from './screens/auth/signup';

const Stack = createNativeStackNavigator();

export default function App() {
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState(null)
  const [theme, setTheme] = useState('Light')
  const [language, setLanguage] = useState('es')

  const [loaded] = useFonts({
    ComfortaaBold: require('./assets/fonts/Comfortaa-Bold.ttf'),
    ComfortaaLight: require('./assets/fonts/Comfortaa-Light.ttf'),
    ComfortaaMedium: require('./assets/fonts/Comfortaa-Medium.ttf'),
    ComfortaaRegular: require('./assets/fonts/Comfortaa-Regular.ttf'),
    ComfortaaSemiBold: require('./assets/fonts/Comfortaa-SemiBold.ttf'),
  });
  const toggleTheme = async () => {
    if (theme === 'Light') {
      setTheme('Dark');
      await AsyncStorage.setItem('@theme', 'Dark')
    } else {
      setTheme('Light');
      await AsyncStorage.setItem('@theme', 'Light')
    }
  };
  const toggleLanguage = async () => {
    if (language === 'es') {
      moment.locale('en')
      await AsyncStorage.setItem('@language', 'en')
      setLanguage('en');
    } else {
      moment.locale('es-us')
      await AsyncStorage.setItem('@language', 'es')
      setLanguage('es');
    }
  };
  const getUser = async () => {
    try {
      const res = await logInJWT()
      if (res.status) setUser(res.data)
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <UserContext.Provider value={{ user, setUser, getUser }}>
        <LanguageContext.Provider value={{ language, toggleLanguage }}>
          <StatusBar style='light' backgroundColor={theme === 'Light' ? '#10C9AA' : '#1F2C34'} translucent={false} />
          {loading || !loaded ?
            <Loading />
            :
            <NavigationContainer>
              <Stack.Navigator screenOptions={{ headerShown: false, animation: 'none' }} >
                { user ?
                    <>
                      <Stack.Screen name='Home' component={Home} />
                    </>
                    :
                    <>
                      <Stack.Screen name='LogIn' component={LogIn} />
                      <Stack.Screen name='SignUp' component={SignUp} />
                    </>}
              </Stack.Navigator>
            </NavigationContainer>
          }
        </LanguageContext.Provider>
      </UserContext.Provider>
    </ThemeContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
