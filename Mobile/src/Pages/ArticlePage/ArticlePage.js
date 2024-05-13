import React, { useState, useEffect } from "react";
import { View, Text, Image, ScrollView, ActivityIndicator, TouchableOpacity, Modal,Alert } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import styles from './ArticlePage.style';
import axios from 'axios';
import SendComment from "../../Components/SendComment/SendComment";
import AllComments from "../../Components/AllComments/AllComments";
import ArticleLikeDislike from "../../Components/ArticleLikeDislike/ArticleLikeDislike";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from '@react-navigation/native';

function ArticlePage({ route, navigation }) {
  const { id } = route.params;
  const [articleData, setArticleData] = useState(null);
  const [otherUserData, setOtherUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [reportVisible, setReportVisible] = useState(false);
  const [selectedReportReason, setselectedReportReason] = useState("");

  useFocusEffect(
    React.useCallback(() => {
      fetchData();
      return () => {

      };
    }, [])
  );

  const fetchData = async () => {
    try {
      const response = await axios.get(`https://catium.azurewebsites.net/api/v1/Article/${id}`);
      const articleData = response.data.data;
      setArticleData(articleData);

      const otherUserDataResponse = await axios.get(`https://catium.azurewebsites.net/api/v1/User/${articleData.createdBy}`);
      const otherUserData = otherUserDataResponse.data.data;
      setOtherUserData(otherUserData);
    } catch (error) {
      console.log("Bir hata oluştu:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteArticle = async () => {
    try {
      setLoading(true)
      const userToken = await AsyncStorage.getItem('userToken');
      const response = await axios.delete(`https://catium.azurewebsites.net/api/v1/Article/${articleData.id}`, {
        headers: {
          Origin: 'https://catium.azurewebsites.net',
          Authorization: `Bearer ${userToken}`,
        },
      });
      const data = response.data;

      if (data.succeeded) {
        setModalVisible(false);
        navigation.goBack();
      } else {
        console.log("Article silme hatası:", data.message);
      }
    } catch (error) {
      console.log("Bir hata oluştu:", error);
    } finally {
      setLoading(false)
    }
  };

  const handleReport = async () => {
    try {
      setLoading(true);
      const userToken = await AsyncStorage.getItem('userToken');
      const response = await axios.post(`https://catium.azurewebsites.net/api/v1/Report`, {
        report_Type: 2,
        reportedIntId: id,
        reportedStringId: null,
        report_Reason: selectedReportReason
      }, {
        headers: {
          Origin: 'https://catium.azurewebsites.net',
          Authorization: `Bearer ${userToken}`,
        },
      });
      const data = response.data;

      if (data.succeeded) {
        setReportVisible(false);
        setModalVisible(false)
        Alert.alert('Report submitted successfully.');
      } else {
        console.log("Report gönderme hatası:", data.message);
      }
    } catch (error) {
      console.log("Bir hata oluştu:", error);
    } finally {
      setLoading(false);
    }
  };

  function handleUser(id) {
    navigation.navigate('OtherUserPage', { id });
  }

  if (loading) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear().toString().slice(-2);
    return `${day}-${month < 10 ? '0' + month : month}-${year}`;
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <Image source={{ uri: articleData.coverPicture }} style={styles.banner} />
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>{articleData.title}</Text>
        <TouchableOpacity onPress={() => setModalVisible(true)} >
          <MaterialCommunityIcons name="dots-horizontal" size={30} color="black" />
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={() => handleUser(articleData.createdBy)}>
        <Text style={styles.nameText}>{otherUserData?.firstName} {otherUserData?.lastName}, {formatDate(articleData.createdDate)}</Text>
      </TouchableOpacity>
      <Text style={styles.article}>{articleData.content}</Text>

      <ArticleLikeDislike articleId={articleData.id} />
      <SendComment articleId={articleData.id} />

      <View>
        <Text style={{ paddingLeft: 15, paddingTop: 10, fontSize: 15, fontWeight: "bold" }}>Comments</Text>
        <AllComments articleId={articleData.id} />
      </View>

      <Modal visible={modalVisible} animationType="fade" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity style={styles.deleteButton} onPress={handleDeleteArticle}>
              <Text style={styles.deleteButtonText}>Delete Article</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.reportButton} onPress={() => setReportVisible(true)}>
              <Text style={styles.reportButtonText}>Report Article</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal visible={reportVisible} animationType="fade" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
          <TouchableOpacity style={styles.reportOption} onPress={() => setselectedReportReason("Intimidating and harassing")}>
              <Text style={styles.reportOptionText}>Intimidating and harassing</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.reportOption} onPress={() => setselectedReportReason("Spam")}>
              <Text style={styles.reportOptionText}>Spam</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.reportOption} onPress={() => setselectedReportReason("Sensitive or offensive content")}>
              <Text style={styles.reportOptionText}>Sensitive or offensive content</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.reportOption} onPress={() => setselectedReportReason("Other")}>
              <Text style={styles.reportOptionText}>Other</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.reportSubmitButton} onPress={handleReport}>
              <Text style={styles.reportSubmitButtonText}>Submit</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.reportCloseButton} onPress={() => setReportVisible(false)}>
              <Text style={styles.reportCloseButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

    </ScrollView>
  )
}

export default ArticlePage;
