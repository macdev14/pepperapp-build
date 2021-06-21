import { StatusBar } from 'expo-status-bar';
import { PropTypes } from 'react'
import {ActivityIndicator, StyleSheet, Text, View, Dimensions } from 'react-native';
import React, { useEffect, useState, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';
import api from './api';
import {
    Input,
    Card,
    FormValidationMessage,
    Button
} from 'react-native-elements';



export default class Time extends React.Component{
   
     constructor(props) {
   
    super(props);
    this.state = { isLoading: false, Token:'', idProc: this.props.route.params.idProc, nome: this.props.route.params.nome,  };
  //  this.props = this.props.bind(this);
 //   this.setState = this.setState.bind(this);
  };

componentDidMount(){
  this.props.navigation.setOptions({ title: this.state.nome });
  const getToken = async () =>{
       const tok = await AsyncStorage.getItem('token');
       if (tok !== null) {
    return  this.setState({ Token: tok })
    }
    AsyncStorage.removeItem('token');
    return this.props.navigation.navigate('Login');
   }


    getToken()
}
    logout(){
         AsyncStorage.removeItem('token');
         return this.props.navigation.navigate('Login');
    }
    render(){
        var that = this;
        return(
        <View style={{marginTop:Constants.statusBarHeight}}>
            <Card titleStyle={{height: 200}} >
                
      <Button
                    buttonStyle={{ height: 100, backgroundColor: '#000000'}}
                    title={'Inicio'}
                    onPress={()=> that.props.navigation.navigate('Início', { idProc: that.state.idProc}) } 
                />
               
      <Button
                    buttonStyle={{ marginTop: 50, height: 100,  backgroundColor: '#000000' }}
                    title={'Fim'}
                    onPress={()=> that.props.navigation.navigate('Fim', { idProc: that.state.idProc}) }
                />
               
               
            </Card>
           <View style={styles.container}>
              <Button
                    buttonStyle={{ margin: 10, marginTop: 50, height: 50, width:50, marginBottom:10 ,backgroundColor: '#ff0000' }}
                    title={'Sair'}
                    onPress={()=> this.logout() }
                />
           </View>
        </View>)
    }
    
}

const styles = StyleSheet.create({
    container: {
      
      justifyContent: 'center',
      alignItems: 'center',
      width:100,
      height:50,
      marginTop: 100, 
    
    }})