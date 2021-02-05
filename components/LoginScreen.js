import { StatusBar } from 'expo-status-bar';
import { Image, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from './api';
import {
    Input,
    Card,
    FormValidationMessage,
    Button
} from 'react-native-elements';





const SignInScreen = ({ navigation }) => {

  

    const url = 'https://peppertools.herokuapp.com/app/api/login';
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [SignUpErrors, setSignUpErrors] = useState({});

    function signIn(){
       
       return (api.post('app/api/login', { username: user, password: password} ).then((res)=>{
         
               AsyncStorage.setItem('token', res.data.token);
               navigation.navigate('Processes');
           }
       ).catch((err)=>{AsyncStorage.removeItem('token'); setSignUpErrors({password: 'Senha Incorreta', username: 'Usuário incorreto'}) }))
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
                console.log('success sign in');
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
        <View>
         <Text style={{height:30, margin:50, fontSize:30, marginLeft:40, color: '#000'}}> Pimentel Ferramentas</Text>
            <Card borderRadius={10}>
                <Input
                    label={''}
                    inputStyle={{height:10, fontSize:30,}}
                    inputContainerStyle={{height:50, margin:30}}
                    placeholder="Usuário"
                    value={user}
                    onChangeText={ setUser }
                    errorStyle={{ color: '#DC143C' }}
                    errorMessage={SignUpErrors ? SignUpErrors.username : null}
                />
                <Input
                    placeholder="Senha"
                    inputStyle={{height:10, fontSize:30}}
                    inputContainerStyle={{height:50, margin:30}}
                    value={password}
                    onChangeText={ setPassword }
                    secureTextEntry
                    errorStyle={{ color: '#DC143C' }}
                    errorMessage={SignUpErrors ? SignUpErrors.password : null}
                />
                <Button
                    buttonStyle={{ margin: 10, marginTop: 50, height: 100,borderRadius: 10, backgroundColor:'#000000'  }}
                    color="#808080"
                    title="Entrar"
                    onPress={() =>  {signIn()}  }
                />
            </Card>
        </View>
    );
};

export default SignInScreen;