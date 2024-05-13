import React,{useState,useEffect} from "react";


import { View,FlatList,ActivityIndicator,Text} from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import axios from "axios";
import { BASE_URL } from "../config";
import ArticleCard from '../Components/ArticleCard'
import OtherUserFallowers from "../Pages/OtherUserFallowers/OtherUsersFallowers";
import OtherUserFallowings from "../Pages/OtherUserFollowings/OtherUserFollowings";
import {useFocusEffect} from '@react-navigation/native'
const Tab = createMaterialTopTabNavigator();
const Stack = createNativeStackNavigator();


function MaterialTabOther({id}){

  function OtherUsersFallowersWrapper() {
      
    return <OtherUserFallowers userId={id} />;
  }
  function OtherUsersFallowingsWrapper() {
      
    return <OtherUserFallowings userId={id} />;
  }
    function UserArticles({navigation}){
        const [data, setData] = useState(null);
        const [loading, setLoading] =useState(true)
        useFocusEffect(
          React.useCallback(() => {
            fetchUserInfo()      
            return () => {
              
            };
          }, [])
        );
          
          const fetchUserInfo = async () => {
            try {
              setLoading(true);
              const response = await axios.get(
                `${BASE_URL}v1/UserArticle?id=${id}`
              );
              const article = response.data.data;
              setData(article);
            } catch (error) {
              console.error("Veri çekme hatası:", error);
            } finally {
              setLoading(false);
            }
          };
          
        const handleProductSelect = (id) =>{
            navigation.navigate("article",{id});
        }
        
        const renderArticle = ({item}) => <ArticleCard item={item} onSelect={() =>handleProductSelect(item.articleId)} userId={id} />
        if (loading) {
            return (
              <View style={{flex:1,alignItems:"center",justifyContent:"center"}}>
                <ActivityIndicator size="large" />
              </View>
            );
        }
        if (data === null || data.length === 0) {
          return (
            <View style={{justifyContent:"center",flex:1,alignItems:"center"}}>
              <Text style={{fontSize:18,fontWeight:'500'}}>There is no article</Text>
            </View>
          );
        }
        return(
            <View style={{backgroundColor:'white'}}>
                <FlatList
                data={data}
                renderItem={renderArticle}
                />
            </View>
        )
    }
    return(
        <Tab.Navigator
        tabBarOptions={{
          activeTintColor: '#edf2f4', 
          inactiveTintColor: '#2b2d42',
          style: {
            backgroundColor: '#8d99ae', 
          }, 
        }}>
            <Tab.Screen name="Artıcles" component={UserArticles}/>
            <Tab.Screen name="Followıng" component={OtherUsersFallowingsWrapper} />
            <Tab.Screen name='Followers' component={OtherUsersFallowersWrapper}/>
        </Tab.Navigator>
    )
}

export default MaterialTabOther;

