import { Modal, Platform, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState, useContext } from 'react';
import { BarCodeScanner } from 'expo-barcode-scanner';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from './api';
import UserContext from './Context'
import {
    Input,
    Card,
    FormValidationMessage,
    Button
} from 'react-native-elements';


export default function QrStart({ route, navigation }) {
  const context = useContext(UserContext)
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [modalVisible, setmodalVisible] = useState(false)
  const [Token, setToken] = useState('');
  const [userId, setUserId] = useState('')
  const { idProc } = route.params;
  //console.log(idProc)
   useEffect(() => {

    // const getToken = async () =>{
    //    const tok = await AsyncStorage.getItem('token');
    //    if (tok !== null) {
    // return setToken(tok)
    // }
    // return context.SignOut();
    // }
   
    (async () => {
      const user_id = await context.retrieveIdFuncionario()
      setUserId(user_id)
      const token = await context.retrieveToken()
      setToken(token)
      //console.log(Token)
      if (Platform.OS === 'web') {
        setHasPermission(true);
      } else {
        
        const { status } = await BarCodeScanner.requestPermissionsAsync();
        setHasPermission(status === 'granted');
      }
    })();
  }, []);
  
 const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    
    var options = { hour12: false };
    let curTime = new Date().toLocaleTimeString('pt-BR', options)
    //console.log(curTime);
    //console.log(Token)
    //console.log(data)
    let id = data
     if (id.includes('http') && (id.includes('.com') || id.includes('.io')  ) ) {
 return navigation.navigate('Qtd', {idProc: idProc, osid: id, userID: userId, timeType: 'start'})
 }
      
      else{
      return alert('Ordem de Serviço inválida')
       }  

    //console.log("wait...")
    //console.log(id)
   
   /* return (api.post('api/processos/inicio', { osid: id, idProc: idProc, horario: curTime}, { headers: { 'Authorization':  `${Token}` } } ).then((res)=>{
         
           return alert(res.data)
              
           }
       ).catch((err)=>{ return alert(err) }))*/
  };

  if (hasPermission === null) {
    return   <Text>No access to camera</Text>
  }
  if (hasPermission === false) {
    return   <Text>No access to camera</Text>
  }




  return (
    <>
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={styles.qr}
      />
       {scanned && <Button title={'Escanear Novamente'}  buttonStyle={{backgroundColor: '#000000', height: 130, width: 500}} onPress={() => setScanned(false)} />}
       
       
      
    </View>
     <View style={styles.bottombar}>
        <Button title={'Processos'}  buttonStyle={styles.button} onPress={() => navigation.navigate('Processes') } />    
      </View>
      </>
  );
}


 /* return (
   
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}*/

const styles = StyleSheet.create({
  container: {
    flex: 2,
    backgroundColor: '#000',
    width: '100%',
    bottom : 0,
    padding:0
  },
  qr:
  {"bottom": 0, 
  "left": 0, 
  "position": "absolute", 
  "padding" : 0,
  "right": 0,
  "top": 0,
  "width":'100%'
  },
  button: {
    marginTop:0,
    marginBottom:0, 
    backgroundColor: '#000000', 
    height: 130, 
    width: '100%', 
    fontSize:50,
   
    borderColor: '#000000', 
    
    top:0
  },
  bottombar:{
    width: '100%',
    backgroundColor: '#000',
    justifyContent: 'space-between',
    height:130,
    bottom : 10,
    top:0,
    padding:0

  }
});