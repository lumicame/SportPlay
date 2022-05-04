import { StyleSheet } from "react-native";
import colors from '../../assets/colors.json'

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  containerDark: {
    backgroundColor: colors.darkBg2,
  },
  containerLight: {
    backgroundColor: colors.white
  }
})

export default styles
