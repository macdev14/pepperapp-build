import { Modal, Platform, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState, useContext } from 'react';
import { BarCodeScanner } from 'expo-barcode-scanner';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from './api';
import {
    Input,
    Card,
    FormValidationMessage,
    Button
} from 'react-native-elements';


export default function qrStart({ route, navigation }) {

  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [modalVisible, setmodalVisible] = useState(false)
  const [Token, setToken] = useState('');
  const { idProc } = route.params;
  console.log(idProc)
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
      console.log(Token)
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
    console.log(curTime);
    console.log(Token)
    let id = data.replace(/[^0-9]/g,"");
    if (isNaN(parseInt(id))){
      alert('O.S inválida!')
    }else{
    return (api.post('api/processos/inicio', { osid: id, idProc: idProc, horario: curTime}, { headers: { 'Authorization':  `${Token}` } } ).then((res)=>{
         
           return alert(res.data)
              
           }
       ).catch((err)=>{ return alert(err) }))
  };
  };

  if (hasPermission === null) {
    return   <Text>No access to camera</Text>
  }
  if (hasPermission === false) {
    return   <Text>No access to camera</Text>
  }




  return (
    <View style={styles.container}>
   
     

    
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
       {scanned && <Button title={'Escanear Novamente'}  buttonStyle={{backgroundColor: '#000000', height: 130, width: 500}} onPress={() => setScanned(false)} />}
       <View style={{width: 500, height: 650}}>
        <Button title={'Processos'}  buttonStyle={{marginTop:490,marginBottom:10, backgroundColor: '#000000', height: 130, width: 500, fontSize:50, borderWidth: 0.5,borderColor: 'black', borderRadius:20}} onPress={() => navigation.navigate('Processes') } />
       
       
      </View>
    </View>
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
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});