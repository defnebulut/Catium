import React,{useState} from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import UserFallowers from '../Pages/UserFallowers/UserFallowers';
import { Image, Text} from 'react-native';
import HomePage from "../Pages/HomePage";
import FollowingPage from "../Pages/FollowingPage";
import ProfilePage from "../Pages/ProfilePage";
import CreatePage from "../Pages/CreatePage";
import ArticlePage from '../Pages/ArticlePage';
import ArticleCard from '../Components/ArticleCard';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import UserCard from '../Components/UserCard';
import OtherUserPage from '../Pages/OtherUserPage/OtherUserPage';
import ProfileTab from '../Pages/ProfileTab/ProfileTab';
import SettingsPage from '../Pages/SettingsPage';
import SettingsModal from '../Components/SettingsModal/SettingsModal';
import MenuModal from '../Components/MenuModal/MenuModal';
import getUserData from '../hooks/getUserData';
import SavedArticlesPage from '../Pages/SavedArticlesPage/SavedArticlesPage';
import CategoryPage from '../Pages/CategoryPage/CategoryPage';
import OtherUserFallowers from '../Pages/OtherUserFallowers/OtherUsersFallowers';
import OtherUserFallowings from '../Pages/OtherUserFollowings/OtherUserFollowings';
import UserFallowings from '../Pages/UserFollowings/UserFollowings';
import LikedArticlesPage from '../Pages/LikedArticlesPage/LikedArticlesPage';
import Search from '../Components/Serch/Serch';
import getOtherUserData from '../hooks/getOtherUserData';

