import { StyleSheet } from "react-native";
import colors from '../../assets/colors.json'

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  placeholder: {
    fontFamily: 'RubikMedium',
    fontSize: 17,
    width: '100%'
  },
  placeholderDark: {
    color: "#ffffff70"
  },
  placeholderLight: {
    color: "#ffffff"
  },
  dropDownIcon: {
    paddingRight: 100,
    right: 20
  },
  modalContainer: {
    height: '100%',
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  touchableClose: {
    backgroundColor: colors.midBlack,
    height: '100%',
    width: '100%',
    zIndex: 1,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center'
  },
  scrollViewContainer: {
    zIndex: 2,
    width: '80%',
    maxHeight: '90%',
    borderRadius: 30,
    backgroundColor: colors.white,
    padding: 10,
  },
  scrollContainer: {
    width: '100%',
    flexDirection: 'column',
  },
  scrollContainerLayout: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionContainer: {
    paddingVertical: 11
  },
  optionText: {
    fontFamily: 'RubikMedium',
    fontSize: 17,
  },
  noData: {
    display: 'flex',
    height: 120,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  noDataText:{
    fontFamily: 'ComfortaaSemiBold',
    fontSize: 18,
  }
})

export default styles
