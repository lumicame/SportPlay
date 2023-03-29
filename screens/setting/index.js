import { View, Text, TextInput, ScrollView, Image, TouchableOpacity, Alert } from 'react-native'
import React, { useState, useContext } from 'react'
import styles from './styles'
import LoadingModal from '../../components/LoadModal'
import { UserContext } from '../../contexts/UserManager'
import { LinearGradient } from 'expo-linear-gradient';
import colors from '../../assets/colors.json'
import Icon from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AVATAR } from '../../config'



export default function Setting({ navigation }) {
  const [userData, setUserData] = useState({ email: '', password: '' })
  const [secureText, setSecureText] = useState(true)
  const [loading, setLoading] = useState(false)
  const {user, setUser } = useContext(UserContext)

  const onChangeHandler = (input, value) => {
    setUserData({ ...userData, [input]: value })
  }
  const logOut = async () => {
    await AsyncStorage.removeItem('@jwt')
    setUser(null)
  }

  return (
    <View style={{backgroundColor:colors.darkBg,flex:1}}>
      <LoadingModal loading={loading} />
      <ScrollView >
        <View style={{ marginVertical:10}}>
          <Image style={{height:120,width:120, borderRadius:60, alignSelf:'center'}} source={{uri:`${AVATAR}${user.avatar}`}}/>
          <Text style={styles.titleAvatar}>{user.name}</Text>
          <View style={styles.card}>
            <TouchableOpacity>
                <View style={{flexDirection:'row',padding:5}}>
                    <Icon name='apple-alt' size={35}/>
                    <Text style={styles.textOptions}>Perfil</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity>
                <View style={{flexDirection:'row',padding:5}}>
                    <Icon name='apple-alt' size={35}/>
                    <Text style={styles.textOptions}>Perfil</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>logOut()}>
                <View style={{flexDirection:'row',padding:5}}>
                    <Icon name='sign-out-alt' color={colors.greenBg} size={35}/>
                    <Text style={styles.textOptions}>Cerrar Sesión</Text>
                </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  )
}