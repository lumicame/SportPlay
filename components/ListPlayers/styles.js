import { StyleSheet, Dimensions } from "react-native";
import colors from '../../assets/colors.json'
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    hexagon: {
        width: "47%",
        height: 100,
        marginTop:50,
        marginBottom:100,
        marginHorizontal:3},
      hexagonInner: {
        width: "100%",
        height: 150,
        backgroundColor: "#fff",
        borderRadius:1
      },
      hexagonAfter: {
        position: "absolute",
        bottom: -75,
        left: 0,
        width: 0,
        height: 0,
        borderStyle: "solid",
        borderLeftWidth: 100,
        borderLeftColor: "transparent",
        borderRightWidth: 100,
        borderRightColor: "transparent",
        borderTopWidth: 25,
        borderTopColor: "red",
      },
      hexagonBefore: {
        position: "absolute",
        top: -50,
        left: 0,
        width: 0,
        height: 0,
        borderStyle: "solid",
        borderLeftWidth: 100,
        borderLeftColor: "transparent",
        borderRightWidth: 100,
        borderRightColor: "transparent",
        borderBottomWidth: 50,
        borderBottomColor: "red",
      },
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