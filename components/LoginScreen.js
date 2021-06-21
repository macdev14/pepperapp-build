import { StatusBar } from 'expo-status-bar';
import { Image, StyleSheet, Text, View,  SafeAreaView, ScrollView  } from 'react-native';
import React, { useEffect, useState, useContext } from 'react';
import Constants from 'expo-constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from './api';
import {
    Input,
    Card,
    FormValidationMessage,
    Button
} from 'react-native-elements';





const SignInScreen = ({ navigation }) => {

    const url = 'http://localhost:8000/api/app/api/login';
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [SignUpErrors, setSignUpErrors] = useState({});
    
  _retrieveToken = async () => {
  try {
    const value = await AsyncStorage.getItem('token');
    if (value !== null ) {
      //console.log(value);
      navigation.reset({
               index: 0,
               routes: [{ name: 'Processes' }]
})
               navigation.navigate('Processes');
    }
    
        return;
    
  } catch (error) {
      return
    // Error retrieving data
  }
};
     _retrieveToken();

    function signIn(){
       
       return (api.post('api/app/api/login', { username: user, password: password} ).then((res)=>{
               if (res.data.token){
               AsyncStorage.setItem('token', res.data.token);}
               else if(res.data.access){
               AsyncStorage.setItem('token', res.data.access);}
               navigation.reset({
               index: 0,
               routes: [{ name: 'Processes' }]
})
               navigation.navigate('Processes');
           }
       ).catch((err)=>{AsyncStorage.removeItem('token'); setSignUpErrors({password: 'Senha Incorreta', username: 'Usuário incorreto/ Sem internet'}) }))
    }

   

    const handleSignIn = () => {
        // https://indicative.adonisjs.com
        const rules = {
            user: 'required|string',
            password: 'required|string|min:6|max:40'
        };

        const data = {
            user: user,
            password: password
        };

        const messages = {
            required: field => `${field} is required`,
            'username.alpha': 'Username contains unallowed characters',
            'password.min': 'Wrong Password?'
        };

        validateAll(data, rules, messages)
            .then(() => {
                //console.log('success sign in');
                signIn({ user, password });
            })
            .catch(err => {
                const formatError = {};
                err.forEach(err => {
                    formatError[err.field] = err.message;
                });
                setSignUpErrors(formatError);
            });
    };

    return (

        
    
     
       <ScrollView style={styles.scrollView}  showsVerticalScrollIndicator ={false}
  showsHorizontalScrollIndicator={false}>

<View>
        
         <Text style={{height:50, margin:55, marginBottom:0 ,fontSize:20, marginTop:30, color: '#000'}}> Pimentel Ferramentas</Text>
            <Card borderRadius={10}>
                <Input
                    label={''}
                    inputStyle={{height:50, fontSize:30,}}
                    inputContainerStyle={{height:50, margin:30}}
                    placeholder="Usuário"
                    value={user}
                    onChangeText={ setUser }
                    errorStyle={{ color: '#DC143C' }}
                    errorMessage={SignUpErrors ? SignUpErrors.username : null}
                />
                <Input
                    placeholder="Senha"
                    inputStyle={{height:50, fontSize:30}}
                    inputContainerStyle={{height:50, margin:30}}
                    value={password}
                    onChangeText={ setPassword }
                    secureTextEntry
                    errorStyle={{ color: '#DC143C' }}
                    errorMessage={SignUpErrors ? SignUpErrors.password : null}
                />
                <Button
                    buttonStyle={{ margin: 10, marginTop: 0, height: 100,borderRadius: 10, backgroundColor:'#000000'  }}
                    color="#808080"
                    title="Entrar"
                    onPress={() =>  {signIn()}  }
                />
            </Card>
        </View>
        </ScrollView>

    );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
  scrollView: {
    
   
  },
  text: {
    fontSize: 42,
  },
});
export default SignInScreen;