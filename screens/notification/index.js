import { View, Text, TextInput, ScrollView, Image, TouchableOpacity, Alert } from 'react-native'
import React, { useState, useContext } from 'react'
import styles from './styles'
import LoadingModal from '../../components/LoadModal'
import { UserContext } from '../../contexts/UserManager'
import { LinearGradient } from 'expo-linear-gradient';
import colors from '../../assets/colors.json'

export default function Notification({ navigation }) {
  const [loading, setLoading] = useState(false)


  return (
    <View style={{backgroundColor:colors.darkBg,flex:1}}>
      <LoadingModal loading={loading} />
      <ScrollView >
        <View style={{...styles.container}}>
            <TouchableOpacity style={{...styles.card}}>
                <View style={{marginLeft:10}}>
                    <Image style={{width:40,height:40,borderRadius:20}} source={require('../../assets/avatar.png')}/>
                </View>
                <View style={{marginLeft:15}}>
                    <Text style={{fontFamily:'RubikMedium',fontSize:20,color:colors.greenBg}}>User #1</Text>
                    <Text style={{fontFamily:'RubikLight',fontSize:13,color:colors.gray,marginLeft:10}}>Mar 06, 08:30 AM</Text>
                    <Text style={{fontFamily:'RubikRegular',fontSize:17,color:colors.white,marginTop:10}}>Te a enviado una oferta</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={{...styles.card}}>
                <View style={{marginLeft:10}}>
                    <Image style={{width:40,height:40,borderRadius:20}} source={require('../../assets/avatar.png')}/>
                </View>
                <View style={{marginLeft:15}}>
                    <Text style={{fontFamily:'RubikMedium',fontSize:20,color:colors.greenBg}}>User #2</Text>
                    <Text style={{fontFamily:'RubikLight',fontSize:13,color:colors.gray,marginLeft:10}}>Mar 06, 08:30 AM</Text>
                    <Text style={{fontFamily:'RubikRegular',fontSize:17,color:colors.white,marginTop:10}}>Te a enviado una oferta</Text>
                </View>
            </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  )
}