import { StyleSheet } from "react-native";

export default StyleSheet.create({
    modalContainer:{
        flex: 1,
        marginTop:55,
        width:175,
        alignSelf:'flex-end'
    },
    container:{
        backgroundColor: 'white',
        padding: 10,
        borderBottomLeftRadius:7
    },
    closeIcon:{
        alignSelf:'flex-start' 
    },
    textButton:{
        alignSelf:"flex-end",
        borderWidth:1,
        padding:5,
        borderRadius:5,
        margin:3,
        backgroundColor:'lightgray',
        width:80,
      },
      text: {
        fontWeight:'600',
        fontSize:15
        
      },
   
})