import React, { useEffect, useState } from 'react';
import { View, Text, Image, FlatList,StyleSheet, ActivityIndicator } from 'react-native';
import Button from '../../Components/Button/Button';
import {useFocusEffect} from '@react-navigation/native'
function CategoryPage({route,navigation}){
    const {categoryId, categoryName} = route.params
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
      const response = await fetch(`https://catium.azurewebsites.net/api/v1/CategoryArticle?id=${categoryId}`);
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
        <Text style={{fontSize:18,fontWeight:'700'}}>This Category is empty</Text>
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
      <Text style={{fontSize:20,fontWeight:'bold',textAlign:'center',padding:15}}>{categoryName}</Text>
    </View>
      )
  }
  return (
    <View style={{flex:1,backgroundColor:'white',paddingTop:10}}>
    <FlatList
    ListHeaderComponent={Header}
      data={articles}
      keyExtractor={(item) => item.articleId.toString()}
      renderItem={renderItem}
      />
      </View>
  );
  }

export default CategoryPage;

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container:{
    flex:1,
    padding:10,
    margin:10,
    borderWidth:1,
    borderRadius:5,
    backgroundColor:'white'
},
userContainer:{
    flexDirection:"row",
    alignItems:"center"
},
pp:{
    width:80,
    height:80,
    borderRadius:40
},userInfoContainer:{
    margin:10,
   
},
seperate:{
    marginBottom:10,
    marginTop:10,
    borderWidth:1,
    width:'100%'
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
button:{
    borderRadius:10
},
name:{
    fontWeight:"500",
    fontSize:15,
},
categoryName:{
    fontWeight:"500",
    fontSize:15,
},

});