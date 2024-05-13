import React,{useContext} from "react";
import { View,ActivityIndicator } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { AuthContext } from "./context/AuthContext";
import AuthStack from "./Navigation/AuthStack";
import Tabs from "./Navigation/Tabs";


function Router(){
  const {isLoading, userToken} = useContext(AuthContext);
  
  if(isLoading){
    return(
      <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
        <ActivityIndicator size={"large"}/>
      </View>
    )
  }
  
  return(
    

    <NavigationContainer>
    
      {userToken !== null ? (
        <Tabs/>
        ) : (
        <AuthStack/>
        )}
     
    </NavigationContainer>
    
  )
}

export default Router;
