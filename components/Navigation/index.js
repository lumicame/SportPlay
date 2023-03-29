import React, { useContext, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, Dimensions, View, Text, Pressable,TouchableOpacity} from "react-native";
import Home from '../../screens/home';
import Team from '../../screens/team';
import Event from '../../screens/event';

import Notification from '../../screens/notification';
import Setting from '../../screens/setting';
import NavMenu from '../NavMenu'

import Icon from 'react-native-vector-icons/FontAwesome5';
import { LinearGradient } from 'expo-linear-gradient';
import colors from '../../assets/colors.json'


const Tab = createBottomTabNavigator()


const CustomButton = ({ children, onPress }) => (
    <Pressable onPress={onPress} style={{ top: -30, justifyContent: 'center', alignItems: 'center' }}>
        <View style={{ height: 60, width: 60 }}>
            {children}
        </View>
    </Pressable>
)

const Tabs = ({navigation}) => {
    const [navMenu, setNavMenu] = useState(false)
    return (
        <>
        <Tab.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: colors.darkBg,
                    elevation: 0
                },
                headerTitleStyle: {
                    color: "#fff",
                    fontFamily: 'RubikBold',
                    fontSize: 25,

                },
                tabBarShowLabel: false,
                tabBarStyle: {
                    height: 70,
                },
                headerLeft: () => (
                    <TouchableOpacity style={{ marginLeft:10 }} onPress={() => setNavMenu(true)}>
                        <Icon name='bars' size={25} color={"#ffffff70"} />
                    </TouchableOpacity>
                  ),

            }}>
            <Tab.Screen name="Principal" component={Home} options={{
                tabBarIcon: ({ focused }) =>
                (
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <Icon name='home' size={25} color={focused ? colors.greenBg : "#646371"} />
                        <Text style={{ fontFamily: 'RubikBold', alignSelf: 'center', textAlign: 'center', color: focused ? colors.greenBg : "#646371" }}>Principal</Text>
                    </View>
                ),
                
            }} />
            <Tab.Screen name="Mis Equipos" component={Team} options={{
                tabBarIcon: ({ focused }) =>
                (
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <Icon name='users' size={25} color={focused ? colors.greenBg : "#646371"} />
                        <Text style={{ fontFamily: 'RubikBold', alignSelf: 'center', textAlign: 'center', color: focused ? colors.greenBg : "#646371" }}>Equipo</Text>
                    </View>
                )
            }} />
            <Tab.Screen name="Crear Evento" component={Event} options={{
                tabBarIcon: ({ focused }) => (
                    <LinearGradient
                        colors={['#fbb70e', '#dd53db', '#3fa1e5']}
                        start={{ x: 0, y: 0.7 }}
                        end={{ x: 0.7, y: 0 }}
                        style={{ height: 60, width: 60, justifyContent: 'center', alignItems: 'center', borderRadius: 30 }}>
                        <Icon name='plus' size={25} color="#ffffff" />
                    </LinearGradient>
                ),
                tabBarButton: (props) => (
                    <CustomButton {...props} />
                )
            }} />
            <Tab.Screen name="Alertas" component={Notification} options={{
                tabBarIcon: ({ focused }) =>
                (
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <Icon name='bell' size={25} color={focused ? colors.greenBg : "#646371"} />
                        <Text style={{ fontFamily: 'RubikBold', alignSelf: 'center', textAlign: 'center', color: focused ? colors.greenBg : "#646371" }} >Alertas</Text>
                    </View>
                ),
                tabBarBadge: 3
            }} />
            <Tab.Screen name="Ajustes" component={Setting} options={{
                tabBarIcon: ({ focused }) =>
                (
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <Icon name='user-cog' size={25} color={focused ? colors.greenBg : "#646371"} />
                        <Text style={{ fontFamily: 'RubikBold', alignSelf: 'center', textAlign: 'center', color: focused ? colors.greenBg : "#646371" }}>Ajustes</Text>
                    </View>
                )
            }} />
        </Tab.Navigator>
        <NavMenu visible={navMenu} setVisible={setNavMenu} navigation={navigation} />

        </>
        
    );
}
const styles = StyleSheet.create({
    shadow: {
        shadowColor: '#7F5DF0',
        shadowOffset: {
            width: 0,
            height: 25
        },
        shadowRadius: 3.5,
        shadowOpacity: 0.25,
        elevation: 10
    },
    optionTab: {}
})
export default Tabs