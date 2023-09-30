import 'react-native-gesture-handler';
//import { StatusBar } from 'expo-status-bar';
import  React, {Component, Fragment, useState, useEffect} from 'react';
//import { DynamicColorIOS, StyleSheet, Text, View, AppRegistry } from 'react-native';
import { NavigationContainer, getFocusedRouteNameFromRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RootStackScreen from "./components/stacks";
import api from "./components/api";
import UserContext from "./components/Context";

export default function App() {
  //const [data, dataSet] = useState(null);
  const [userToken, setUserToken] = useState({});
  const [userRefresh, setUserRefresh] = useState('');
  const [FuncId, setFuncId] = useState('');
  const authContext = React.useMemo(() => {
    


      return {
      LogIn: (arg, user_id, refresh) => {
        console.log("inside token: "+arg)
        //const func_id = 
        //console.log(func_id)
        const store = { 
          token : arg,
          refresh :refresh,
          user_id : user_id
        }
        
        //AsyncStorage.setItem('FUNCIONARIO', toString(user_id));
       
        AsyncStorage.setItem('token', JSON.stringify(store));
        console.log( " JSON OBJECT: "+JSON.stringify(store))
        setFuncId(user_id)
        setUserToken(arg);
      },
      retrieveToken: async ()=>{
        let token = await AsyncStorage.getItem('token')
        token = JSON.parse(token)
        console.log("Retrieve Token: " + token)
        if (token){
          return token['token']
      } 
          AsyncStorage.removeItem('token')
          AsyncStorage.removeItem('FUNCIONARIO')
          return setUserToken(null);
       
      },

      retrieveIdFuncionario:  async ()=>{
        let token = null;
        token = await AsyncStorage.getItem('token')
        console.log(token)
        token = JSON.parse(token)
        console.log("Retrieve user id:" + token.user_id)
        if (!token['user_id']){
          setUserToken(null);
          AsyncStorage.removeItem('token')
          AsyncStorage.removeItem('FUNCIONARIO')
          return null
      }
        return token['user_id']
      },

      retrieveRefresh:  async ()=>{
        let token = null;
        token = await AsyncStorage.getItem('refresh')
        console.log(token)
        token = JSON.parse(token)
        console.log("Retrieve refresh:" + token.refresh)
        if (!token['refresh']){
          setUserToken(null);
          AsyncStorage.removeItem('token')
          AsyncStorage.removeItem('refresh')
          AsyncStorage.removeItem('FUNCIONARIO')
          return null
      }
        setUserRefresh(token['refresh'])
        return token['refresh']
      },


      signOut: () => {
        setUserToken(null);
        AsyncStorage.removeItem('token')
        AsyncStorage.removeItem('id_func')
      },
    
    };
  }, []);


  useEffect(() => {




    async function Check(){
      let token = await AsyncStorage.getItem('token');
      if (token){
      token = JSON.parse(token)
     // const user_id = await AsyncStorage.getItem('FUNCIONARIO');
      setFuncId(token['user_id'])
      setUserToken(token['token'])
      const allproc = await api.get('api/processos/', { headers: { 'Authorization':  'Bearer ' + token.token } } ) .then().catch(err => {
        api.post('api/refresh/', { refresh : token.refresh} ).then( (res) => {
          const store = { 
            token : res.data.access,
            refresh :token.refresh,
            user_id : token.user_id
          }
          console.log("token refresh "+ token.refresh )
          //AsyncStorage.setItem('FUNCIONARIO', toString(user_id));
         
          AsyncStorage.setItem('token', JSON.stringify(store));
         
        }  ).catch( err => console.log(err))
        
         });
     
    }else{
      return  authContext.signOut()
    }
  }

    Check()
  }, [])
  



  return (
    <UserContext.Provider value={authContext}>
    <NavigationContainer>
     
    <RootStackScreen userToken={userToken}/>
   
    </NavigationContainer>
    </UserContext.Provider> 
  );
}



