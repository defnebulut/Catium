import React from "react";
import { View, Image,Text,ActivityIndicator } from "react-native";
import styles from './ProfilePage.style'
import MaterialTabs from "../../Navigation/MaterialTabs";
import getUserData from "../../hooks/getUserData";

function ProfilePage(){
    
    const {userData,loading} = getUserData();
      

    if (loading) {
        return (
          <View style={{flex:1,alignItems:"center",justifyContent:"center"}}>
            <ActivityIndicator size="large" />
          </View>
        );
    }
    return(
        <View style={styles.container}>
            <View style={styles.ppBadgeContainer}>    
                
                {userData.pp ?
                  <Image source={{uri:userData.pp}}
                  style={styles.pp}/>:

                <Image source={require('../../../assets/userIcon.png')}
                style={styles.pp}/>
            } 
                
            </View>
                <View style={styles.nameContainer}>
                    <Text style={styles.name}>{userData.firstName}  {userData.lastName}</Text>
                </View>
                <View style={styles.bioContainer}>
                    <Text style={styles.bio}>{userData.bio ? userData.bio : 'there is no bio'}</Text>
                </View>
                <MaterialTabs />
        </View>
    )
}

export default ProfilePage;