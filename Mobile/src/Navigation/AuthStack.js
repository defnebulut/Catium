import React from "react";
import { Image, Text, TouchableOpacity,StyleSheet} from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Login from "../Pages/auth/Login";
import Sign from "../Pages/auth/Sign";

const Stack = createNativeStackNavigator();

function AuthScreenOption(title,navigatePage,navigation){
  return {
    headerTitle: (props) => (
      <Image
        source={require('../../assets/CATIUM.png')}
        style={styles.image}
      />
    ),
    headerTitleAlign: "center",
    headerRight: () => (
      <TouchableOpacity onPress={() => navigation.navigate(navigatePage)}>
        <Text style={styles.headerText}>{title}</Text>
      </TouchableOpacity>
    ),
  };
  }

function AuthStack(){
     return(
      <Stack.Navigator screenOptions={{headerStyle:styles.header}}>
        <Stack.Screen name="LoginPage" component={Login}
        options={({navigation})=>(AuthScreenOption('SignUp','SignPage',navigation))}/>
        <Stack.Screen name="SignPage"  component={Sign} 
        options={({navigation})=>(AuthScreenOption('LogIn','LoginPage',navigation))}/>
      </Stack.Navigator>
  )
} 

export default AuthStack;


const styles = StyleSheet.create({
    header:{
      backgroundColor:'black'
    },
    headerText:{
      fontWeight:"bold",
      color:'white'
    },
    image:{ 
      width: 50, 
      height: 50 
    },
    logoName:{
      width:100,
      height:50,
    }
    
  })