import React, { useEffect, useState } from 'react';
import { View, Text, Image, FlatList,StyleSheet, ActivityIndicator } from 'react-native';
import Button from '../../Components/Button/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect} from '@react-navigation/native'
function FollowingPage({navigation}){
    
    const [articles, setArticles] = useState({});
    const [loading,setLoading] = useState(false)
    useFocusEffect(
      React.useCallback(() => {
        fetchArticles()      
        return () => {
          
        };
      }, [])
    );

  const fetchArticles = async () => {
      try {
        setLoading(true)
        const userInfo = await AsyncStorage.getItem("userInfo");
        const parsedUserInfo = JSON.parse(userInfo);
      const response = await fetch(`https://catium.azurewebsites.net/api/v1/FollowerArticles?id=${parsedUserInfo.data.id}`);
      const data = await response.json();
      setArticles(data.data);
    } catch (error) {
      console.error(error);
    }finally{
        setLoading(false)
    }
  };

 
  
  if(articles.length===0){
    return(
      <View style={{flex:1,justifyContent:"center", alignItems:"center",backgroundColor:'white'}}>
        <Text style={{fontSize:18,fontWeight:'700'}}>Takip ettiğiniz kişiler paylaşım yapmamış</Text>
      </View>
    )
  }
  function handleSelect(id){
    navigation.navigate('article',{id})
  }

  if (loading) {
    return (
      <View style={{flex:1,alignItems:"center",justifyContent:"center"}}>
        <ActivityIndicator size="large" />
      </View>
    );
}
  const renderItem = ({ item }) => {
    

    
    return (
      <View style={styles.container}>
       
        <View style={styles.titleContainer}>
          <Text style={styles.contentTitle}>{item.title}</Text>
        </View>
        <View style={styles.articlePhotoContainer}>
          <Image source={{ uri: item.coverPicture }} style={styles.articlePhoto} />
        </View>
        <View style={styles.contentContainer}>
          <Text style={styles.contentText}>{item.content}</Text>
        </View>
        <Button text="Read More" onPress={()=>handleSelect(item.articleId)} theme="secondary" />
      </View>
    );
  };
  function Header(){
    return(

      <View>
        <Text style={{textAlign:'center',fontSize:20,fontWeight:'800',padding:15}}>Articles from users you follow</Text>
    </View>
      )
  }
  return (
    <View style={{flex:1,backgroundColor:'white'}}>

    <FlatList
    ListHeaderComponent={Header}
    data={articles}
    keyExtractor={(item) => item.articleId.toString()}
    renderItem={renderItem}
    />
    </View>
  );
  }



const styles = StyleSheet.create({
  container:{
    flex:1,
    padding:10,
    margin:10,
    borderWidth:1,
    borderRadius:5
},

titleContainer:{
    
    alignItems:"center"
}, 
articlePhotoContainer:{
    padding:5,
    alignItems:"center"
},
contentContainer:{
  marginBottom:15
},
contentTitle:{
    fontSize:20,
    fontWeight:"bold",
    marginBottom:10,
},
contentText:{
    fontSize:15,
    fontWeight:'500',
    overflow: 'hidden',
    lineHeight: 20, 
    maxHeight: 3 * 20,
    
},
articlePhoto:{
    width:'80%',
    height:120,
    borderRadius:5
},
name:{
    fontWeight:"500",
    fontSize:15,
},

});

export default FollowingPage;