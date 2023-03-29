import { Modal, Image, View, TouchableOpacity, Text } from 'react-native'
import styles from './styles'
import React, { useContext } from 'react'
import { UserContext } from '../../contexts/UserManager'
import moment from 'moment'
import colors from '../../assets/colors.json'
import Icon from 'react-native-vector-icons/FontAwesome5';


const Separator = ({ style }) => {
  return (
    <View style={[style, styles.separator]} />
  )
}

/**
 * Functional component that displays a modal with the navigation menu.
 * @param {Object} props.visible State of loading.
 * @returns Functional component.
 */
export default function NavMenu({ visible, setVisible, navigation }) {
  const { user } = useContext(UserContext)

  const navigate = (screen) => {
    setVisible(false)
    navigation.navigate(screen)
  }

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={() => setVisible(false)}
    >
      <TouchableOpacity style={styles.overlay} onPress={() => setVisible(false)} />
      <View style={styles.menuContainer}>
        <View style={styles.imageContainer}>
          <Image
            source={require('../../assets/icon.png')}
            style={styles.image}
          />
          <Text style={styles.userName}>{user.name} hola</Text>
          <Text style={styles.dateText}>{moment().format('dddd[, ]d[ de ]MMMM[, ]YYYY')}</Text>
        </View>
        <Separator />
        <View style={styles.optionsContainer}>
          <TouchableOpacity onPress={() => navigate('Setting')} style={styles.option}>
          <Icon name='home' size={25} />
            <Text style={styles.text}>Ajustes</Text>
          </TouchableOpacity>
          
        </View>
      </View>
    </Modal>
  )
}
