import { View, Text, TextInput, ScrollView, Image, TouchableOpacity, Alert } from 'react-native'
import React, { useState, useContext } from 'react'
import styles from './styles'
import LoadingModal from '../../../components/LoadModal'
import { UserContext } from '../../../contexts/UserManager'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { backgroundColor } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes'
import { LinearGradient } from 'expo-linear-gradient';
import { logIn } from '../../../api/user'


const logInFunc = async (userData, setLoading, setUser) => {
  setLoading(true)
  for (const e of Object.values(userData)) {
    if (e.trim() === '') {
      Alert.alert('',
        'Faltan campos por llenar',
        [
          { text: 'Entendido' }
        ])
      setLoading(false)
      return
    }
  }
  const res = await logIn(userData)
  if (res.status) {
    //setLoading(false)
    //return console.log(res.data.token)
    await AsyncStorage.setItem('@jwt', res.data.token)
    setUser(res.data.user)
    //setTimeout(() => navigation.navigate('Home'), 1000);
    return
  } else {
    if (res.error?.response?.data?.message) {
      Alert.alert('',
        res.error?.response?.data?.message,
        [
          { text: 'Volver' }
        ])
    } else {
      Alert.alert('',
        'Ocurrio un error',
        [
          { text: 'Volver' }
        ])
    }
  }
  setLoading(false)
}

export default function LogIn({ navigation }) {
  const [userData, setUserData] = useState({ email: '', password: '' })
  const [secureText, setSecureText] = useState(true)
  const [loading, setLoading] = useState(false)
  const { setUser } = useContext(UserContext)

  const onChangeHandler = (input, value) => {
    setUserData({ ...userData, [input]: value })
  }

  return (
    <View>
      <LoadingModal loading={loading} />
      <ScrollView style={styles.container}>
        <View style={{flex:1}}>
          <View style={styles.imageContainer}>
          <Image
            source={require('../../../assets/icon.png')}
            style={styles.image} />
        </View>
        <Text style={styles.title}>SPORT PLAY</Text>
        </View>
        
        <View style={{flex:1,backgroundColor:"#212335",height:"100%",borderRadius:30,paddingTop:20}}>
          <TextInput
            value={userData.email}
            onChangeText={(v) => onChangeHandler('email', v)}
            style={styles.textInput}
            placeholder="Correo"
            placeholderTextColor='#ffffff'
            textContentType='emailAddress' />
          <TextInput
            value={userData.password}
            onChangeText={(v) => onChangeHandler('password', v)}
            style={styles.textInput}
            placeholder="Contraseña"
            placeholderTextColor='#ffffff'
            secureTextEntry={true} />
       
       
       <TouchableOpacity style={{alignSelf:'flex-end',marginTop:10}}>
          <Text style={styles.middleText}>Olvide mi contraseña</Text>
        </TouchableOpacity>
        
       <TouchableOpacity style={{...styles.buttonContainer}} onPress={() => logInFunc(userData,setLoading,setUser)}>
       <LinearGradient
        colors={['#fbb70e', '#dd53db','#3ba2e2']}
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 1 }}
        style={styles.button}>
            <Text style={styles.buttonText}>Iniciar Sesión</Text>
            </LinearGradient>
        </TouchableOpacity>
          
        
        <TouchableOpacity style={styles.footerTextContainer} onPress={() => navigation.navigate('SignUp')}>
          <Text style={styles.footerText1}>No tienes una cuenta?</Text>
          <Text style={styles.footerText2}>Creala aqui</Text>
        </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  )
}
