import { StyleSheet, Dimensions } from "react-native";
import colors from '../../../../assets/colors.json'
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    height: '100%',
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  title: {
    color: colors.greenBg,
    fontSize: 30,
    fontFamily: 'ComfortaaMedium',
    textAlign: 'center',
    letterSpacing: 4,
    marginBottom: 45,
    width: '70%'
  },
  logoContainer: {
    width: '100%',
    height: 63,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 50,
  },
  logo: {
    width: 138,
    resizeMode: 'contain'
  },
  imageContainer: {
    width: windowWidth < windowHeight ? '80%' : windowHeight - 40,
    height: windowWidth > windowHeight ? windowHeight - 40 : '40%',
    borderRadius: 30,
    padding: 30,
    backgroundColor: colors.greenBg2,
  },
  buttonContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: colors.greenBg2,
    alignItems: 'center',
    justifyContent: 'center'
  },
  startText: {
    fontSize: 25,
    fontFamily: 'ComfortaaBold'
  },
  startTextLight: {
    color: colors.white
  },
  startTextDark: {
    color: colors.white
  },
  button: {
    backgroundColor: colors.orange,
    padding: 18,
    width: 220,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    marginTop: 60,
    marginBottom: 20
  },
  buttonText: {
    fontSize: 15,
    fontFamily: 'ComfortaaSemiBold',
    color: colors.white
  }
})

export default styles
