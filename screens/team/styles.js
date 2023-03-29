import { StyleSheet, Dimensions } from "react-native";
import { shadowOffset } from "react-native/Libraries/Components/View/ReactNativeStyleAttributes";
import colors from '../../assets/colors.json'
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  modal: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    height: '100%',
    padding: 8
  },
  overlay: {
    backgroundColor: "#ffffff20",
    minHeight: windowHeight,
    width: windowWidth,
    zIndex: 1,
    position: "absolute"
  },
  titleContainer: {
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    height: 70,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.greenBg,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 30,
  }, 
  title: {
    fontSize: 18,
    fontFamily: 'RubikMedium',
    color: colors.white
  },
  form: {
    minHeight:200,
    padding: 10
  },
  bottonMenu: {
    position: 'absolute',
    bottom: 0,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: 55,
    width: '100%',
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25
  },
  bottomMenuLight: {
    backgroundColor: colors.darkBg,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: -1,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 20,
  },
  bottomMenuDark: {
    backgroundColor: colors.darkBg2
  },
  bottonMenuOption: {
    marginRight: 40
  },
  bottonMenuCancelText: {
    fontFamily: 'ComfortaaSemiBold',
    fontSize: 13,
    color: colors.gray
  },
  bottonMenuOkText: {
    fontFamily: 'ComfortaaSemiBold',
    fontSize: 13,
    color: colors.orange
  },
    container:{
        paddingVertical:15,
        paddingHorizontal:5,
        backgroundColor:'#212330',
        borderRadius:25,
        marginTop:10,
        marginBottom:20,
    },
    text:{
        fontSize:20,
        fontFamily:'ComfortaaSemiBold',
        alignSelf:'center',
        color:colors.white
    },
    labelInput:{
        fontSize:15,
        fontFamily:'RubikMedium',
        color:"#ffffff70",
        marginLeft:20
    },
    textInput: {
        backgroundColor:"#252837",
        padding:30,
        height:70,
        marginVertical:10,
        marginHorizontal:20,
        borderRadius: 20,
        fontFamily: 'RubikMedium',
        fontSize: 18,
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
      button: {
        padding: 18,
        borderRadius: 30,
        marginHorizontal:100
      },
      buttonText: {
        fontFamily: 'ComfortaaBold',
        color: colors.white,
        textAlign: 'center',
        fontSize: 15,
      },
      
})

export default styles
