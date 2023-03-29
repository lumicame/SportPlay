import { StyleSheet, Dimensions } from "react-native";
import colors from '../../../assets/colors.json'
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.darkBg,
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
    color: colors.white,
    fontSize: 30,
    fontFamily: 'ComfortaaBold',
    textAlign: 'center',
    marginTop: 30
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
    backgroundColor:"#252837",
    padding:30,
    height:70,
    marginVertical:10,
    marginHorizontal:20,
    borderRadius: 20,
    fontFamily: 'ComfortaaMedium',
    fontSize: 15,
    color:"#FFFFFF",
    paddingVertical: 12,
    elevation:4,
    shadowOpacity:1
  },
  textDate: {
    justifyContent:'center',
    backgroundColor:"#252837",
    padding:30,
    height:70,
    marginVertical:10,
    marginHorizontal:20,
    borderRadius: 20,
    paddingVertical: 12,
    elevation:4,
    shadowOpacity:1
  },
  buttonContainer: {
    marginTop: 43,
    marginBottom: 100,
    alignItems: 'center'
  },
  button: {
    padding: 18,
    borderRadius: 30,
    marginHorizontal:70
  },
  buttonText: {
    fontFamily: 'ComfortaaBold',
    color: colors.white,
    textAlign: 'center',
    fontSize: 15,
  },
  footerTextContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 50
  },
  footerText1: {
    fontFamily: 'ComfortaaLight',
    color: colors.white,
    fontSize: 15,
    marginRight: 5
  },
  footerText2: {
    fontFamily: 'ComfortaaSemiBold',
    color:colors.yelow,
    fontSize: 15
  }
})

export default styles
