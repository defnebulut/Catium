import React, { useState,useContext } from 'react';
import { View, TouchableOpacity, Text, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from './SettinsModal.style'
import { AuthContext } from '../../context/AuthContext';
function SettingsModal({ navigation }) {

  const [modalVisible, setModalVisible] = useState(false);
  const {logout} =useContext(AuthContext)
  const handleSettingsPress = () => {
    setModalVisible(true);
  };

  const handleModalClose = () => {
    setModalVisible(false);
  };

  function handlePress() {
    handleModalClose();
    navigation.navigate('SettingsPage');
  }

  return (
    <View>
      <TouchableOpacity onPress={handleSettingsPress}>
        <Ionicons name="settings-outline" size={24} color="black" />
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={handleModalClose}
      >
        <View style={styles.modalContainer}>
          <View style={styles.container}>
            <TouchableOpacity
              onPress={handleModalClose}
              style={styles.closeIcon}
            >
              <Ionicons name="close" size={20} color="black" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.textButton} onPress={handlePress}>
              <Text style={styles.text}>Settings </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.textButton} onPress={()=>{logout()}}>
              <Text style={styles.text}>Log Out</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

export default SettingsModal;
  