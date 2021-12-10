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


export default function qrEnd({ route, navigation }) {
  const context = useContext(UserContext)
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [modalVisible, setmodalVisible] = useState(false)
  const [Token, setToken] = useState('');
  const [userId, setUserId] = useState('')
  //const [ocorrencia, setOcorrencia]
  const { idProc } = route.params;
   useEffect(() => {

    // const getToken = async () =>{
    //    const tok = await AsyncStorage.getItem('token');
    //    if (tok !== null) {
    // return setToken(tok)
    // }
    // return context.signOut()
    // }
   
    (async () => {
      await context.retrieveToken()
      const user_id = await context.retrieveIdFuncionario()
      setUserId(user_id)

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
    let id = data;
    
    (data.includes('http') && data.includes('.com')) ? (navigation.navigate('Qtd', {idProc: idProc, osid: id, timeType: 'fim'}))  : (alert('Ordem de Serviço inválida'))
      
    /*(api.post('api/processos/fim', { osid: [{url : id}] , idProc: idProc, horario: curTime, ocorrencias : ocorrencia}, { headers: { 'Authorization':  `${Token}` } } ).then((res)=>{
         
          alert(res.data);
           navigation.navigate('Processes');
              
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
        style={StyleSheet.absoluteFillObject}
      />
    
    
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
   bottombar:{
    width: '100%',
    backgroundColor: '#000',
    justifyContent: 'space-between',
    height:130,
    bottom : 10,
    top:0,
    padding:0

  },
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
   
    
    backgroundColor: '#000000', 
    height: 130, 
    width: '100%', 
    fontSize:50, 
  
    }
});