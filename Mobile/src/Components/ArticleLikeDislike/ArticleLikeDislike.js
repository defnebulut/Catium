import React, { useState, useEffect } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import IconButton from "../IconButton/IconButton";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useFocusEffect} from '@react-navigation/native'
function ArticleLikeDislike({ articleId }) {
  const [like, setLike] = useState(false);
  const [dislike, setDislike] = useState(false);
  const [save, setSave] = useState(false);
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState("");
  const [loading, setLoading] = useState(false);
  const [responseLikeId, setResponseLikeId] =useState()
  const [responseDislikeId, setResponseDislikeId] =useState()
  const [responseSaveId, setResponseSaveId] =useState()

 
  useFocusEffect(
    React.useCallback(() => {
      getUserInfo();
      return () => {

      };
    }, [])
  );
  async function getUserInfo() {
    const userInfo = await AsyncStorage.getItem("userInfo");
    const parsedUserInfo = JSON.parse(userInfo);
    const userToken = await AsyncStorage.getItem("userToken");
    setToken(userToken);
    setUserId(parsedUserInfo.data.id);
    try {
      const responseLike = await axios.get(`
      https://catium.azurewebsites.net/api/v1/Like?articleId=${articleId}&userId=${parsedUserInfo.data.id}`)
      {responseLike? setLike(true): setLike(false)}
      setResponseLikeId(responseLike.data.data.id)
     
      
      
      console.log(responseSaveId)
    } catch (error) {
      console.log(responseSaveId)
      console.log(error.response)
    }
    try {
       
      const responseDislike = await axios.get(`
      https://catium.azurewebsites.net/api/v1/Dislike?articleId=${articleId}&userId=${parsedUserInfo.data.id}`)
      {responseDislike? setDislike(true): setDislike(false)}
      setResponseDislikeId(responseDislike.data.data.id)
    } catch (error) {
      console.log(error)
    }
  
    try {
      const responseSave = await axios.get(`
      https://catium.azurewebsites.net/api/v1/Save?articleId=${articleId}&userId=${parsedUserInfo.data.id}`)
      {responseSave? setSave(true): setSave(false)}
      setResponseSaveId(responseSave.data.data.id)

    } catch (error) {
      console.log(error)
    }
  }

  async function handleAction(endpoint, method) {
    setLoading(true);

    try {
      const response = await axios({
        method: method,
        url: `https://catium.azurewebsites.net/api/v1/${endpoint}`,
        data: {
          userID: userId,
          articleId: articleId,
        },
        headers: {
          "Content-Type": "application/json",
          Origin: "https://catium.azurewebsites.net",
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Response:", response.data);

      if (endpoint === "Like") {
        setLike(true);
      } else if (endpoint === "Dislike") {
        setDislike(true);
      } else if (endpoint === "Save") {
        setSave(true);
      }
    } catch (error) {
      console.log("Error:", error.response);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(endpoint,id) {
    setLoading(true);

    try {
      const response = await axios({
        method: "DELETE",
        url: `https://catium.azurewebsites.net/api/v1/${endpoint}/${id}`,
        headers: {
          "Content-Type": "application/json",
          Origin: "https://catium.azurewebsites.net",
          Authorization: `Bearer ${token}`,
        },
        data: {
          userID: userId,
          articleId: articleId,
        },
      });

      console.log("Response:", response.data);

      if (endpoint === "Like") {
        setLike(false);
      } else if (endpoint === "Dislike") {
        setDislike(false);
      } else if (endpoint === "Save") {
        setSave(false);
      }
    } catch (error) {
      console.log("Error:", error.response);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={{ flexDirection: "row" }}>
      {like ? (
        <IconButton iconName="like1" iconColor="red" iconText="Remove" onPress={() => handleDelete('Like',responseLikeId)} />
      ) : (
        <IconButton
          iconName="like1"
          iconColor="black"
          iconText="Like"
          onPress={() => handleAction("Like", "POST")}
        />
      )}
      {dislike ? (
        <IconButton iconName="dislike1" iconColor="red" iconText="Remove" onPress={() => handleDelete("Dislike",responseDislikeId)} />
      ) : (
        <IconButton
          iconName="dislike1"
          iconColor="black"
          iconText="Dislike"
          onPress={() => handleAction("Dislike", "POST")}
        />
      )}
      {save ? (
        <IconButton iconName="star" iconColor="red" iconText="Remove" onPress={() => handleDelete("Save",responseSaveId)} />
      ) : (
        <IconButton
          iconName="staro"
          iconColor="black"
          iconText="Save"
          onPress={() => handleAction("Save", "POST")}
        />
      )}
    </View>
  );
}

export default ArticleLikeDislike;
