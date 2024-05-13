import React, { useState } from "react";
import { View, Image, StyleSheet, ActivityIndicator } from 'react-native';
import Input from "../Input/Input";
import Button from "../Button/Button";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import getUserData from "../../hooks/getUserData";

function SendComment({ articleId }) {
  const [comment, setComment] = useState('');
  const [id, setId] = useState('');
  const { userData, loading } = getUserData();
  const [buttonLoading, setButtonLoading] = useState(false);

  const postComment = async () => {
    if (buttonLoading) {
      // Prevent multiple submissions while the comment is being sent
      return;
    }

    setButtonLoading(true);
    const userInfo = await AsyncStorage.getItem("userInfo");
    const parsedUserInfo = JSON.parse(userInfo);
    setId(parsedUserInfo.data.id);
    const userToken = await AsyncStorage.getItem('userToken');
    try {
      const response = await axios.post(
        'https://catium.azurewebsites.net/api/v1/Comment',
        {
          userId: id,
          articleId: articleId,
          comment_Text: comment,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Origin: 'https://catium.azurewebsites.net',
            Authorization: `Bearer ${userToken}`,
          },
        }
      );

      console.log('Response:', response.data);
      setComment('');
    } catch (error) {
      console.log('Error:', error.response);
      console.error('Error sending comment:', error);
    } finally {
      setButtonLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.yourCommentContainer}>
      {userData.pp ?
        <Image source={{ uri: userData.pp }} style={styles.pp} /> :
        <Image source={require('../../../assets/userIcon.png')} style={styles.pp} />
      }
      <Input placeholder='Share your comment with us!' onType={setComment} value={comment} />
      <Button text='SHARE' theme='third' onPress={postComment} loading={buttonLoading} />
    </View>
  );
}

export default SendComment;

const styles = StyleSheet.create({
  yourCommentContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 5,
    borderWidth: 1,
    margin: 8,
    borderRadius: 7,
  },
  pp: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
});
