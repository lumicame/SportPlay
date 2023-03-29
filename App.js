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
import { logInJWT } from './api/user';
import Loading from './components/Loading';
import LogIn from './screens/auth/login';
import SignUp from './screens/auth/signup';
import Tabs from './components/Navigation'
import requestIdleCallback from 'react-native-web/dist/cjs/modules/requestIdleCallback';
import Setting from './screens/setting';


const Stack = createNativeStackNavigator();

export default function App() {
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState(null)
  const [theme, setTheme] = useState('Light')
  const [language, setLanguage] = useState('es')
  const [firstTime, setFirstTime] = useState(false)

  const [loaded] = useFonts({
    ComfortaaBold: require('./assets/fonts/Comfortaa-Bold.ttf'),
    ComfortaaLight: require('./assets/fonts/Comfortaa-Light.ttf'),
    ComfortaaMedium: require('./assets/fonts/Comfortaa-Medium.ttf'),
    ComfortaaRegular: require('./assets/fonts/Comfortaa-Regular.ttf'),
    ComfortaaSemiBold: require('./assets/fonts/Comfortaa-SemiBold.ttf'),
    RubikBold:require('./assets/fonts/rubik/Rubik-Bold.ttf'),
    RubikLight:require('./assets/fonts/rubik/Rubik-Light.ttf'),
    RubikMedium:require('./assets/fonts/rubik/Rubik-Medium.ttf'),
    RubikRegular:require('./assets/fonts/rubik/Rubik-Regular.ttf'),
  })
  const toggleTheme = async () => {
    if (theme === 'Light') {
      setTheme('Dark');
      await AsyncStorage.setItem('@theme', 'Dark')
    } else {
      setTheme('Light');
      await AsyncStorage.setItem('@theme', 'Light')
    }
  }
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
  }
  const getUser = async () => {
    try {
      const res = await logInJWT()
      //return console.log(res) 
      if (res.status) 
      setUser(res.data)
      else setUser(null)
    } catch (error) {
      console.error(error.AxiosError);
    }
  } 
  
  useEffect(() => {
    //LogBox.ignoreAllLogs(true)
    const init = async () => {
      //await AsyncStorage.removeItem('@first')
      // Get user data
      await getUser()
      try {
        // Get theme
        const themeStorage = await AsyncStorage.getItem('@theme')
        if (!themeStorage) {
          await AsyncStorage.setItem('@theme', 'Light')
        } else {
          setTheme(themeStorage)
        }
      } catch (error) {
        console.error(error);
      }
      // Initial language
      const savedLanguage = await AsyncStorage.getItem('@language')
      if (savedLanguage) {
        setLanguage(savedLanguage)
      } else {
        // Setup langueage with i18n
      }
      setLoading(false)
      // Initial screen to show
     // if (!(await AsyncStorage.getItem('@first'))) setFirstTime(true)
      setLoading(false)
    }
    init()
  }, [])
  useEffect(() => {
    if (user) {
      setFirstTime(false)
    } else {
      setTheme('Light')
    }
  }, [user])
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <UserContext.Provider value={{ user, setUser, getUser }}>
        <LanguageContext.Provider value={{ language, toggleLanguage }}>
          <StatusBar style='light' backgroundColor={theme === 'Light' ? '#1f1d2f' : '#1f1d2f'} translucent={false} />
          {loading || !loaded ?
            <Loading />
            :
            <NavigationContainer>
                { user ?
                    <>
                      <Tabs/>
                      <Stack.Screen name='Setting' component={Setting} />
                    </>
                    :
                    <>
                      <Stack.Navigator screenOptions={{ headerShown: false, animation: 'none' }} >
                      <Stack.Screen name='LogIn' component={LogIn} />
                      <Stack.Screen name='SignUp' component={SignUp} />
                      </Stack.Navigator>
                    </>}
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
