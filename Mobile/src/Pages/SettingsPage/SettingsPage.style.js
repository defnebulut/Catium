import { StyleSheet,Dimensions } from "react-native";

export default StyleSheet.create({
container:{
        flex:1,
        padding:10,
        backgroundColor:'white'
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
    inputContainer:{
        flexDirection:"row",
        alignItems:"center"
    },
    securityContainer:{
        margin:10
    },
    titleText:{
        
        fontWeight:'700',
        fontSize:16
    },
    likedArticle:{
        flexDirection:"row",
        alignItems:"center"
    },
    likedText:{
        color:'#0077b6',
        fontWeight:'400',
        fontSize:14,
        marginTop:8
    },
    blockUserContainer:{
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
        borderWidth:1,
        borderRadius:7,
        padding:5,
        margin:5
    }
})    