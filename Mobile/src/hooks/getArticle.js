import axios from "axios";
import React,{useEffect,useState} from "react";
import {useFocusEffect} from '@react-navigation/native'
function getArticle(id){
    const [articleData, setArticleData] = useState(null);
    const [loading, setLoading] = useState(true);

    useFocusEffect(
      React.useCallback(() => {
        fetchArticleData()      
        return () => {
          
        };
      }, [])
    );
    
      const fetchArticleData = async () => {
        try {
          const response = await axios.get(`https://catium.azurewebsites.net/api/v1/Article/${id}`);
          const article = response.data;
          setArticleData(article);
        } catch (error) {
          console.error('Veri çekme hatası:', error);
        } finally {
          setLoading(false);
        }
      };
      return {articleData,loading};
}

export default getArticle;