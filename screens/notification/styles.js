import { StyleSheet, Dimensions } from "react-native";
import { shadowOffset } from "react-native/Libraries/Components/View/ReactNativeStyleAttributes";
import colors from '../../assets/colors.json'
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container:{
        minHeight:500,
        paddingVertical:15,
        paddingHorizontal:5,
        backgroundColor:'#212330',
        backgroundColor:"#212330",
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
    card:{
        marginVertical:5,
        padding:10,
        backgroundColor:"#252837",
        borderRadius:25,
        marginHorizontal:10,
        flexDirection:'row'
    }
})

export default styles
