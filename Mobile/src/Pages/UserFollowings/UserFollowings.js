import React, { useEffect, useState } from "react";
import { View,FlatList,ActivityIndicator,Text } from "react-native";
import UserCard from '../../Components/UserCard/UserCard'
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useFocusEffect} from '@react-navigation/native'
function UserFallowings({navigation}){
    const [userData,setUserData] = useState({})
    const [loading,setLoading] = useState(false)
    useFocusEffect(
      React.useCallback(() => {
        fetchData()      
        return () => {
          
        };
      }, [])
    );
    const fetchData = async () => {
        const userInfo = await AsyncStorage.getItem("userInfo");
            parsedUserInfo = JSON.parse(userInfo);
        try {
          setLoading(true)
          const response = await axios.get(`https://catium.azurewebsites.net/api/v1/FollowedList?id=${parsedUserInfo.data.id}`);
          const data = response.data;
          setUserData(data)
          console.log(data);

        } catch (error) {
          console.error(error);
        }finally{
            setLoading(false)
        }
      };
    const renderUsers = ({item}) => <UserCard item={item} navigation={navigation} />
    if (loading) {
        return (
          <View style={{flex:1,alignItems:"center",justifyContent:"center"}}>
            <ActivityIndicator size="large" />
          </View>
        );
    }
    if (userData === null || userData.length === 0) {
        return (
          <View style={{justifyContent:"center",flex:1,alignItems:"center", backgroundColor:'white'}}>
            <Text style={{fontSize:18,fontWeight:'500'}}>There is no article</Text>
          </View>
        );
      }
    return(
        <View style={{backgroundColor:'white'}}>
            
            <FlatList
            data={userData.data}
            renderItem={renderUsers}
            />
        </View>
    )
}

export default UserFallowings;