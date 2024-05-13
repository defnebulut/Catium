import { StyleSheet } from "react-native";

const baseStyle= StyleSheet.create({
    container:{
        
        alignItems:"center",
       
    },
    title:{
        fontSize:17,
        fontWeight:'bold',
        
    }

})

export default StyleSheet.create({
    primary: StyleSheet.create({
        ...baseStyle,
        container:{
            ...baseStyle.container,
            backgroundColor:'rgba(33, 2, 84, 0.831)',
            margin:30,
            borderRadius:25,
            padding:10,
        },
        title:{
            ...baseStyle.title,
            color: 'white'
        }
    }),
    secondary: StyleSheet.create({
        ...baseStyle,
        container:{
            ...baseStyle.container,
            borderWidth:1,
            borderColor:'#f72585',
            borderRadius:7,
            width:'35%',
            
            padding:7,
        },
        title:{
            ...baseStyle.title,
            color: '#f72585'
        }
    }),
    third: StyleSheet.create({
        ...baseStyle,
        container:{
            ...baseStyle.container,
            borderWidth:1,
            borderColor:'#f72585',
            borderRadius:7,
            padding:7,
            backgroundColor:'#f72585'
            
        },
        title:{
            ...baseStyle.title,
            color: 'white'
        }
    })
})
 
    
    
    
    
    
    
    
  