import { ActivityIndicator, View } from 'react-native'
import colors from '../../assets/colors.json'
import styles from './styles'
import React, { useContext } from 'react'
import { ThemeContext } from '../../contexts/ThemeManager'

/**
 * Functional component that displays a loading circle.
 * @param {Object} props Props of the functional component.
 * @param {Object} props.style Styles of loading container.
 * @returns Functional component LoadingModal
 */
export default function Loading({ style }) {
  const { theme } = useContext(ThemeContext)

  return (
    <View style={[styles.container, style, styles[`container${theme}`]]}>
      <ActivityIndicator size="large" color={colors.greenBg} />
    </View>
  )
}
