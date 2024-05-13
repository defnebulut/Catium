import { StyleSheet,Dimensions } from "react-native";

export default StyleSheet.create({
    container:{
        flex:1,
        padding:10,
        backgroundColor:'white',
    
    },
    ppBadgeContainer:{
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent:"space-between"
    },
   
    pp:{
      borderRadius:50,
      width:100,
      height:100,
      marginLeft:Dimensions.get('screen').width*0.05
    },
   
    nameContainer:{
      marginVertical:10,
      marginLeft:Dimensions.get('screen').width*0.09
  },
  name:{
      
      fontWeight:"bold",
      fontSize:15,
  },
    bioContainer:{
        margin:5,
        marginBottom:20
    },
    bio:{
        textAlign:"center",
        
    },
    modalContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
      },
      modalContent: {
        backgroundColor: "white",
        borderRadius: 10,
        padding: 20,
        alignItems: "center",
      },
      reportOption: {
        marginBottom: 10,
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: "lightgray",
        borderRadius: 5,
        width:250,
      },
      reportOptionText: {
        color: "black",
        fontSize: 16,
      },
      reportSubmitButton: {
        marginBottom: 10,
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: "#f72585",
        borderRadius: 5,
      },
      reportSubmitButtonText: {
        color: "white",
        fontSize: 16,
      },
      reportCloseButton: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: "white",
        borderWidth:1,
        borderColor :'#f72585',
        borderRadius: 5,
      },
      reportCloseButtonText: {
        color: "#f72585",
        fontSize: 16,
      },
        
})