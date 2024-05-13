import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Modal, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from './MenuModal.style';


const MenuModal = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [categories, setCategories] = useState([]);
  const [loading,setLoading] = useState(false)
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true)
      const response = await fetch('https://catium.azurewebsites.net/api/v1/Category');
      const data = await response.json();
      if (data.succeeded) {
        setCategories(data.data);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    }finally{
      setLoading(false)
    }
  };

  const toggleModal = () => {
    setModalVisible(!modalVisible);
    setSelectedCategoryId(null);
  };

  const selectCategory = (categoryId, categoryName) => {
    setSelectedCategoryId(categoryId);
    setModalVisible(false);
    console.log(categoryId)
    navigation.navigate('CategoryPage', { categoryId, categoryName });
  };

  function handleSavedArticles(){
    navigation.navigate('SavedArticles')
    setModalVisible(false)
  }
  if (loading) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }    
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleModal} style={styles.iconContainer}>
        <Ionicons name="reorder-three-sharp" size={30} />
      </TouchableOpacity>


      <Modal visible={modalVisible} animationType="slide" onRequestClose={toggleModal} transparent={true}>
        <TouchableOpacity style={styles.modalContainer} activeOpacity={1} onPressOut={toggleModal}>
          <View style={styles.modalContent}>
            <View style={styles.categoryContainer}>
              <View>

              <TouchableOpacity onPress={toggleModal} style={styles.closeIcon}>
                <Ionicons name="close" size={26} color="black" />
              </TouchableOpacity>

              {categories.map((category) => (
                <TouchableOpacity
                key={category.id}
                onPress={() => selectCategory(category.id , category.name)}
                style={styles.nameContainer}
                >
                  <Text style={styles.categoryText}>{category.name}</Text>
                </TouchableOpacity>
              ))}
              </View>
              <View>

              <TouchableOpacity style={styles.savedArticleButton} onPress={()=>handleSavedArticles()}>
                <Text style={styles.savedArticleText}>SAVED ARTICLES</Text>
              </TouchableOpacity>
              </View>
            </View>
            
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

export default MenuModal;
