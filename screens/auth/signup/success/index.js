import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { useContext } from 'react'
import styles from './styles'
import texts from './text.json'
import { UserContext } from '../../../../contexts/UserManager'

export default function SignUpSuccess({ user }) {
  const { setUser } = useContext(UserContext)

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          style={styles.logo} />
      </View>
      <Text style={styles.title}>REGISTRO EXITOSO!</Text>
      <View style={styles.imageContainer}>
      </View>
      <TouchableOpacity style={styles.button} onPress={() => setUser(user)}>
        <Text style={styles.buttonText}>EMPECEMOS</Text>
      </TouchableOpacity>
    </View>
  )
}
