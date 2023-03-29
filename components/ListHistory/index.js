import {  View ,Modal,TouchableOpacity,Text,ScrollView} from 'react-native'
import colors from '../../assets/colors.json'
import styles from './styles'
import React, { useState, useContext, useEffect } from 'react'
import { ThemeContext } from '../../contexts/ThemeManager'
//import { getTeams } from '../../api/history'



/**
 * Functional component that displays a loading circle.
 * @param {Object} props Props of the functional component.
 * @param {Object} props.style Styles of loading container.
 * @returns Functional component LoadingModal
 */
export default function ListHistry() {
  const { theme } = useContext(ThemeContext)
  const [listPlayer, setListPlayer] = useState([])

  return (
    <View></View>
  )
}
