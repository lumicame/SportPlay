import { StyleSheet, Dimensions } from "react-native";
import colors from '../../../assets/colors.json'
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    minHeight: '100%',
    width: '100%',
    flexDirection: 'column'
  },
  imageContainer: {
    width: '100%',
    height: 63,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 50,
  },
  image: {
    width: 138,
    resizeMode: 'contain'
  },
  title: {
    color: colors.greenBg,
    fontSize: 30,
    fontFamily: 'ComfortaaMedium',
    textAlign: 'center',
    letterSpacing: 4,
    marginBottom: 45
  },
  textInputContainer: {
    width: '80%',
    alignItems: 'center',
    marginBottom: 13,
    borderBottomColor: colors.midBlack,
    borderBottomWidth: 1,
    borderRadius: 1,
    marginHorizontal: '10%'
  },
  pickerTitle: {
    fontFamily: 'ComfortaaMedium',
    fontSize: 15,
  },
  picker: {
    fontFamily: 'ComfortaaMedium',
    fontSize: 14,
    color: '#171717'
  },
  textInput: {
    width: '100%',
    fontFamily: 'ComfortaaMedium',
    fontSize: 15,
    paddingVertical: 12
  },
  buttonContainer: {
    width: '100%',
    marginTop: 43,
    marginBottom: 100,
    alignItems: 'center'
  },
  button: {
    backgroundColor: colors.orange,
    padding: 18,
    width: '80%',
    borderRadius: 30
  },
  buttonText: {
    fontFamily: 'ComfortaaSemiBold',
    color: colors.white,
    textAlign: 'center',
    fontSize: 15
  },
  footerTextContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 50
  },
  footerText1: {
    fontFamily: 'ComfortaaLight',
    color: colors.black,
    fontSize: 15,
    marginRight: 5
  },
  footerText2: {
    fontFamily: 'ComfortaaSemiBold',
    color: colors.black,
    fontSize: 15
  }
})

export default styles
