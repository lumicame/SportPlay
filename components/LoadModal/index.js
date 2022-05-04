import { Modal, ActivityIndicator, View } from 'react-native'
import colors from '../../assets/colors.json'
import styles from './styles'
import React from 'react'

/**
 * Functional component that displays a modal with a loading circle.
 * @param {Object} props.loading State of loading.
 * @returns Functional component LoadingModal
 */
export default function LoadingModal({ loading }) {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={loading}
    >
      <View style={styles.container}>
        <ActivityIndicator size="large" color={colors.greenBg} />
      </View>
    </Modal>
  )
}