const BottomTab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function TabsScreenOption({navigation}){
 
    return(
      {
        headerTitle: (props) => (<Image
          source={require('../../assets/logoAndNameBlack.png')}
          style={{width:100,height:50,}}/>)
         ,headerTitleAlign:"center",headerLeft: ()=> <MenuModal navigation={navigation}/> ,
          headerRight:()=> <SettingsModal navigation={navigation}/>
          }
      )
    }
    function TabsSecondScreenOption({navigation}){
      return(
        {
          headerTitle: (props) => (<Image
            source={require('../../assets/logoAndNameBlack.png')}
            style={{width:100,height:50,}}/>)
           ,headerTitleAlign:"center"  ,
            headerRight:()=> <SettingsModal navigation={navigation} />
            }
        )
      }


    function UserScreenOption({navigation}){
      const {userData} = getUserData(); 
      return(
        {
          headerTitle: (props) => (<Image
            source={require('../../assets/logoAndNameBlack.png')}
            style={{width:100,height:50,}}/>)
           ,headerTitleAlign:"center",headerLeft: ()=> <Text style={{fontSize:15,fontWeight:'500'}}>{userData ? `${userData.userName}`:''}</Text> ,
            headerRight:()=> <SettingsModal navigation={navigation} />
            }
        )
      }
      function OtherUserScreenOption({navigation,id}){
        const {otherUserData} = getOtherUserData(id); 
        return(
          {
            headerTitle: (props) => (<Image
              source={require('../../assets/logoAndNameBlack.png')}
              style={{width:100,height:50,}}/>)
             ,headerTitleAlign:"center",headerLeft: ()=> <Text style={{fontSize:15,fontWeight:'500'}}>{userData ? `${userData.userName}`:''}</Text> ,
              headerRight:()=> <SettingsModal navigation={navigation} />
              }
          )
        }
      function HomeStack(){
        return(
          <Stack.Navigator>
            <Stack.Screen name="HomeP" component={HomePage} options={({navigation})=>TabsScreenOption({navigation})}/>
            
            <Stack.Screen name='SettingsPage' component={SettingsPage} options={({navigation})=>TabsSecondScreenOption({navigation})}/>
            <Stack.Screen name='ProfileTab' component={ProfileTab} options={({navigation})=>TabsSecondScreenOption({navigation})}/>
            <Stack.Screen name='MenuModal' component={MenuModal} options={({navigation})=>TabsSecondScreenOption({navigation})}/>
            <Stack.Screen name='article' component={ArticlePage} options={({navigation})=>TabsSecondScreenOption({navigation})}/>
            

            <Stack.Screen name='SavedArticles' component={SavedArticlesPage} options={({navigation})=>TabsSecondScreenOption({navigation})} />
            <Stack.Screen name='CategoryPage' component={CategoryPage} options={({navigation})=>TabsSecondScreenOption({navigation})}/>
            <Stack.Screen name='OtherUserPage' component={OtherUserPage} options={({navigation})=>TabsSecondScreenOption({navigation})}/>
            <Stack.Screen name='UserFallowers' component={UserFallowers} options={({navigation})=>TabsSecondScreenOption({navigation})}/>
            <Stack.Screen name='OtherUserFallowers' component={OtherUserFallowers} options={({navigation})=>TabsSecondScreenOption({navigation})}/>
            <Stack.Screen name='UserFallowings' component={UserFallowings} options={({navigation})=>TabsSecondScreenOption({navigation})}/>
            <Stack.Screen name='OtherUserFallowings' component={OtherUserFallowings} options={({navigation})=>TabsSecondScreenOption({navigation})}/>
            <Stack.Screen name='LikedArticlesPage' component={LikedArticlesPage} options={({navigation})=>TabsSecondScreenOption({navigation})}/>





          </Stack.Navigator>
        )
      }
      function FollowingStack(){
        return(
          <Stack.Navigator>
            <Stack.Screen name="Following" component={FollowingPage} options={({navigation})=>TabsScreenOption({navigation})}/>
            
            <Stack.Screen name='SettingsPage' component={SettingsPage} options={({navigation})=>TabsSecondScreenOption({navigation})}/>
            <Stack.Screen name='ProfileTab' component={ProfileTab} options={({navigation})=>TabsSecondScreenOption({navigation})}/>
            <Stack.Screen name='MenuModal' component={MenuModal} options={({navigation})=>TabsSecondScreenOption({navigation})}/>
            <Stack.Screen name='article' component={ArticlePage} options={({navigation})=>TabsSecondScreenOption({navigation})}/>
        
            <Stack.Screen name='SavedArticles' component={SavedArticlesPage} options={({navigation})=>TabsSecondScreenOption({navigation})}/>
            <Stack.Screen name='OtherUserPage' component={OtherUserPage} options={({navigation})=>TabsSecondScreenOption({navigation})}/>

            <Stack.Screen name='UserFallowers' component={UserFallowers} options={({navigation})=>TabsSecondScreenOption({navigation})}/>
            <Stack.Screen name='OtherUserFallowers' component={OtherUserFallowers} options={({navigation})=>TabsSecondScreenOption({navigation})}/>

            <Stack.Screen name='CategoryPage' component={CategoryPage} options={({navigation})=>TabsSecondScreenOption({navigation})}/>
            <Stack.Screen name='UserFallowings' component={UserFallowings} options={({navigation})=>TabsSecondScreenOption({navigation})}/>
            <Stack.Screen name='OtherUserFallowings' component={OtherUserFallowings}options={({navigation})=>TabsSecondScreenOption({navigation})} />
            <Stack.Screen name='LikedArticlesPage' component={LikedArticlesPage} options={({navigation})=>TabsSecondScreenOption({navigation})}/>


          </Stack.Navigator>
        )
      }
      function CreateStack(){
        return(
          <Stack.Navigator>
            <Stack.Screen name="create" component={CreatePage} options={({navigation})=>TabsScreenOption({navigation})}/>
            
            <Stack.Screen name='SettingsPage' component={SettingsPage} options={({navigation})=>TabsSecondScreenOption({navigation})}/>
            <Stack.Screen name='ProfileTab' component={ProfileTab} options={({navigation})=>TabsSecondScreenOption({navigation})}/>
            <Stack.Screen name='article' component={ArticlePage} options={({navigation})=>TabsSecondScreenOption({navigation})}/>
            <Stack.Screen name='MenuModal' component={MenuModal} options={({navigation})=>TabsSecondScreenOption({navigation})}/>
            <Stack.Screen name='OtherUserFallowers' component={OtherUserFallowers} options={({navigation})=>TabsSecondScreenOption({navigation})}/>

            <Stack.Screen name='SavedArticles' component={SavedArticlesPage} options={({navigation})=>TabsSecondScreenOption({navigation})}/>
            <Stack.Screen name='OtherUserPage' component={OtherUserPage} options={({navigation})=>TabsSecondScreenOption({navigation})}/>

            <Stack.Screen name='UserFallowers' component={UserFallowers} options={({navigation})=>TabsSecondScreenOption({navigation})}/>

            <Stack.Screen name='CategoryPage' component={CategoryPage} options={({navigation})=>TabsSecondScreenOption({navigation})}/>
            <Stack.Screen name='UserFallowings' component={UserFallowings} options={({navigation})=>TabsSecondScreenOption({navigation})}/>
            <Stack.Screen name='LikedArticlesPage' component={LikedArticlesPage} options={({navigation})=>TabsSecondScreenOption({navigation})}/>

            <Stack.Screen name='OtherUserFallowings' component={OtherUserFallowings} options={({navigation})=>TabsSecondScreenOption({navigation})}/>

          </Stack.Navigator>
        )
      }
  
      function UserStack(){
        return(
          <Stack.Navigator>
            <Stack.Screen name="user" component={ProfilePage} options={({navigation})=>UserScreenOption({navigation})}/>
            
            <Stack.Screen name="articleCard" component={ArticleCard} options={{headerShown:false}}/>
            <Stack.Screen name='article' component={ArticlePage} options={({navigation})=>TabsSecondScreenOption({navigation})}/>
            
            <Stack.Screen name="users" component={UserCard} options={{headerShown:false}}/>
            <Stack.Screen name='OtherUserPage' component={OtherUserPage} options={({navigation})=>TabsSecondScreenOption({navigation})}/>
         
            <Stack.Screen name='SettingsPage' component={SettingsPage} options={({navigation})=>TabsSecondScreenOption({navigation})}/>
            <Stack.Screen name='ProfileTab' component={ProfileTab} options={({navigation})=>TabsSecondScreenOption({navigation})}/>
            <Stack.Screen name='MenuModal' component={MenuModal} options={({navigation})=>TabsSecondScreenOption({navigation})}/>
            <Stack.Screen name='UserFallowers' component={UserFallowers} options={({navigation})=>TabsSecondScreenOption({navigation})}/>

            <Stack.Screen name='OtherUserFallowers' component={OtherUserFallowers} options={({navigation})=>TabsSecondScreenOption({navigation})}/>

            <Stack.Screen name='SavedArticles' component={SavedArticlesPage} options={({navigation})=>TabsSecondScreenOption({navigation})}/>
            <Stack.Screen name='CategoryPage' component={CategoryPage} options={({navigation})=>TabsSecondScreenOption({navigation})}/>
            <Stack.Screen name='LikedArticlesPage' component={LikedArticlesPage} options={({navigation})=>TabsSecondScreenOption({navigation})}/>

            <Stack.Screen name='UserFallowings' component={UserFallowings} options={({navigation})=>TabsSecondScreenOption({navigation})}/>
            <Stack.Screen name='OtherUserFallowings' component={OtherUserFallowings} options={({navigation})=>TabsSecondScreenOption({navigation})}/>

          </Stack.Navigator>
        )
      }

function Tabs(){
  return(
    <BottomTab.Navigator screenOptions={{headerShown:false}}  >
      <BottomTab.Screen name="Home" component={HomeStack}
      options={{
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="home" color={color} size={size} />
        ),
      }}
      />
      <BottomTab.Screen name="Create" component={CreateStack}
      options={{
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="plus" color={color} size={size} />
        ),
      }}
      />
      <BottomTab.Screen name="Followings" component={FollowingStack} 
      options={{
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="heart" color={color} size={size} />
        ),
        
      }}
      />
      <BottomTab.Screen name="Profile" component={UserStack} 
      options={{
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="account" color={color} size={size} />
          )}}
      />
    </BottomTab.Navigator>
  )
}
export default Tabs;

