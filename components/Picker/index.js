import { Modal, Text, View, TouchableOpacity, ScrollView } from 'react-native'
import colors from '../../assets/colors.json'
import styles from './styles'
import React, { useState, useContext } from 'react'
import { ThemeContext } from '../../contexts/ThemeManager'
import Icon from 'react-native-vector-icons/FontAwesome5';


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
export default function Picker({ onChangeValue, values, style, placeholder }) {
  const [visible, setVisible] = useState(false)
  const [selected, setSelected] = useState(null)
  const [selectedIcon, setSelectedIcon] = useState(null)
  const [selectedColor, setSelectedColor] = useState(null)
  const { theme } = useContext(ThemeContext)
  
  const selectOption = (v) => {
    if (onChangeValue) onChangeValue(v.value)
    setSelected(v.label)
    if(v.icon){
      setSelectedColor(v.color)
      setSelectedIcon(v.icon)
    }else{
      setSelectedColor(null)
      setSelectedIcon(null)
    }
    setVisible(false)
  }
  
  return (
    <TouchableOpacity onPress={() => setVisible(true)} style={[style]}>
      <View style={[styles.container,{flexDirection:'row',paddingTop:2}]}>
        {selectedIcon?
        <>
        <View style={{backgroundColor:selectedColor,borderRadius:20,width:25,height:25,marginRight:3,justifyContent:'center'}}>
        <Icon name={selectedIcon} size={10} color="#fff" style={{alignSelf:'center'}}/>

                    </View>
        <Text style={[styles.placeholder, {width:'90%'},styles[`placeholder${theme}`]]}>{selected ? selected : placeholder}</Text>
        <Icon color={theme === 'Light' ? colors.black : colors.white} style={styles.dropDownIcon} name="caret-down" size={15}/>
        </>
        :
        <>
        <Text style={[styles.placeholder, styles[`placeholder${theme}`]]}>{selected ? selected : placeholder}</Text>
        <Icon color={theme === 'Light' ? colors.black : colors.white} style={styles.dropDownIcon} name="caret-down" size={15}/>
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
                  {v.icon?
                  <View style={[styles.optionContainer,{flexDirection:'row'}]}>
                    <View style={{backgroundColor:v.color,borderRadius:20,width:35,height:35,marginRight:3,justifyContent:'center'}}>
                      <Icon name={v.icon} size={15} color="#fff" style={{alignSelf:'center'}}/>

                    </View>
                  <Text style={[styles.optionText,{alignSelf:'center',marginLeft:5,width:'80%'}]}>{v.label}</Text>
                  </View>:
                <View style={styles.optionContainer}>
                <Text style={styles.optionText}>{v.label}</Text>
              </View>
                  }
                  
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
