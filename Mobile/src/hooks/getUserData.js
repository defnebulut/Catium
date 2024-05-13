import React,{useState,useEffect} from "react";
import { BASE_URL } from "../config";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useFocusEffect} from '@react-navigation/native'
function getUserData(){
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] =useState(true)
    useFocusEffect(
      React.useCallback(() => {
        fetchUserInfo()      
        return () => {
          
        };
      }, [])
    );;
      
      const fetchUserInfo = async () => {
        try {
          const userInfo = await AsyncStorage.getItem("userInfo");
          const parsedUserInfo = JSON.parse(userInfo);
      
          setLoading(true);
          const response = await axios.get(
            `https://catium.azurewebsites.net/api/v1/User/${parsedUserInfo.data.id}`
          );
          
          const user = response.data.data;
          setUserData(user);
        } catch (error) {
          console.error("Veri çekme hatası:", error);
        } finally {
          setLoading(false);
        }
      };
      
      return {userData,loading};
}
export default getUserData;