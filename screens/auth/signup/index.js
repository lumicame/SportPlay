import { View, Text, TextInput, ScrollView, Image, TouchableOpacity, Alert } from 'react-native'
import React, { useState, useContext, useEffect } from 'react'
import styles from './styles'
import LoadingModal from '../../../components/LoadModal'
import Picker from '../../../components/Picker'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { LinearGradient } from 'expo-linear-gradient'
import SignUpSuccess from './success'
import colors from '../../../assets/colors.json'
import Icon from 'react-native-vector-icons/FontAwesome5';
import { loadCities } from '../../../api/user'
import { registerUser } from '../../../api/user'
import { UserContext } from '../../../contexts/UserManager'
import * as ImagePicker from 'expo-image-picker';
import moment from 'moment'
import DateTimePicker from '@react-native-community/datetimepicker';

const registerFun = async (userData, setLoading, setUser) => {
  setLoading(true)
  const res = await registerUser(userData)
  if (res.status) {
    await AsyncStorage.setItem('@jwt', res.data.token)
    setUser(res.data.user)
    console.log(res.data)
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


export default function SignUp({ navigation }) {
  const [userData, setUserData] = useState({ name: '', email: '', gender: '', city: '', age: new Date('2000/01/01'), password: '', image: '' })
  const [secureText, setSecureText] = useState(true)
  const [loading, setLoading] = useState(false)
  const [arrayCities, setArrayCities] = useState([])
  const [show, setShow] = useState(false);
  const [btnEnable, setBtnEnable] = useState(false);
  const { setUser } = useContext(UserContext)

  useEffect(() => {
    var s = true
    if (userData.name.trim() == "" || userData.email.trim() == "" || userData.gender.trim() == "" || userData.city.trim() == "" || userData.password.trim() == "")
      s = false
    setBtnEnable(s)
  }, [userData])

  useEffect(async () => {
    const res = await loadCities()
    const array = []
    if (res.status) {
      res.data.forEach(element => {
        array.push({ label: element.name, value: String(element.id) })
      });
      setArrayCities(array)
    }
  }, [])
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setUserData({ ...userData, image: result.uri })
    } else {
      setUserData({ ...userData, image: '' })
    }
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    if (currentDate)
      setUserData({ ...userData, ["age"]: currentDate })
  };

  const onChangeHandler = (input, value) => {
    setUserData({ ...userData, [input]: value })
  }

  const genderList = [
    { label: "Hombre", value: 'Hombre' },
    { label: "Mujer", value: 'Mujer' },
    { label: "Otro", value: 'Otro' }
  ]

  return (
      <>
        <LoadingModal loading={loading} />
        <ScrollView style={styles.container}>
          <View>
            <Text style={styles.title}>Registrarse</Text>
            <View style={{ justifyContent: 'center', width: 100, height: 100, alignSelf: 'center', marginTop: 20 }}>
              <TouchableOpacity style={{ zIndex: 2, bottom: 2, right: 2, position: 'absolute', width: 36, height: 36, justifyContent: 'center', backgroundColor: colors.greenBg, borderRadius: 18 }} onPress={pickImage}>
                <Icon name='image' size={20} color={colors.white} style={{ alignSelf: 'center' }} />
              </TouchableOpacity>
              {userData.image ? <Image source={{ uri: userData.image }} style={{ width: 100, height: 100, borderRadius: 50 }} /> :
                <View style={{ width: 100, height: 100, borderRadius: 50, justifyContent: 'center', backgroundColor: colors.gray }}>
                  <Icon name='user' color={colors.white} size={50} style={{ alignSelf: 'center' }} />
                </View>}

            </View>
            <View style={styles.textInputContainer}>
              <TextInput
                value={userData.name}
                onChangeText={(v) => onChangeHandler('name', v)}
                style={styles.textInput}
                placeholder="Nmobre completo"
                placeholderTextColor='#ffffff70' />
            </View>
            <View style={styles.textInputContainer}>
              <TextInput
                keyboardType='email-address'
                value={userData.email}
                onChangeText={(v) => onChangeHandler('email', v)}
                style={styles.textInput}
                placeholder="Correo Electronico"
                placeholderTextColor='#ffffff70' />
            </View>
            <View style={styles.textInputContainer}>
              <TextInput
                value={userData.password}
                onChangeText={(v) => onChangeHandler('password', v)}
                style={styles.textInput}
                placeholder="Contraseña"
                placeholderTextColor='#ffffff70'
                secureTextEntry={true}
              />
            </View>
            <View>
              <TouchableOpacity onPress={() => setShow(true)} style={{ ...styles.textDate }}>
                <Text style={{ fontFamily: 'RubikMedium', fontSize: 18, color: "#FFFFFF" }}>
                  {moment(userData.age).format('DD-MMMM-YYYY')}
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.textInputContainer}>
              <Picker
                values={genderList}
                placeholder="Genero"
                style={styles.textDate}
                color="#ffffff70"
                onChangeValue={(v) => onChangeHandler('gender', v)} />
            </View>
            <View style={styles.textInputContainer}>
              <Picker
                values={arrayCities}
                placeholder="Ciudad"
                style={styles.textDate}
                color="#ffffff70"
                onChangeValue={(v) => onChangeHandler('city', v)} />
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={{ width: "100%" }} disabled={btnEnable ? false : true} onPress={() => { registerFun(userData,setLoading,setUser)}}>
                {btnEnable ?
                  <LinearGradient
                    colors={['#fbb70e', '#dd53db', '#3ba2e2']}
                    start={{ x: 0, y: 1 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.button}>
                    <Text style={styles.buttonText}>Registrar</Text>
                  </LinearGradient> :
                  <View style={styles.button}>
                    <Text style={styles.buttonText}>Registrar</Text>
                  </View>
                }
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.footerTextContainer} onPress={() => navigation.navigate('LogIn')}>
              <Text style={styles.footerText1}>Ya tienes una cuenta?</Text>
              <Text style={styles.footerText2}>Inicia Sesión</Text>
            </TouchableOpacity>
          </View>

        </ScrollView>
        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={userData.age}
            mode='date'
            onChange={onChange}
          />
        )}
      </>
  )
}
