import React from "react";
import ArticleCard from "../Components/ArticleCard";
import UserCard from "../Components/UserCard";
import { Text,Image } from "react-native";
import { Ionicons} from '@expo/vector-icons';
import UserArticles from "../Pages/UserArticles/UserArticles";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import UserFallowers from "../Pages/UserFallowers/UserFallowers";
import UserFallowings from "../Pages/UserFollowings/UserFollowings";

const Tab = createMaterialTopTabNavigator();
const Stack = createNativeStackNavigator();

function MaterialTabs(){
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
            <Tab.Screen name="Followıng" component={UserFallowings} />
            <Tab.Screen name='Followers' component={UserFallowers}/>
        </Tab.Navigator>
    )
}

export default MaterialTabs;