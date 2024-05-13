import React,{createContext, useEffect, useState} from "react";
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from "axios";
import { BASE_URL } from "../config";
import { Alert } from "react-native";
export const AuthContext = createContext();


export const AuthProvider = ({children}) =>{
    const [isLoading, setIsLoading] = useState(false);
    const [userToken, setUserToken] = useState(null);
    const [userInfo, setUserInfo] = useState(null);

    const login = (email, password) => {
        setIsLoading(true);
        axios.post(`${BASE_URL}Account/authenticate`, {
            email,
            password
        }).then(res => {
            let userInfo = res.data;
            setUserInfo(userInfo);
            setUserToken(userInfo.data.jwToken);

            AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
            AsyncStorage.setItem('userToken', userInfo.data.jwToken);

            console.log(res.data);
            console.log('User Token: ' + userInfo.data.jwToken);

        }).catch(e => {
            Alert.alert('Error', 'Kullanıcı adı veya şifre hatalı');
            console.log(`Login Error: ${e}`);
        }).finally(() => {
            setIsLoading(false);
        });
    }

    const logout = () => {
        setIsLoading(true);
        setUserToken(null);
        AsyncStorage.removeItem('userInfo');
        AsyncStorage.removeItem('userToken');
        setIsLoading(false);
    }

    const isLoggedIn = async () => {
        try {
            setIsLoading(true);
            let userInfo = await AsyncStorage.getItem('userInfo');
            let userToken = await AsyncStorage.getItem('userToken');
            userInfo = JSON.parse(userInfo);
            if (userInfo) {
                setUserInfo(userInfo);
                setUserToken(userToken);
            }
        } catch (e) {
            console.log(`isLoggedIn Error: ${e}`);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        isLoggedIn();
    }, []);

    return(
        <AuthContext.Provider value={{ login, logout, isLoading, userToken }}>
            {children}
        </AuthContext.Provider>
    );
}
