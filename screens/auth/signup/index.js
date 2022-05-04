import { View, Text, TextInput, ScrollView, Image, TouchableOpacity, Alert } from 'react-native'
import React, { useState, useContext } from 'react'
import styles from './styles'
import LoadingModal from '../../../components/LoadModal'
import Picker from '../../../components/Picker'
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function SignUp({ navigation }) {
  const [userData, setUserData] = useState({ name: '', email: '', gender: '', country: '', age: '', password: '' })
  const [secureText, setSecureText] = useState(true)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [user, setUser] = useState(null)

  const onChangeHandler = (input, value) => {
    setUserData({ ...userData, [input]: value })
  }

  const genderList = [
    { label: "Hombre", value: 'male' },
    { label: "Mujer", value: 'female' },
    { label: "Otro", value: 'other' }
  ]

  return (
    success ?
      <SignUpSuccess navigation={navigation} user={user} />
      :
      <View>
        <LoadingModal loading={loading} />
        <ScrollView style={styles.container}>
          <View style={styles.imageContainer}>
            <Image
              style={styles.image} />
          </View>
          <Text style={styles.title}>Registrarse</Text>
          <View style={styles.textInputContainer}>
            <TextInput
              value={userData.name}
              onChangeText={(v) => onChangeHandler('name', v)}
              style={styles.textInput}
              placeholder="Nmobre completo"
              placeholderTextColor='#000000' />
          </View>
          <View style={styles.textInputContainer}>
            <TextInput
              keyboardType='email-address'
              value={userData.email}
              onChangeText={(v) => onChangeHandler('email', v)}
              style={styles.textInput}
              placeholder="Correo Electronico"
              placeholderTextColor='#000000' />
          </View>
          <View style={styles.textInputContainer}>
            <TextInput
              value={userData.password}
              onChangeText={(v) => onChangeHandler('password', v)}
              style={styles.textInput}
              placeholder="Contraseña"
              placeholderTextColor='#000000' />
          </View>
          <View style={styles.textInputContainer}>
            <Picker
              values={genderList}
              placeholder="Genero"
              style={styles.textInput}
              onChangeValue={(v) => onChangeHandler('gender', v)} />
          </View>
          <View style={styles.textInputContainer}>
            <TextInput
              value={userData.country}
              onChangeText={(v) => onChangeHandler('country', v)}
              style={styles.textInput}
              placeholder="Ciudad"
              placeholderTextColor='#000000' />
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={() => {}}>
              <Text style={styles.buttonText}>Registrarse</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.footerTextContainer} onPress={() => navigation.navigate('LogIn')}>
            <Text style={styles.footerText1}>Ya tienes una cuenta?</Text>
            <Text style={styles.footerText2}>Inicia Sesión</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
  )
}
