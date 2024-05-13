
import React, { useState } from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  Alert,
  StyleSheet,
  Image,
  ActivityIndicator
} from "react-native";
import Input from "../Input";
import Button from "../Button/Button";
import { AntDesign } from '@expo/vector-icons'; 
import axios from "axios";
import { Entypo } from '@expo/vector-icons'; 
import UserCard from "../UserCard/UserCard";

function Search({navigation}) {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [articleData, setArticleData] = useState(null);
  const [userData, setUserData] = useState(null);

  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!selectedOption) {
      Alert.alert("Error", "Please select an option.");
      return;
    }
  
    setLoading(true);
  
    try {
      if (selectedOption === "article") {
        const responseData = await axios.get(
          `https://catium.azurewebsites.net/api/v1/ArticleIndex?index=${searchText}`
        );
        console.log(responseData.data.data);
        const data =responseData.data.data[0]
        setArticleData(data);
      }else if (selectedOption === "username") {
        const responseData = await axios.get(
          `https://catium.azurewebsites.net/api/v1/UserIndex?index=${searchText}`
        );
        console.log(responseData.data.data);
        const data =responseData.data.data[0]
        setUserData(data);
      }
     
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "An error occurred while fetching data.");
    } finally {
      setLoading(false);
    }
  };

  function handleSelect(id){
    console.log(id)
    navigation.navigate('article',{id})
  }
  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setModalVisible(false);
    setArticleData(null); // Yeni seçenek seçildiğinde article durumunu sıfırla
  };

  if(loading){
    return(
      <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
        <ActivityIndicator size={'large'}/>
      </View>
    )
  }
  return (
    <View style={{backgroundColor:'white'}}>
      <Text style={styles.headerText}>Search in Catium</Text>
      <View style={styles.searchContainer}>
        <Input
          placeholder="Search..."
          iconName="md-search-sharp"
          
          onType={setSearchText}
          value={searchText}
        />
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          style={styles.optionButton}
        >
          <Text style={styles.optionButtonText}>
            For <AntDesign name="arrowright" size={15} color="black" />
          </Text>
        </TouchableOpacity>
      </View>
      <Button text="SEARCH" onPress={handleSearch} />

      {articleData !== null ? (
        <View key={articleData.articleId} style={styles.container}>
          <View style={styles.closeIconContainer}>
            <Entypo name="cross" size={24} color="black" onPress={() => setArticleData(null)} />
          </View>
          <View style={styles.titleContainer}>
            <Text style={styles.contentTitle}>{articleData.title}</Text>
          </View>
          <View style={styles.articlePhotoContainer}>
            <Image source={{ uri: articleData.coverPicture }} style={styles.articlePhoto} />
          </View>
          <View style={styles.contentContainer}>
            <Text style={styles.contentText}>{articleData.content}</Text>
          </View>
          <Button text="Read More" theme="secondary" onPress={()=> handleSelect(articleData.articleId)}  />
        </View>
      ) : null}
      {userData !== null ? (
        <View  style={{padding:15}}>
          <UserCard item={userData} navigation={navigation}/>
        </View>
      )
      :
      (null)
      }

      <Text style={styles.latestArticlesText}>Latest Articles</Text>

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity onPress={() => handleOptionSelect('article')} style={styles.for}>
              <Text style={styles.forText}>Article</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleOptionSelect('username')}style={styles.for}>
              <Text style={styles.forText}>Username</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

export default Search;

const styles = StyleSheet.create({
  headerText: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '800',
    padding: 15,
    marginTop: 15
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5
  },
  optionButton: {
    marginLeft: 15,
    padding: 7,
    borderRadius: 5,
    backgroundColor: 'lightgray',
    
  },
  optionButtonText: {
    fontSize: 18,
    fontWeight: '700',
    alignItems: 'center',
    padding: 2
  },
  container: {
    padding: 10,
    margin: 10,
    borderWidth: 1,
    borderRadius: 5
  },
  closeIconContainer: {
    alignItems: 'flex-end'
  },
  titleContainer: {
    alignItems: 'center'
  },
  articlePhotoContainer: {
    padding: 5,
    alignItems: 'center'
  },
  contentContainer: {
    marginBottom: 15
  },
  contentTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10
  },
  contentText: {
    fontSize: 15,
    fontWeight: '500',
    overflow: 'hidden',
    lineHeight: 20,
    maxHeight: 3 * 20
  },
  articlePhoto: {
    width: '80%',
    height: 120,
    borderRadius: 5
  },
  latestArticlesText: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '800',
    padding: 15
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius:5
  },
  for:{
    borderWidth:1,
    padding:5,
    borderRadius:5,
    margin:5,
    backgroundColor:'lightgray'
  },
  forText:{
    fontSize:15,
    fontWeight:'600'
  }
});
