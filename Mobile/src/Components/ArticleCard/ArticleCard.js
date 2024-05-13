import React, { useState,useEffect } from "react";

import { View,Text,Image,ActivityIndicator} from "react-native";
import Button from "../Button";
import styles from './ArticleCard.style'
import getUserData from "../../hooks/getUserData";
import getArticle from "../../hooks/getArticle";

function ArticleCard({item, onSelect}){
    
    
   
    return(
        <View style={styles.container}>
                
                <View style={styles.titleContainer}>
                    <Text style={styles.contentTitle}>{item.title}</Text>
                </View>
                <View style={styles.articlePhotoContainer}>
                <Image source={{uri:item.coverPicture}}
                style={styles.articlePhoto}/>
                </View>
                <View style={styles.contentContainer}>
                    <Text style={styles.contentText}>{item.content}</Text>
                </View>
                <Button text='Read More' onPress={onSelect}  theme="secondary"/>
           
        </View>
    )
}

export default ArticleCard;