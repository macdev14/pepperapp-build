import { StatusBar } from 'expo-status-bar';
import {Alert, Image, StyleSheet, TextInput ,View,  SafeAreaView, ScrollView  } from 'react-native';
import React, { useEffect, useState, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from './api';
import {
    Input,
    Card,
    FormValidationMessage,
    Button
} from 'react-native-elements';
import { Animated , Text} from 'react-native';




const Qtd = ({ route, navigation }) => {

    const { idProc, osid, timeType} = route.params;
    const [Token, setToken] = useState('');
    const [ocorrencia, setOcorrencia] = useState('')
    const [qtd, setQtd] = useState('');
    
    const [SignUpErrors, setSignUpErrors] = useState({});

useEffect(() => {
    (timeType == 'fim') ? (navigation.setOptions({ title: "Ocorrência" })) : (navigation.setOptions({ title: "Quantidade" }))  
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


    function signIn(timeTypeOpt){
        try {
          parseInt(qtd)
        } catch (error) {
          return
        }
        ((qtd=='') && (timeTypeOpt == "inicio")) ? (alert('Alterar Quantidade')) : ( setQtd(parseInt(qtd)) );
        var options = { hour12: false };
        let curTime = new Date().toLocaleTimeString('pt-BR', options);
        //console.log(curTime);
        return (api.post('api/historico_os/',   { os: osid, processo: idProc, qtd: qtd, [timeTypeOpt]: curTime, ocorrencias: ocorrencia}, { headers: { 'Authorization':  `Bearer  ${Token}` } }  ).then((res)=>{
               if (res.data.non_field_errors){
                 alert(res.data.non_field_errors)
               }
               (timeTypeOpt == 'fim') ? alert("O.S finalizada") : alert("O.S iniciada") 
               
               navigation.navigate('Processes');
           }
       ).catch((err)=>{ alert(err.response.data.non_field_errors)//setSignUpErrors({ username: 'Erro ao cadastrar quantidade'}) 
       }))
    }

    function confirm() {
        Alert.alert(
  'Confirmar ',
  ((timeType == 'fim')? 'Confirmar Ocorrência':'Confirmar Quantidade'),
  [ 
    {
      text: 'Cancelar',
      onPress: () => {}
    },
    {
      text: 'Confirmar',
      onPress: () => signIn(timeType)
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
        <SafeAreaView style={styles.container}>
    
     
       <ScrollView style={StyleSheet.absoluteFill}  showsVerticalScrollIndicator ={false}
  showsHorizontalScrollIndicator={false}>
         <Text style={styles.head}> 
            { ((timeType == 'fim')? 'Ocorrência':'Quantidade')} 
         </Text>
             <Button
                    buttonStyle={{ margin: 10, marginTop: 20, height: 80,borderRadius: 10, backgroundColor:'#000000', width:100,  justifyContent: 'center',}}
                    color="#808080"
                    title="Confirmar"
                    onPress={() =>  {confirm()}  }
                />
            <Card borderRadius={10} style={styles.card}>
                {(timeType == 'fim') ?
                (<TextInput 
                    label={'Ocorrência (Opcional) '}
                   
                    multiline 
                    style={{fontSize:30, borderRadius:10}}
                    onChangeText={ setOcorrencia }
                    value={ocorrencia.toString()}
                    maxLength={10000}  //setting limit of input
                    error={SignUpErrors ? SignUpErrors.username : null}
/>) :(

  <TextInput 
                    label={'Quantidade'}
                    textAlign={'center'} 
                    style={{height:80, fontSize:30, borderRadius:10, backgroundColor: '#e0e0e0'}}
                    keyboardType='numeric'
                    onChangeText={ setQtd }
                    value={qtd.toString()}
                    maxLength={1000}  //setting limit of input
                    error={SignUpErrors ? SignUpErrors.username : null}
/>)


                }
                

               
            </Card>
        </ScrollView>
    </SafeAreaView>
    );


    
};
const styles = StyleSheet.create({
  card:{
    marginBottom:50,
  },
  container: {
    flex: 2,
    marginTop:0 
    
  },
  head:{
    height:40,
    fontSize:30, 
    textAlign:'center',
    color: '#000000', 
    marginBottom:0, 
    marginTop:20
  },
  scrollView: {
   textAlign:'center',
   
  },
  button:{
    marginLeft: 42
  },
  text: {
    alignItems: 'center',
    fontSize: 42,
    justifyContent: 'center',
  },
});


export default Qtd;