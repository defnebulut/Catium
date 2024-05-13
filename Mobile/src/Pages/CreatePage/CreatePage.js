import React, { useRef, useState, useEffect, useContext } from 'react';
import {
  Text,
  ScrollView,
  View,
  Image,
  Keyboard,
  ActivityIndicator,
} from 'react-native';

import Input from '../../Components/Input';
import Button from '../../Components/Button';
import SetCategorisModal from '../../Components/SetCategorisModal/SetCategorisModal';
import styles from './CreatePage.style';
import * as DocumentPicker from 'expo-document-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { BASE_URL } from '../../config';
const cloudName = 'de0cenbjv';
const apiKey = '142139164861266';
const uploadPreset = 'iobenfli';
const cloudinaryBaseUrl = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

function CreatePage({navigation}) {
  const [loading, setLoading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);


  const [title, setTitle] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [imageUrl, setImageUrl] = useState(null);
  const [content, setContent] = useState('');
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  const scrollViewRef = useRef(null);
  const handleFileUpload = async () => {
    try {
      const filePickResponse = await DocumentPicker.getDocumentAsync({
        type: '*/*',
      });

      if (filePickResponse.type === 'success') {
        const formData = new FormData();
        formData.append('file', {
          name: filePickResponse.name,
          type: filePickResponse.mimeType,
          uri: filePickResponse.uri,
        });
        formData.append('api_key', apiKey);
        formData.append('upload_preset', uploadPreset);

        setLoading(true);
        const fileUploadResponse = await fetch(cloudinaryBaseUrl, {
          body: formData,
          method: 'POST',
        });

        const jsonResponse = await fileUploadResponse.json();

        console.log(jsonResponse);
        setUploadedFile(jsonResponse);
        setImageUrl(jsonResponse.secure_url);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const resetApp = () => {
    setUploadedFile(null);
    setImageUrl(null);
  };

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', (event) => {
      setKeyboardHeight(event.endCoordinates.height);
    });

    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardHeight(0);
    });

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  const sendArticle = async () => {
    setLoading(true)
    let categoryIdString = categoryId.toString();
    const userToken = await AsyncStorage.getItem('userToken');
    try {
      const response = await axios.post(
        'https://catium.azurewebsites.net/api/v1/Article',
        {
          title: title,
          categoryId: categoryIdString,
          coverPicture: imageUrl,
          content: content,
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
      navigation.navigate('create')
    } catch (error) {
      console.log('Request Data:', {
        title: title,
        categoryId: categoryId,
        coverPicture: imageUrl,
        content: content,
      });
      console.log(userToken + ' ' + imageUrl + ' ' + categoryId + ' ' + content + ' ' + title)
      console.log('Error:', error.response);
      console.error('Error sending article:', error);
    }finally{
      setLoading(false)
    }
  };
  
  

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        contentContainerStyle={{ paddingBottom: keyboardHeight }}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.text}>Title:</Text>
        <Input placeholder="Enter the Title" theme="secondary" onType={setTitle} value={title} />
        <View style={styles.coverPictureContainer}>
          <Text style={styles.textOther}>Cover Picture:</Text>
          
          {imageUrl === null ? (
            <Button text="Pick A File" onPress={handleFileUpload} theme="secondary" />
          ) : null}

          {imageUrl ? (
            <Button text="Remove Picture" onPress={resetApp} theme="secondary" />
          ) : null}
        </View>

        {imageUrl !== null ? (
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Image source={{ uri: imageUrl }} style={{ width: 300, height: 300 }} />
          </View>
        ) : null}

        <View style={styles.coverPictureContainer}>
          <Text style={styles.textOther}>Category:</Text>
          <SetCategorisModal onSelectCategory={setCategoryId} />
        </View>
        <Text style={styles.text}>Content:</Text>
        <Input placeholder="Enter the Content" theme="secondary" onType={setContent} value={content} />
        
        <Button text="Share" onPress={sendArticle}/>
      </ScrollView>
          </View>
  );
}

export default CreatePage;
