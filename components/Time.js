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



export default class Time extends React.Component{
   
     constructor(props) {
   
    super(props);
    this.state = { isLoading: false, Token:'', idProc: this.props.route.params.idProc };
  //  this.props = this.props.bind(this);
 //   this.setState = this.setState.bind(this);
  };

componentDidMount(){
  const getToken = async () =>{
       const tok = await AsyncStorage.getItem('token');
       if (tok !== null) {
    return  this.setState({ Token: tok })
    }
    return this.props.navigation.navigate('Login');
   }


    getToken()
}

    render(){
        var that = this;
        return(
         <View>
            <Card titleStyle={{height: 200}} >
                
      <Button
                    buttonStyle={{ margin: 10, marginTop: 50, height: 100 }}
                    title={'Inicio'}
                    onPress={()=> that.props.navigation.navigate('Início', { idProc: that.state.idProc}) } 
                />
               
      <Button
                    buttonStyle={{ margin: 10, marginTop: 50, height: 100 }}
                    title={'Fim'}
                    onPress={()=> that.props.navigation.navigate('Fim', { idProc: that.state.idProc}) }
                />
               
               
            </Card>
        </View>)
    }
}

