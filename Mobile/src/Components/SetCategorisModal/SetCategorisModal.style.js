import { StyleSheet,Dimensions} from "react-native";

export default StyleSheet.create({
    container: {
      alignItems: 'center',
      justifyContent:"center",
     
      
    },
    iconContainer: {
      alignItems: 'center',
      borderWidth:1,
      borderColor:'#f72585',
      borderRadius:7,
      padding:7,
    },
    modalContainer: {
        flex:1,
        justifyContent: 'center',
        alignItems:"center",  
        backgroundColor: 'rgba(0, 0, 0, 0.5)',  
       
    },
    modalContent: {
      backgroundColor: '#fff',
      padding: 20,
      borderRadius:5,
      justifyContent:"center"
      
    },
    categoryContainer: {
      marginBottom: 20,
    },
    nameContainer:{
      borderWidth:1,
      padding:5,
      borderRadius:5,
      margin:3,
      backgroundColor:'lightgray'
    },
    categoryText: {
      fontWeight:'600',
      fontSize:15
      
    },
    
    closeIcon:{
      alignSelf:'flex-end' 
  },
  
  

  });
  
  