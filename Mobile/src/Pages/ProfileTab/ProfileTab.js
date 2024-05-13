import React from "react";

import { View, Image,Text,ActivityIndicator, TextInput} from "react-native";
import Button from '../../Components/Button'
import styles from './ProfileTab.style'
import { EvilIcons } from '@expo/vector-icons';
import * as DocumentPicker from 'expo-document-picker';
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const cloudName = 'de0cenbjv';
const apiKey = '142139164861266';
const uploadPreset = 'iobenfli';
const cloudinaryBaseUrl = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

function ProfileTab({route,navigation}){
    const {userData} = route.params;
    const [uploadedFile, setUploadedFile] = useState(null);
    const [bio, setBio] = useState('')
    const [imageUrl, setImageUrl] = useState(null);
    const [loading,setLoading] = useState(false)

    const ChangeProfile = async () => {
        setLoading(true);
        const userInfo = await AsyncStorage.getItem("userInfo");
        const parsedUserInfo = JSON.parse(userInfo);
      
        const userToken = await AsyncStorage.getItem('userToken');
        try {
          const response = await axios.put(
            `https://catium.azurewebsites.net/api/v1/User/${parsedUserInfo.data.id}`,
            {
              userId: parsedUserInfo.data.id,
              bio: bio,
              pp: imageUrl,
            },
            {
              headers: {
                'Content-Type': 'application/json',
                'Referer': 'https://catium.azurewebsites.net',
                'Authorization': `Bearer ${userToken}`
              }
            }
          );
      
          console.log('Response:', response.data);
          navigation.goBack();
        } catch (error) {
          console.log('Error:', error);
        } finally {
          setLoading(false);
        }
      };
      
    
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
      if (loading) {
        return (
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <ActivityIndicator size="large" />
          </View>
        );
      }    
    return(
        <View style={styles.container}>
            <View style={styles.buttonContainer}>
                <Button text='Save Changes' theme="third" onPress={()=>ChangeProfile()}/>
                <Button text='Go Back' theme='secondary' onPress={()=>navigation.goBack()}/>
            </View>
            
             <View style={styles.innerContainer}>
                {imageUrl? 
                <Image source={{uri:imageUrl}}
                style={styles.pp}/>
                :
                 <Image source={require('../../../assets/userIcon.png')}
                 style={styles.pp}/>
                }
                 <EvilIcons name="pencil" size={30} color="black" onPress={handleFileUpload} />
             </View>
             

             
             <View style={styles.bioContainer}>
                <TextInput placeholder={userData.bio? `${userData.bio} (CHANGE BIO)` : 'Add bio'} style={{fontSize:18,padding:5}} onChangeText={setBio} value={bio}/>
                
             </View>
        </View>
    )
}

export default ProfileTab;