import React,{useState,useEffect} from "react";
import { BASE_URL } from "../config";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {} from '@react-navigation/native'
function getSaveArticle(){
    const [data, setData] = useState([]);
    const [loading, setLoading] =useState(true)
    useFocusEffect(
      React.useCallback(() => {
        fetchSaveArticle()      
        return () => {
          
        };
      }, [])
    );
      const fetchSaveArticle = async () => {
        try {
          const userInfo = await AsyncStorage.getItem("userInfo");
          const parsedUserInfo = JSON.parse(userInfo);
      
          setLoading(true);
          const response = await axios.get(
            `https://catium.azurewebsites.net/api/v1/Save?id=${parsedUserInfo.data.id}`
          );
          const saveArticle = response.data;
          setData(saveArticle);
        } catch (error) {
          console.error("Veri çekme hatası:", error);
        } finally {
          setLoading(false);
        }
      };
      
      return {data,loading};
}

export default getSaveArticle;