import { StatusBar } from 'expo-status-bar';
import { PropTypes } from 'react'
import {ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
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
   
  componentDidMount() {
    
    const getToken = async () =>{
       const tok = await AsyncStorage.getItem('token');
       if (tok !== null) {
    return  this.setState({ Token: tok })
    }
    return this.props.navigation.navigate('Login');
   }
  
   
  
    
  
   
    const fetch= async()=>{
       await  getToken();
       const allproc = await api.get('api/processos', { headers: { 'Authorization':  `${this.state.Token}` }} ) .then(responseJson => {
        this.setState(
          {
            isLoading: false,
            Processes: responseJson.data,
          },
          function() {}
        );
      }).catch(err => {return this.props.navigation.navigate('Login')});
   
   }

   fetch()
    
  console.log(this.state.Token)
   
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
       <View>
            <Card titleStyle={{height: 200}} >
                {that.state.Processes.map(function(object, i){
        return  <Button
                    buttonStyle={{ margin: 10, marginTop: 50, height: 100 }}
                    title={object.Nome}
                    onPress={()=> that.props.navigation.navigate('Selecione', {idProc: object.ID}) } key={i}
                />
    })}
               
               
            </Card>
        </View>
)
  }

  
}





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