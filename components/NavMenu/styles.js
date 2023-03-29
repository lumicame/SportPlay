import { StyleSheet, Dimensions } from "react-native";
import colors from '../../assets/colors.json'
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  separator: {
    borderBottomWidth: 0.5,
    borderBottomColor: colors.black2,
    marginLeft: 15,
    width: 270
  },
  overlay: {
    backgroundColor: colors.midGreen,
    minHeight: windowHeight,
    width: windowWidth,
    zIndex: 1,
    position: "absolute"
  },
  menuContainer: {
    backgroundColor: colors.greenBg,
    height: windowHeight,
    width: 300,
    zIndex: 2,
  },
  imageContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    paddingLeft: 40,
    paddingTop: 35
  },
  image: {
    width: 106,
    resizeMode: 'contain',
    height: 50
  },
  userName: {
    fontFamily: 'ComfortaaBold',
    fontSize: 15,
    color: colors.white,
    marginTop: 15
  },
  dateText: {
    fontFamily: 'ComfortaaRegular',
    fontSize: 11,
    color: colors.white,
    marginBottom: 30
  },
  optionsContainer: {
    display: 'flex',
    flexDirection: 'column',
    paddingLeft: 40,
  },
  option: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 30
  },
  text: {
    fontFamily: 'ComfortaaBold',
    fontSize: 11,
    color: colors.white,
    marginLeft: 18
  },
  premiumContainer: {
    display: 'flex',
    flexDirection: 'column',
    paddingLeft: 40,
  }
})

export default styles
