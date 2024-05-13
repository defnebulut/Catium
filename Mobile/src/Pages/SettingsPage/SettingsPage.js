import React from "react";

import { View, Image,Text, TouchableOpacity, ScrollView,ActivityIndicator} from "react-native";
import Button from '../../Components/Button'
import styles from './SettingsPage.style'
import Input from "../../Components/Input"; 
import { EvilIcons } from '@expo/vector-icons';
import getUserData from "../../hooks/getUserData";
function SettingsPage({navigation}){
    const {userData,loading} = getUserData()
    function handlePress(){
        navigation.navigate('ProfileTab',{userData})
    }

    function handleLikedArticle(id){
        navigation.navigate('LikedArticlesPage',{id})
    }

    if (loading) {
        return (
          <View style={{flex:1,alignItems:"center",justifyContent:"center"}}>
            <ActivityIndicator size="large" />
          </View>
        );
    }
    return(
        <ScrollView style={styles.container}>
        <View style={styles.ppBadgeContainer}>
            
        {userData.pp ?
                  <Image source={{uri:userData.pp}}
                  style={styles.pp}/>:

                <Image source={require('../../../assets/userIcon.png')}
                style={styles.pp}/>
            } 
            
            <View style={styles.badgeContainer}>  
               
            </View>
        </View>
            <View style={styles.nameContainer}>
                <Text style={styles.name}>{userData.firstName} {userData.lastName}</Text>
            </View>
            <View style={styles.bioContainer}>
            <Text style={styles.bio}>{userData.bio ? userData.bio : 'there is no bio'}</Text>

            </View>
            <View>
                <Button text='Edit Profile' onPress={handlePress}/>
            </View>
            <View style={{borderWidth:1, width:'100%'}}></View>
            <View style={{margin:10}}>
                <Text style={styles.titleText}>Account Settings</Text>
                <View style={styles.inputContainer}>
                    <Input placeholder='johndoe@example.com' />
                    <Button text='Change' theme="secondary"/>
                </View>
                <View style={styles.inputContainer}>
                    <Input placeholder='***********' />
                    <Button text='Change' theme="secondary"/>
                </View>
            </View>
            <View style={{borderWidth:1, width:'100%',marginTop:10}}></View>
            <View style={styles.securityContainer}>
                <Text style={styles.titleText}>Liked Articles</Text>
                <TouchableOpacity style={styles.likedArticle} onPress={()=>handleLikedArticle(userData.userId)}>
                    <Text style={styles.likedText}>See Liked Articles</Text>
                    <EvilIcons name="external-link" size={24} color="black" />
                </TouchableOpacity>
            
            
            </View>
    </ScrollView>
    )
}

export default SettingsPage;