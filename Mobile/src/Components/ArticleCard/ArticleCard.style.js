import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container:{
        flex:1,
        padding:10,
        margin:10,
        borderWidth:1,
        borderRadius:5
    },
    userContainer:{
        flexDirection:"row",
        alignItems:"center"
    },
    pp:{
        width:80,
        height:80,
        borderRadius:40
    },userInfoContainer:{
        margin:10,
       
    },
    seperate:{
        marginBottom:10,
        marginTop:10,
        borderWidth:1,
        width:'100%'
    },
    titleContainer:{
        
        alignItems:"center"
    }, 
    articlePhotoContainer:{
        padding:5,
        alignItems:"center"
    },
    contentContainer:{
      marginBottom:15
    },
    contentTitle:{
        fontSize:20,
        fontWeight:"bold",
        marginBottom:10,
    },
    contentText:{
        fontSize:15,
        fontWeight:'500',
        overflow: 'hidden',
        lineHeight: 20, // İstenilen satır yüksekliği
        maxHeight: 3 * 20,
        
    },
    articlePhoto:{
        width:'80%',
        height:120,
        borderRadius:5
    },
    button:{
        borderRadius:10
    },
   
})  