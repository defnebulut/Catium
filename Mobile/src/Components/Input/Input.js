import React from "react";
import { TextInput,View } from "react-native";
import styles from './Input.style'
import { Ionicons } from '@expo/vector-icons';

function Input({placeholder,value,onType,isSecure,iconName,onPressIcon,theme='primary'}){
    return(
        <View style= {styles[theme].container}>
            <TextInput 
            style={styles[theme].input}
            placeholder={placeholder} 
            onChangeText={onType} 
            value ={value}
            secureTextEntry = {isSecure}
            multiline
            />
            <Ionicons name={iconName} size={28} color='black' onPress={onPressIcon}/>
        </View>
    )
}
export default Input;