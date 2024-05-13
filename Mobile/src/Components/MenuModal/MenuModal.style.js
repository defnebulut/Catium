import { StyleSheet,Dimensions} from "react-native";

export default StyleSheet.create({
    container: {
      alignItems: 'center',
    },
    iconContainer: {
      alignItems: 'center',
      marginTop: 10,
    },
    modalContainer: {
  
      justifyContent: 'center',
      marginTop:Dimensions.get('window').height*0.068,
      justifyContent: 'flex-start',
    },
    modalContent: {
      backgroundColor: '#fff',
      padding: 20,
      width: Dimensions.get('window').width * 0.5,
      height:Dimensions.get('window').height*0.87,
      borderTopRightRadius:10,
      borderBottomRightRadius:10,
      justifyContent:"space-between"
    },
    categoryContainer: {
      flex:1,
      alignItems: 'flex-start',
      marginBottom: 20,
      justifyContent:"space-between"
    },
    nameContainer:{

      borderWidth:1,
      padding:5,
      width:Dimensions.get("window").width*0.30,
      borderRadius:5,
      flexDirection:"row",
      alignItems:"center",
      justifyContent:"space-between",
      marginTop:5
    },
    categoryText: {
      fontWeight:'500',
      fontSize:15
      
    },
    subCategoryContainer: {
      marginTop: 10,
    },
    subCategoryText:{
        fontWeight:'400',
        marginBottom:5,
        fontSize:15,
        marginLeft:10
    }, 
    closeIcon:{
      alignSelf:'flex-end' 
  },
  savedArticleButton:{
    borderWidth:1,
    padding:5,
    width:Dimensions.get("window").width*0.40,
    borderRadius:5,
    marginBottom:25,
    },
  savedArticleText:{
    fontWeight:'600',
    fontSize:15,
    textAlign:"center",
    padding:3
  },
 
  });
  
  