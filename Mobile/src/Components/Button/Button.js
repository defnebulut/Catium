 import React from "react";
import { TouchableOpacity,Text, ActivityIndicator } from "react-native";
import styles from './Button.style'
function Button({text,onPress,theme='primary',loading}){
    return(
        <TouchableOpacity style= {styles[theme].container} onPress={onPress} >
          {loading ?
          <ActivityIndicator size="small"/>
            :
          <Text style= {styles[theme].title}>{text}</Text>
          }
        </TouchableOpacity>
    )
}
export default Button;