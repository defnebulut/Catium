import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from './SetCategorisModal.style';
import Button from '../Button/Button';


const SetCategoriesModal = ({ onSelectCategory }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch('https://catium.azurewebsites.net/api/v1/Category');
      const data = await response.json();
      if (data.succeeded) {
        setCategories(data.data);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const toggleModal = () => {
    setModalVisible(!modalVisible);
    setSelectedCategoryId(null);
  };

  const selectCategory = (categoryId) => {
    setSelectedCategoryId(categoryId);
    setModalVisible(false);
    onSelectCategory(categoryId);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleModal} style={styles.iconContainer}>
        <Text style={{ color: '#f72585', fontSize: 17, fontWeight: 'bold', }}>Choose Category</Text>
      </TouchableOpacity>

      <Modal visible={modalVisible} animationType="slide" onRequestClose={toggleModal} transparent={true}>
        <TouchableOpacity style={styles.modalContainer} activeOpacity={1} onPressOut={toggleModal}>
          <View style={styles.modalContent}>
            <View style={styles.categoryContainer}>
              <TouchableOpacity onPress={toggleModal} style={styles.closeIcon}>
                <Ionicons name="close" size={26} color="black" />
              </TouchableOpacity>

              {categories.map((category) => (
                <TouchableOpacity
                  key={category.id}
                  onPress={() => selectCategory(category.id)}
                  style={styles.nameContainer}
                >
                  <Text style={styles.categoryText}>{category.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

export default SetCategoriesModal;
