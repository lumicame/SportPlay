import { StyleSheet, Dimensions } from "react-native";
import { shadowOffset } from "react-native/Libraries/Components/View/ReactNativeStyleAttributes";
import colors from '../../assets/colors.json'
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container:{
        height:500,
        paddingVertical:15,
        paddingHorizontal:5,
        borderRadius:25,
        marginVertical:10,
        shadowColor:"#75D",
        shadowRadius:5
    },
    text:{
        fontSize:20,
        fontFamily:'ComfortaaSemiBold',
        alignSelf:'center',
        
    },
    textTitleDate:{
        fontFamily:'RubikMedium',
        fontSize:20,
        color:colors.white,
        textAlign:'center',
        marginVertical:10
    }
})

export default styles
