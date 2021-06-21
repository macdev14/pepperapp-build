import { StatusBar } from 'expo-status-bar';
import { PropTypes } from 'react'
import {ActivityIndicator, StyleSheet, Text, View,  SafeAreaView, ScrollView  } from 'react-native';
import Constants from 'expo-constants';
import React, { useEffect, useState, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import api from './api';
import {
    Input,
    Card,
    FormValidationMessage,
    Button
} from 'react-native-elements';



class Processes extends React.Component{
     constructor(props) {
   
    super(props);
    this.state = { isLoading: true, Token:'', Processes:'' };
  //  this.props = this.props.bind(this);
 //   this.setState = this.setState.bind(this);
  };
  Drawer = createDrawerNavigator(); 
  componentDidMount() {
    
    const getToken = async () =>{
       const tok = await AsyncStorage.getItem('token');
      
       if (tok) {
    return this.setState({ Token: tok })
    }else{
    AsyncStorage.removeItem('token');
    return this.props.navigation.navigate('Login');
    }
   }
  
   
  
    
  
   
    const fetch = async()=>{
       await  getToken();
       let token  = this.state.Token
       //console.log(token)
       const allproc = await api.get('api/processos/', { headers: { 'Authorization':  'Bearer ' + token } } ) .then(responseJson => {
        if (responseJson.messages){throw "Sessão Expirada"}
        this.setState(
          {
            isLoading: false,
            Processes: responseJson.data,
          },
          function() {}
        );
      }).catch(err => {
        console.log(err, err.response)
        AsyncStorage.removeItem('token');
        return this.props.navigation.navigate('Login')
        });
   
   }

   fetch()
    
  //console.log(this.state.Token)
   
  }
   

   render() {
     
       var that = this; 
        if (that.state.isLoading) {
      return (
        <View style={{ flex: 1, padding: 20 }}>
          <ActivityIndicator />
        </View>
      );
    }
return (
  <SafeAreaView style={styles.container}>
    
     
       <ScrollView style={StyleSheet.absoluteFill}  showsVerticalScrollIndicator ={false}
  showsHorizontalScrollIndicator={false}>
            <Card titleStyle={{height: 200}} >
                {that.state.Processes.map(function(object, i){
        return  <Button
                    buttonStyle={{ margin: 10, marginTop: 50, marginBottom:50,height: 100, backgroundColor: '#000000'}}
                    title={object.procname}
                    onPress={()=>  that.props.navigation.navigate('Selecione', {idProc: object.id, nome: object.procname}) } key={i}
                />
    })}
               
               
            </Card>
       
       </ScrollView>
    </SafeAreaView>
)
  }

  
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
    marginTop:0,
  },
  scrollView: {
   
   
  },
  text: {
    fontSize: 42,
  },
});





/*const Processes = ({ navigation }) => {
     
    

    const [Token, setToken] = useState('')
    
   
  
  const [allProcesses, setProcess] = useState();


  if (typeof allproc=='undefined'){
      const allproc = api.get('api/processos', { headers: { 'Authorization':  `${Token}` }} ).catch(err => {console.log(err)});
      if (allproc){ setProcess(allproc.data)}
      
  }
  
 
   
   if (allProcesses== null){return null}

   


    return (
       
    );


    
    


};
*/
export default Processes;