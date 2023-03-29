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
        backgroundColor:'#212330',
        backgroundColor:"#212330",
        borderRadius:25,
        marginVertical:10,
        elevation:3,
        shadowColor:"#75D",
        shadowRadius:5
    },
    textOptions:{
        fontFamily:'RubikMedium',
        marginLeft:15,
        fontSize:20,
        alignSelf:'center',
        color:colors.white
        
    },
    titleAvatar:{
        fontFamily:'RubikMedium',
        fontSize:25,
        marginTop:5,
        color:colors.white,
        textAlign:"center"
    },
    card:{
        height:200,
        backgroundColor:"#252837",
        marginHorizontal:30,
        marginVertical:20,
        borderRadius:25,
        padding:15
    }
})

export default styles