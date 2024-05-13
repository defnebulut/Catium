import React,{useState,useEffect} from "react";
import { BASE_URL } from "../config";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useFocusEffect} from '@react-navigation/native'
function useFetch(url){
    const [data, setData] = useState(null);
    const [loading, setLoading] =useState(true)
    useFocusEffect(
      React.useCallback(() => {
        fetchUserInfo()      
        return () => {
          
        };
      }, [])
    );
      
      const fetchUserInfo = async () => {
        try {
          const userInfo = await AsyncStorage.getItem("userInfo");
          const parsedUserInfo = JSON.parse(userInfo);
      
          setLoading(true);
          const response = await axios.get(
            `${BASE_URL}${url}${parsedUserInfo.data.id}`
          );
          const article = response.data.data;
          setData(article);
        } catch (error) {
          console.error("Veri çekme hatası:", error);
        } finally {
          setLoading(false);
        }
      };
      
      return {data,loading};
}

export default useFetch;