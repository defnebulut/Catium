import React, { useState, useEffect } from "react";
import { View,Text,Image, TouchableOpacity,ActivityIndicator } from "react-native";
import styles from './Usercard.style'
import Button from "../Button";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

function UserCard({navigation,item}){
    const [isFollowing,setIsFollowing] =useState(false)
    const [loading,setLoading] = useState(false);
    const [buttonLoading,setButtonLoading] = useState(false)
    function handlePress(id){
        navigation.navigate('OtherUserPage',{id})
    }
    useEffect(() => {
        if(item){
            checkFollowingStatus();
        }
          
      }, [item]);
      let parsedUserInfo = ''
      const checkFollowingStatus = async () => {
        try {
            const userInfo = await AsyncStorage.getItem("userInfo");
            parsedUserInfo = JSON.parse(userInfo);
        
          const response = await axios.get(`https://catium.azurewebsites.net/api/v1/Follow?followsId=${parsedUserInfo.data.id}&followedId=${item.userId}`);
    
          {response.data ? setIsFollowing(true):setIsFollowing(false)}
        } catch (error) {
            
          setIsFollowing(false)
        }
      };
      const handleFollow = async () => {
        try {
          setButtonLoading(true)
            const userInfo = await AsyncStorage.getItem("userInfo");
            const parsedUserInfo = JSON.parse(userInfo);
            const userToken = await AsyncStorage.getItem('userToken');
          const response = await axios.post('https://catium.azurewebsites.net/api/v1/Follow', {
            userFollowsId: parsedUserInfo.data.id,
            userFollowedId: item.userId
          },
          {
            headers: {
              'Content-Type': 'application/json',
              Origin: 'https://catium.azurewebsites.net',
              Authorization: `Bearer ${userToken}`,
            },
          });
    
          if (response.status === 200) {
            setIsFollowing(true);
          }
        } catch (error) {
          console.error('Takip işlemi sırasında bir hata oluştu:', error);
        }finally{
          setButtonLoading(false)
        }
      };
    
      const handleUnfollow = async () => {
        try {
          setButtonLoading(true)
            const userInfo = await AsyncStorage.getItem("userInfo");
            const parsedUserInfo = JSON.parse(userInfo);
            const userToken = await AsyncStorage.getItem('userToken');
          const response = await axios.delete(`https://catium.azurewebsites.net/api/v1/Follow?followsId=${parsedUserInfo.data.id}&followedId=${item.userId}`,
          {
            headers: {
              'Content-Type': 'application/json',
              Origin: 'https://catium.azurewebsites.net',
              Authorization: `Bearer ${userToken}`,
            },
          });
    
          if (response.status === 200) {
            setIsFollowing(false); 
          }
        } catch (error) {
          console.error('Takipten çıkma işlemi sırasında bir hata oluştu:', error);
        }finally{
          setButtonLoading(false)
        }
      };
      if (loading) {
        return (
          <View style={{flex:1,alignItems:"center",justifyContent:"center"}}>
            <ActivityIndicator size="large" />
          </View>
        );
    }
    return(
        <TouchableOpacity style={styles.container} onPress={()=>handlePress(item.userId)}>
            {item.pp?
            <Image source={{uri:item.pp}}
            style={styles.pp}/>
            :
            <Image source={require('../../../assets/userIcon.png')}
            style={styles.pp}/>
        }
            <Text style={styles.name}>{item.firstName} {item.lastName}</Text>
            {isFollowing ? 
            <Button text='Unfollow' theme='secondary'  onPress={handleUnfollow} loading={buttonLoading}/>
            :
            <Button text='Follow' theme='third'  onPress={handleFollow} loading={buttonLoading}/>
            }
            
        </TouchableOpacity>
    )
}

export default UserCard;