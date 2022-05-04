import { StyleSheet } from "react-native";
import colors from '../../assets/colors.json'

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.midBlack,
    minHeight: '100%',
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
})

export default styles
