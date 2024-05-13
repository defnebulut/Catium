import React, { useState,useContext } from "react";
import styles from './Login.styles'
import Input from "../../../Components/Input";
import Button from "../../../Components/Button";
import { Formik } from "formik";
import {View, Text} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';

import { AuthContext } from "../../../context/AuthContext";
import * as Yup from 'yup'
const initialForm ={
    email:'',
    password:'',
};

function Login({navigation}){
    const {login} = useContext(AuthContext)
    const [secure,setSecure] = useState(true);
    const [iconText , setIconText] = useState('eye-outline')
    
    function handleVisible(){
        if(secure===true){
            setSecure(false);
            setIconText('md-eye-off-outline')
        }else{
            setSecure(true);
            setIconText('md-eye-outline')
        }
    }
   
    async function handleFormSubmit(formValues){
       login(formValues.email,formValues.password)
      
    }

    const validationSchema = Yup.object().shape({
        email: Yup.string().required('Name is required'),
        password: Yup.string().required('Password is required'),
})
    return(
        <LinearGradient
        colors={['#fd6585', '#0d25b9']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.backgraundContainer}>

        <View style={styles.container}>
            
            <Text style={styles.header}>Login to Catium</Text>
            <Text style={styles.text}>Please login with your Username and Password</Text>
            <Formik initialValues={initialForm} validationSchema={validationSchema} onSubmit={handleFormSubmit}>
                {({values,handleChange,handleSubmit,errors})=>(
                    <>
                    <Input    
                    value={values.email} 
                    onType={handleChange('email')}
                    placeholder="E-mail"
                    theme="secondary"
                    
                    />
                    {errors.email &&<Text style={{marginLeft:20,fontWeight:'500'}}>{errors.email}</Text>}
                    <Input 
                    value={values.password}
                    onType={handleChange('password')} 
                    placeholder="Password"
                    isSecure = {secure}
                    iconName = {iconText}
                    onPressIcon={()=>handleVisible()}
                    theme="secondary"/>
                    {errors.password &&<Text style={{marginLeft:20,fontWeight:'500'}}>{errors.password}</Text>}
                            
                    <Button text="Log In" onPress={handleSubmit}/>
                </>
                )}
               
            </Formik>
            
        </View>
        </LinearGradient>
    )
    
}

export default Login;