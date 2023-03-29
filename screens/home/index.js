import { View, Text, TextInput, ScrollView, Image, TouchableOpacity, Alert } from 'react-native'
import React, { useState, useContext } from 'react'
import styles from './styles'
import LoadingModal from '../../components/LoadModal'
import { UserContext } from '../../contexts/UserManager'
import { LinearGradient } from 'expo-linear-gradient';
import colors from '../../assets/colors.json'
import SegmentedControlTab from "react-native-segmented-control-tab";


export default function Home({ navigation }) {
  const [index, setIndex] = useState(0)
  const [loading, setLoading] = useState(false)



  return (
    <View style={{ backgroundColor: colors.darkBg, flex: 1 }}>
      <LoadingModal loading={loading} />
      <SegmentedControlTab
        values={["INICIO", "PARTIDOS", "VS"]}
        selectedIndex={index}
        onTabPress={setIndex}
        tabsContainerStyle={{ height: 35, marginHorizontal: 10, marginVertical: 10 }}
        tabTextStyle={{ color: colors.white, fontFamily: 'RubikMedium', fontSize: 20 }}
        tabStyle={{ marginHorizontal: 5, borderRadius: 5, padding: 0, backgroundColor: "#00000000", borderColor: "#ffffff00" }}
        activeTabStyle={{ backgroundColor: colors.midGreen2, borderColor: '#212340', padding: 0, borderRadius: 5 }}
        tabBadgeContainerStyle={{ backgroundColor: colors.orange, justifyContent: 'center' }}
        tabBadgeStyle={{ color: colors.white, textAlign: 'center' }}
        activeTabBadgeContainerStyle={{ backgroundColor: colors.orange, justifyContent: 'center' }}
        activeTabBadgeStyle={{ color: colors.white, textAlign: 'center' }}
        badges={[0, 0, 2]}
      />
      <ScrollView >
        {index == 0 ?
          <View >

            <Text style={styles.textTitleDate}>SPORT PLAY {index}</Text>
          </View>
          :
          index == 1 ?
            <View style={styles.container}>
              <Text style={{ ...styles.textTitleDate }}>Miercoles, May 18</Text>

              <TouchableOpacity style={{ backgroundColor: '#252837', borderRadius: 25, padding: 10 }}>
                <Text style={{ textAlign: 'center', alignSelf: 'center', color: colors.gray, marginRight: 10 }}>La Catedral - 08:00 PM</Text>
                <View style={{ flexDirection: 'row' }}>
                  <TouchableOpacity style={{ flex: 1, marginTop: 20 }}>
                    <Image source={require('../../assets/avatar.png')} style={{ width: 50, height: 50, borderRadius: 25, alignSelf: 'center' }} />
                    <Text style={{ fontFamily: 'RubikBold', fontSize: 15, color: colors.white, textAlign: 'center', marginVertical: 3 }}>Team Power FC</Text>
                    <Text style={{ fontFamily: 'RubikRegular', fontSize: 15, color: colors.white, textAlign: 'center', marginVertical: 3 }}>Jorge Martinez (DT)</Text>
                    <View style={{ flexDirection: 'row' }}>
                      <Text style={{ fontFamily: 'RubikMedium', color: colors.midGreen, paddingHorizontal: 10, flex: 1, textAlign: 'center' }}>G{'\n'}0</Text>
                      <Text style={{ fontFamily: 'RubikMedium', color: colors.orange3, paddingHorizontal: 10, flex: 1, textAlign: 'center' }}>E{'\n'}0</Text>
                      <Text style={{ fontFamily: 'RubikMedium', color: colors.orange, paddingHorizontal: 10, flex: 1, textAlign: 'center' }}>P{'\n'}0</Text>

                    </View>
                  </TouchableOpacity>
                  <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <View style={{ height: 'auto', width: 1, backgroundColor: colors.gray, flex: 1, marginTop: 10 }} />
                    <View style={{}}>
                      <Text style={{ borderRadius: 5, borderColor: colors.gray, borderWidth: 1, fontSize: 18, paddingHorizontal: 10, color: colors.white, fontFamily: "RubikBold" }}>11 VS 11</Text>
                    </View>
                    <View style={{ height: 'auto', width: 1, backgroundColor: colors.gray, flex: 1, marginBottom: 10 }} />
                  </View>
                  <View style={{ flex: 1, marginTop: 20 }}>
                    <View style={{ width: 50, height: 50, alignSelf: 'center' }}>
                      <View style={{ alignSelf: 'center', backgroundColor: colors.gray2, width: 50, height: 50, borderRadius: 25, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontSize: 25, fontFamily: 'RubikBold', color: colors.white }}>?</Text>
                      </View>
                    </View>
                    <Text style={{ fontFamily: 'RubikBold', fontSize: 15, color: colors.white, textAlign: 'center', marginVertical: 3 }}>Buscando...</Text>

                  </View>
                </View>

              </TouchableOpacity>

            </View>

            :
            <View style={styles.container}>

              <Text style={styles.title}>SPORT PLAY {index}</Text>
            </View>
        }

      </ScrollView>
    </View>
  )
}