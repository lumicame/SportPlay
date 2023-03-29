import {  View ,Modal,TouchableOpacity,Text,ScrollView} from 'react-native'
import colors from '../../assets/colors.json'
import styles from './styles'
import React, { useState, useContext, useEffect } from 'react'
import { ThemeContext } from '../../contexts/ThemeManager'
import { getTeams } from '../../api/team'



/**
 * Functional component that displays a loading circle.
 * @param {Object} props Props of the functional component.
 * @param {Object} props.style Styles of loading container.
 * @returns Functional component LoadingModal
 */
export default function ListPlayers({ showPLayers,setShowPlayers,selectedTeam,setSelectedTeam }) {
  const { theme } = useContext(ThemeContext)
  const [listPlayer, setListPlayer] = useState([])

  useEffect(async () => {
      const res = await getTeams()
    if (res.status) {
        const array = []
        res.data.forEach(element => {
            array.push({ label: `${element.name} (${element.category.slug})`, value: String(element.id), image: element.image, category: String(element.category.id) })
        });
        console.log("search")
        setListPlayer(array)
    }  
}, [selectedTeam])
  return (
    <Modal animationType="fade"
    transparent={true}
    visible={showPLayers}
    onRequestClose={() => {
        setShowPlayers(false)
    }}>
        <View style={styles.modal}>
                    <TouchableOpacity style={styles.overlay} onPress={() => {
                        setShowPlayers(false)
                    }} />
                    <View style={{
                        width: '100%',
                        borderRadius: 25,
                        zIndex: 2,
                        position: 'relative', backgroundColor: colors.darkBg
                    }}>
                        <View style={{}}>
                            <View style={styles.titleContainer}>
                                <Text style={styles.title}>{`${selectedTeam.name} (${selectedTeam.category.slug})`}</Text>
                            </View>
                            <ScrollView style={{ marginTop: 20, paddingHorizontal: 10 ,maxHeight:600}}>
                                <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap', alignItems: 'flex-start' }}>
                                   {listPlayer.map((v,i)=>
                                <View key={v.value} style={{...styles.hexagon}}>
                                <View style={styles.hexagonInner} />
                                <View style={styles.hexagonBefore} />
                                <View style={styles.hexagonAfter} />
                              </View>
                                
                                
                                
                                )} 
                                </View>
                                
                            </ScrollView>
                            <View style={{ height: 50 }} />
                        </View>
                        <View style={[styles.bottonMenu, styles[`bottomMenuLight`]]}>
                            <TouchableOpacity style={styles.bottonMenuOption} onPress={() => {
                                setShowPlayers(false)
                            }}>
                                <Text style={styles.bottonMenuCancelText}>CANCELAR</Text>
                            </TouchableOpacity>
                            
                        </View>
                    </View>
                </View>
    </Modal>
  )
}
