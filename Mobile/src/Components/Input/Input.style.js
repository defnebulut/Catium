import { StyleSheet } from "react-native";

const baseStyle= StyleSheet.create({
    container:{
        borderRadius:8,
        flexDirection: 'row',
        alignItems:"center"
       
    },
    input:{
        fontSize:17,
        fontWeight:'bold',
        
    }

})

export default StyleSheet.create({
    primary: StyleSheet.create({
        ...baseStyle,
        container:{
            ...baseStyle.container,
            padding:5,
            margin:10,
            backgroundColor:'lightgray',
            width:'60%'
        },
        input:{
            ...baseStyle.title,
            flex:1,
            padding: Platform.OS === 'android'? 4 : 8
        }
    }),
    secondary: StyleSheet.create({
        ...baseStyle,
        container:{
            ...baseStyle.container,
            padding:5,
            margin:10,
            backgroundColor:'lightgray'
            
        },
        input:{
            ...baseStyle.title,
            flex:1,
            padding: Platform.OS === 'android'? 4 : 8
        }
    }),
    
})
 
    
    
    
    
    
    
    
  









