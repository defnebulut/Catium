import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'white'
    },
    text:{
        fontSize:18,
        paddingLeft:10,
        paddingTop:10,
        fontWeight:'bold',
        marginRight:20
    },
    textOther:{
        fontSize:18,
        paddingLeft:10,
        fontWeight:'bold',
        marginRight:20,
        marginBottom:10,
    },
    coverPictureContainer:{
        flexDirection:'row',
        alignItems:'center',
        marginVertical:15,
        justifyContent:"space-between",
        paddingRight:25
    }, 
    iconContainer: {
        alignItems: 'center',
        padding:5,
        borderWidth:1,
        borderColor:'#f72585',
        borderRadius:7,
        
      },
})