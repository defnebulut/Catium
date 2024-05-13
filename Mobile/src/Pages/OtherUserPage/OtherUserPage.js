import React, { useState, useEffect } from "react";
import { View, Image, Text, ActivityIndicator, TouchableOpacity, Modal,Alert} from "react-native";
import styles from './OtherUserPage.style'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Button from "../../Components/Button";
import getOtherUserData from "../../hooks/getOtherUserData";
import axios from "axios";
import MaterialTabOther from "../../Navigation/MaterialTabOther";
import AsyncStorage from "@react-native-async-storage/async-storage";

function OtherUserPage({ route }) {
  const { id } = route.params;
  const { otherUserData, loading } = getOtherUserData(id);
  const [isFollowing, setIsFollowing] = useState(false); 
  const [buttonLoading, setButtonLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedReportReason, setselectedReportReason] = useState('');

  useEffect(() => {
    if (otherUserData) {
      checkFollowingStatus();
    }
  }, [otherUserData]);

  const checkFollowingStatus = async () => {
    try {
      setButtonLoading(true);
      const userInfo = await AsyncStorage.getItem("userInfo");
      const parsedUserInfo = JSON.parse(userInfo);

      const response = await axios.get(`https://catium.azurewebsites.net/api/v1/Follow?followsId=${parsedUserInfo.data.id}&followedId=${otherUserData.userId}`);

      {response.data ? setIsFollowing(true) : setIsFollowing(false)}
    } catch (error) {
      setIsFollowing(false);
    } finally {
      setButtonLoading(false);
    }
  };

  const handleFollow = async () => {
    try {
      setButtonLoading(true);
      const userInfo = await AsyncStorage.getItem("userInfo");
      const parsedUserInfo = JSON.parse(userInfo);
      const userToken = await AsyncStorage.getItem('userToken');
      const response = await axios.post('https://catium.azurewebsites.net/api/v1/Follow', {
        userFollowsId: parsedUserInfo.data.id,
        userFollowedId: otherUserData.userId
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
    } finally {
      setButtonLoading(false);
    }
  };

  const handleUnfollow = async () => {
    try {
      setButtonLoading(true);
      const userInfo = await AsyncStorage.getItem("userInfo");
      const parsedUserInfo = JSON.parse(userInfo);
      const userToken = await AsyncStorage.getItem('userToken');
      const response = await axios.delete(`https://catium.azurewebsites.net/api/v1/Follow?followsId=${parsedUserInfo.data.id}&followedId=${otherUserData.userId}`,
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
    } finally {
      setButtonLoading(false);
    }
  };

  const handleOpenModal = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  
  const handleSubmitReport = async () => {
    try {
      
      const userToken = await AsyncStorage.getItem('userToken');
      const response = await axios.post(`https://catium.azurewebsites.net/api/v1/Report`, {
        report_Type: 1,
        reportedIntId: 0,
        reportedStringId: otherUserData.id,
        report_Reason: selectedReportReason
      }, {
        headers: {
          Origin: 'https://catium.azurewebsites.net',
          Authorization: `Bearer ${userToken}`,
        },
      });
      const data = response.data;

      if (data.succeeded) {
        setModalVisible(false)
        Alert.alert('Report submitted successfully.');
      } else {
        console.log("Report gönderme hatası:", data.message);
      }
    } catch (error) {
      console.log("Bir hata oluştu:", error);
    } 
  };

  if (loading) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      
      <View style={styles.ppBadgeContainer}>
        
        <View style={styles.innerContainer}>
          {otherUserData.pp ?
            <Image source={{ uri: otherUserData.pp }}
              style={styles.pp} /> :
            <Image source={require('../../../assets/userIcon.png')}
              style={styles.pp} />
          }
        </View>
        <View style={styles.badgeContainer}>
          <TouchableOpacity onPress={handleOpenModal}>
            <MaterialCommunityIcons name="dots-horizontal" size={30} color="black" />
          </TouchableOpacity>
       
          <Text style={{fontSize:15,fontWeight:'700',marginVertical:10}}>{otherUserData.userName}</Text>

          {isFollowing ? ( 
          <Button text='Unfollow' theme="third" onPress={handleUnfollow} loading={buttonLoading}/>
        ) : (
          <Button text='Follow' theme="third" onPress={handleFollow} loading={buttonLoading}/>
        )}
        </View>
      </View>
      <View style={styles.nameContainer}>
        <Text style={styles.name}>{otherUserData.firstName}  {otherUserData.lastName}</Text>
        
      </View>
      <View style={styles.bioContainer}>
        <Text style={styles.bio}>{otherUserData.bio ? otherUserData.bio : 'there is no bio'}</Text>
      </View>
      <MaterialTabOther id={otherUserData.userId} />

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={handleCloseModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={{fontSize:17,fontWeight:'600', padding:10}}>Report</Text>
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
            <TouchableOpacity style={styles.reportSubmitButton} onPress={handleSubmitReport}>
              <Text style={styles.reportSubmitButtonText}>Submit</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.reportCloseButton} onPress={handleCloseModal}>
              <Text style={styles.reportCloseButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

export default OtherUserPage;
