import React from "react";

import { View,Text } from "react-native";
import {AntDesign} from '@expo/vector-icons';
import styles from './IconButton.style'
function IconButton({iconName,iconColor,iconText,onPress}){
    return(
        <View style={styles.container}>
            <AntDesign name={iconName} size={24} color={iconColor} onPress={onPress}/>
            <Text style={styles.text}>{iconText}</Text>
        </View>
    )
}

export default IconButton;