import React, { useState, useEffect } from "react";
import { View, Image, Text, StyleSheet, FlatList, TouchableOpacity, Modal, ActivityIndicator, Alert } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from '@react-navigation/native';
import getOtherUserData from "../../hooks/getOtherUserData";

function AllComments({ articleId }) {
  const [commentData, setCommentData] = useState([]);
 
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCommentId, setSelectedCommentId] = useState(null);
  const [reportVisible, setReportVisible] = useState(false);
  const [selectedReportReason, setselectedReportReason] = useState("");
 
  useFocusEffect(
    React.useCallback(() => {
      fetchCommentData();
      
      return () => {

      };
    }, [])
  );


  const fetchCommentData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`https://catium.azurewebsites.net/api/v1/Comment?id=${articleId}`);
      const data = response.data;

      if (data.succeeded) {
        const comments = data.data;
        const commentPromises = comments.map(async (comment) => {
          const userData = await fetchUserData(comment.userID);
          return { ...comment, userData };
        });
        const commentDataWithUser = await Promise.all(commentPromises);
        setCommentData(commentDataWithUser);
      } else {
        console.log('Veri çekme hatası:', data.message);
      }
    } catch (error) {
      console.log('Bir hata oluştu:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserData = async (userId) => {
    try {
      const response = await axios.get(`https://catium.azurewebsites.net/api/v1/User/${userId}`);
      const data = response.data;

      if (data.succeeded) {
        return data.data;
      } else {
        console.log('Kullanıcı verisi çekme hatası:', data.message);
        return null;
      }
    } catch (error) {
      console.log('Bir hata oluştu:', error);
      return null;
    }
  };

  const handleDelete = async (commentId) => {
    try {
      setLoading(true)
      const userToken = await AsyncStorage.getItem('userToken');
      const response = await axios.delete(`https://catium.azurewebsites.net/api/v1/Comment/${commentId}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Origin: 'https://catium.azurewebsites.net',
            Authorization: `Bearer ${userToken}`,
          },
        });
      const data = response.data;

      if (data.succeeded) {

        setCommentData(commentData.filter((item) => item.commentId !== commentId));
        setModalVisible(false);
      } else {
        console.log("Yorum silme hatası:", data.message);
      }
    } catch (error) {
      console.log(commentId)
      console.log("Bir hata oluştu:", error);
    } finally {
      setLoading(false)
    }

  };

  const handleReport = async () => {
    try {
      setLoading(true)
      const userToken = await AsyncStorage.getItem('userToken');
      const response = await axios.post(`https://catium.azurewebsites.net/api/v1/Report`, {
        report_Type: 3,
        reportedIntId: selectedCommentId,
        reportedStringId: null,
        report_Reason: selectedReportReason
      }, {
        headers: {
          'Content-Type': 'application/json',
          Origin: 'https://catium.azurewebsites.net',
          Authorization: `Bearer ${userToken}`,
        },
      });
      const data = response.data;

      if (data.succeeded) {
        setReportVisible(false);
        setModalVisible(false)
        console.log(selectedCommentId)
        Alert.alert('Report submitted successfully.');
        console.log("Report submitted successfully.");
      } else {
        console.log("Report submission failed:", data.message);
      }
    } catch (error) {
      console.log("An error occurred:", error);
    } finally {
      setLoading(false)
    }
  };

  if (loading) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

 
  
 const commentCard = ({ item }) => {

  return (
    <View style={styles.otherCommentContainer}>
      <View style={styles.innerCommentContainer}>
      {item.userData.pp ?
          <Image source={{ uri: item.userData.pp }}
            style={styles.otherpp} /> :
          <Image source={require('../../../assets/userIcon.png')}
            style={styles.otherpp} />
        }
        
        <Text style={styles.comment}>{item.comment_Text}</Text>
      </View>
      <TouchableOpacity onPress={() => {
        setSelectedCommentId(item.id);
        setModalVisible(true);
      }}>
        <MaterialCommunityIcons name="dots-horizontal" size={30} color="black" />
      </TouchableOpacity>
    </View>
  )
};
  

  return (
    <View style={styles.allComments}>
      {loading ? (
        <Text>Loading...</Text>
      ) : commentData.length > 0 ? (
        <FlatList
          data={commentData}
          renderItem={commentCard}
        />
      ) : (
        <Text style={{ paddingLeft: 25, fontSize: 14, fontWeight: '800' }}>No comments</Text>
      )}

      <Modal visible={modalVisible} animationType="fade" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity style={styles.deleteButton} onPress={() => handleDelete(selectedCommentId)}>
              <Text style={styles.deleteButtonText}>Delete</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.reportButton} onPress={() => setReportVisible(true)}>
              <Text style={styles.reportButtonText}>Report</Text>
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
    </View>
  )
}

const styles = StyleSheet.create({
  otherCommentContainer: {
    flexDirection: "row",
    alignItems: "center",
    margin: 10,
    justifyContent: "space-between"
  },
  innerCommentContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  otherpp: {
    width: 40,
    height: 40,
    borderRadius: 20
  },
  comment: {
    marginLeft: 10,
    fontSize: 14,
    fontWeight: '600'
  },
  allComments: {
    padding: 10
  },
  modalContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  deleteButton: {
    marginBottom: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "red",
    borderRadius: 5,
  },
  deleteButtonText: {
    color: "white",
    fontSize: 16,
  },
  reportButton: {
    marginBottom: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "orange",
    borderRadius: 5,
  },
  reportButtonText: {
    color: "white",
    fontSize: 16,
  },
  closeButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "lightgray",
    borderRadius: 5,
  },
  closeButtonText: {
    color: "black",
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  reportOption: {
    marginBottom: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "lightgray",
    borderRadius: 5,
    width:250
  },
  reportOptionText: {
    color: "black",
    fontSize: 16,
  },
  reportSubmitButton: {
    marginBottom: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#f72585",
    borderRadius: 5,
  },
  reportSubmitButtonText: {
    color: "white",
    fontSize: 16,
  },
  reportCloseButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "white",
    borderWidth:1,
    borderColor :'#f72585',
    borderRadius: 5,
  },
  reportCloseButtonText: {
    color: "#f72585",
    fontSize: 16,
  },
});

export default AllComments;
