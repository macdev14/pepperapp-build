import { StatusBar } from 'expo-status-bar';
import {Alert, Image, StyleSheet, Text, TextInput ,View } from 'react-native';
import React, { useEffect, useState, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from './api';
import {
    Input,
    Card,
    FormValidationMessage,
    Button
} from 'react-native-elements';
import { TextField } from "react-native-material-textfield";




const Qtd = ({ route, navigation }) => {

    const { idProc, osid} = route.params;
    const [Token, setToken] = useState('');
    
    const [qtd, setQtd] = useState('');
    
    const [SignUpErrors, setSignUpErrors] = useState({});

useEffect(() => {

    const getToken = async () =>{
       const tok = await AsyncStorage.getItem('token');
       if (tok !== null) {
    return setToken(tok)
    }
    return navigation.navigate('Login');
    }
   
    (async () => {
      await getToken();
    })();
  }, []);


    function signIn(){
        if(qtd!=''){setQtd(parseInt(qtd))}else{return alert('Alterar Quantidade')}
        var options = { hour12: false };
        let curTime = new Date().toLocaleTimeString('pt-BR', options)
        console.log(curTime);
        return (api.post('api/processos/inicio',   { osid: osid, idProc: idProc, qtd: qtd, horario: curTime}, { headers: { 'Authorization':  `${Token}` } }  ).then((res)=>{
         
               alert(res.data)
               navigation.navigate('Processes');
           }
       ).catch((err)=>{ alert(err)//setSignUpErrors({ username: 'Erro ao cadastrar quantidade'}) 
       }))
    }

    function confirm() {
        Alert.alert(
  'Confirmar ',
  'Confirmar Quantidade',
  [
    {
      text: 'Confirmar',
      onPress: () => signIn()
    },
     {
      text: 'Cancelar',
      onPress: () => {}
    }
  ],
  { cancelable: true }
);
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
         <Text style={{height:30,fontSize:30, textAlign:'center', color: '#000000', marginBottom:30, marginTop:30}}> Quantidade </Text>
            <Card borderRadius={10}>
                <TextInput 
                    label={'Quantidade'}
                    textAlign={'center'} 
                    style={{height:80, fontSize:30, borderRadius:10, backgroundColor: '#e0e0e0'}}
                    keyboardType='numeric'
                    onChangeText={ setQtd }
                    value={qtd}
                    maxLength={1000}  //setting limit of input
                    error={SignUpErrors ? SignUpErrors.username : null}
/>
                
               
                <Button
                    buttonStyle={{ margin: 10, marginTop: 20, height: 80,borderRadius: 10, backgroundColor:'#000000'  }}
                    color="#808080"
                    title="Confirmar"
                    onPress={() =>  {confirm()}  }
                />
            </Card>
        </View>
    );
};

export default Qtd;