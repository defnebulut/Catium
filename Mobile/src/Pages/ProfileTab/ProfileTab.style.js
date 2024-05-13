import { StyleSheet,Dimensions } from "react-native";

export default StyleSheet.create({
container:{
        flex:1,
        padding:10,
        backgroundColor:'white'
    },
    buttonContainer:{
        flexDirection:"row",justifyContent:'space-between',margin:10
    },
    ppBadgeContainer:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "space-between",
    },
    innerContainer:{
        alignItems:"flex-end",
        flexDirection:"row",
        justifyContent:"center"
    },
    pp:{
        borderRadius:50,
        width:100,
        height:100,
        marginLeft:Dimensions.get('screen').width*0.05 
    },
    badgeContainer:{
        alignItems:"center",
        marginRight:Dimensions.get('screen').width*0.05 
    },
    badge:{
        height:50,
        width:20,
       
        
    },
    nameContainer:{
        marginVertical:10,
        marginLeft:Dimensions.get('screen').width*0.09 ,
        flexDirection:"row"
    },
    name:{
        
        fontWeight:"bold",
        fontSize:15,
    },
    bioContainer:{
        margin:5,
        marginTop:20,
        borderWidth:1,
        padding:5,
        borderRadius:5,
      
    },
    bio:{
        textAlign:"center",
        
    }
})    