import React, {useState} from "react";
import { View,Text,Image,Alert,ActivityIndicator} from "react-native";
import { BASE_URL } from "../../../config";
import styles from './Sign.styles'
import Input from "../../../Components/Input";
import Button from "../../../Components/Button";
import { Formik } from "formik";
import { LinearGradient } from 'expo-linear-gradient';
import axios from "axios"
import * as Yup from 'yup'
const initialForm ={
    userName:'',
    firstName:'',
    lastName:'',
    email:'',
    password:'',
    confirmPassword:'',
    
};

function Sign({navigation}){   

    const [secure,setSecure] = useState(true);
    const [iconText , setIconText] = useState('eye-outline')
    const [loading,setLoading] = useState(false)
    if(loading){
      return(
        <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
          <ActivityIndicator size={"large"}/>
        </View>
      )
    }
    function handleVisible(){
      if(secure===true){
          setSecure(false);
          setIconText('md-eye-off-outline')
      }else{
          setSecure(true);
          setIconText('md-eye-outline')
      }
  }

    async function handleFormSubmit(formValues) {
      setLoading(true)
      try {
        const response = await axios.post(
          `${BASE_URL}Account/register`,
          formValues,
          {
            headers: {
              'Content-Type': 'application/json',
              'Origin': 'https://catium.azurewebsites.net'
            },
          }
        );
    
        console.log(response);
        const responseData = response.data;
    
        if (response.status === 200) {
          Alert.alert('Confirm Email', 'Confirm your account from the link sent to your email');
          navigation.navigate('LoginPage')
        } else {
          const errorMessage = responseData.Message || 'Registration failed.';
          console.log(errorMessage)
          Alert.alert('Error', errorMessage);
        }
      } catch (error) {
        console.error(error);
      }finally{
        setLoading(false)
      }
    }

    const validationSchema = Yup.object().shape({
      firstName: Yup.string()
    .matches(/^[a-zA-Z]*$/, 'Only English characters are allowed')
    .required('Name is required'),
  lastName: Yup.string()
    .matches(/^[a-zA-Z]*$/, 'Only English characters are allowed')
    .required('Surname is required'),
  email: Yup.string()
    .email('Invalid email')
    .required('Email is required'),
  userName: Yup.string()
    .matches(/^[a-zA-Z]*$/, 'Only English characters are allowed')
    .required('Username is required'),
      password: Yup.string()
      .required('Password is required')
      .min(8, 'Password must contain 8 or more characters')
      .matches(/[a-z]/, 'Password must contain at least 1 lowercase letter')
      .matches(/[A-Z]/, 'Password must contain at least 1 uppercase letter')
      .matches(/\d/, 'Password must contain at least 1 number'),
      
      confirmPassword: Yup.string()
        .required('Confirm Password is required')
        .oneOf([Yup.ref('password')], 'Passwords must match'),
    });
    
    return (
      <LinearGradient
        colors={['#fd6585', '#0d25b9']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.backgraundContainer}
      >
        <View style={styles.container}>
          <Text style={styles.header}>Welcome to Catium</Text>
          <Formik
            initialValues={initialForm}
            validationSchema={validationSchema}
            onSubmit={handleFormSubmit}
          >
            {({ values, handleChange, handleBlur, handleSubmit, errors }) => (
              <>
                <Input
                  value={values.firstName}
                  onType={handleChange('firstName')}
                  onBlur={handleBlur('firstName')}
                  placeholder="Name"
                  theme="secondary"/>
                  {errors.firstName &&<Text style={{marginLeft:20,fontWeight:'500'}}>{errors.firstName}</Text>}

                <Input
                  value={values.lastName}
                  onType={handleChange('lastName')}
                  onBlur={handleBlur('lastName')}
                  placeholder="Surname"
                  theme="secondary"/>
                  {errors.lastName &&<Text style={{marginLeft:20,fontWeight:'500'}}>{errors.lastName}</Text>}
                <Input
                  value={values.email}
                  onType={handleChange('email')}
                  onBlur={handleBlur('email')}
                  placeholder="E-mail"
                  theme="secondary"/>
                  {errors.email &&<Text style={{marginLeft:20,fontWeight:'500'}}>{errors.email}</Text>}
                <Input
                  value={values.userName}
                  onType={handleChange('userName')}
                  onBlur={handleBlur('userName')}
                  placeholder="Username"
                  theme="secondary"/>
                  {errors.userName &&<Text style={{marginLeft:20,fontWeight:'500'}}>{errors.userName}</Text>}
                <Input
                  value={values.password}
                  onType={handleChange('password')}
                  onBlur={handleBlur('password')}
                  placeholder="Password"
                  isSecure={secure}
                  iconName={iconText}
                  onPressIcon={() => handleVisible()}
                  theme="secondary"/>
                  {errors.password &&<Text style={{marginLeft:20,fontWeight:'500'}}>{errors.password}</Text>}
    
                <Input
                  value={values.confirmPassword}
                  onType={handleChange('confirmPassword')}
                  onBlur={handleBlur('confirmPassword')}
                  placeholder="Confirm Password"
                  isSecure={secure}
                  iconName={iconText}
                  onPressIcon={() => handleVisible()}
                  theme="secondary"/>
                  {errors.confirmPassword &&<Text style={{marginLeft:20,fontWeight:'500'}}>{errors.confirmPassword}</Text>}
    
                <Button text="Sign Up" onPress={handleSubmit} />
              </>
            )}
          </Formik>
        </View>
      </LinearGradient>
    );
}

export default Sign;

