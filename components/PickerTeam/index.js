import { Modal, Text, View, TouchableOpacity, ScrollView ,Image} from 'react-native'
import colors from '../../assets/colors.json'
import React, { useState, useContext } from 'react'
import styles from './style'

import { ThemeContext } from '../../contexts/ThemeManager'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { TEAM_IMAGE } from '../../config'



/**
 * Picker functional component
 * @param {Object} props Properties of the funcitonal component
 * @param {Function} props.onChangeValue Function that is excecuted when the user select an option
 * @param {Object[]} props.values Array of objects with the value of every option
 * @param {String} props.values.value Text to show in the option
 * @param {String} props.values.label Value of the option
 * @param {StyleSheet} props.style Styles of the picker
 * @param {String} props.placeholder Placeholder of the picker
 * @returns 
 */
export default function PickerTeam({ onChangeValue, values, style, placeholder }) {
  const [visible, setVisible] = useState(false)
  const [selected, setSelected] = useState({})
  const { theme } = useContext(ThemeContext)
  
  const selectOption = (v) => {
    if (onChangeValue) onChangeValue(v)
    setSelected(v)
    setVisible(false)
  }
  
  return (
    <TouchableOpacity onPress={() =>{console.log(placeholder)
     setVisible(true)}} style={[style]}>
      <View style={[styles.container,{flexDirection:'row',paddingTop:2}]}>
        {selected.label?
        <>
        <Image source={{uri:`${TEAM_IMAGE}${selected.image}`}} style={{marginRight:10,borderRadius:25,alignSelf:'center',width:50,height:50}}/>

        <Text style={[styles.placeholder, {width:'90%'},selected? {color:"#ffffff"}: {color:"#ffffff70"}]}>{selected ? selected.label : placeholder}</Text>
        <Icon color={theme === 'Light' ? colors.white : colors.white} style={styles.dropDownIcon} name="caret-down" size={15}/>
        </>
         :
         <>
        <Text style={[{alignSelf:'center'},styles.placeholder, selected.label? {color:"#ffffff"}: {color:"#ffffff70"}]}>{placeholder}</Text>
        <Icon color={theme === 'Light' ? colors.white : colors.white} style={styles.dropDownIcon} name="caret-down" size={15}/>
        </>
        
         }
        
        
        
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={() => setVisible(false)}
      >
        <View style={styles.modalContainer}>
          <TouchableOpacity style={styles.touchableClose} onPress={() => setVisible(false)} />
          <View style={styles.scrollViewContainer}>
            <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.scrollContainerLayout}>
              {values && values.length > 0 ? values.map((v, i) => (
                <TouchableOpacity key={i} onPress={() => selectOption(v)} >
                  <View style={[styles.optionContainer,{flexDirection:'row'}]}>
                      <Image source={{uri:`${TEAM_IMAGE}${v.image}`}} style={{marginRight:10,borderRadius:25,width:50,height:50,alignSelf:'center'}}/>
                  <Text style={[styles.optionText,{alignSelf:'center',marginLeft:5,width:'80%'}]}>{v.label}</Text>
                  </View>
                  
                </TouchableOpacity>
              )) :
                <View style={styles.noData}>
                  <Text style={styles.noDataText}>No data</Text>
                </View>
              }
            </ScrollView>
          </View>
        </View>
      </Modal>
    </TouchableOpacity >
  )
}
