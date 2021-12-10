import { StatusBar } from 'expo-status-bar';
import { PropTypes } from 'react'
import {ActivityIndicator, StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native';
import React, { useEffect, useState, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';
import { Ionicons } from '@expo/vector-icons';
import api from './api';
import UserContext from './Context'
import {
    Input,
    Card,
    FormValidationMessage,
    Button
} from 'react-native-elements';



export default class Time extends React.Component{
    static contextType = UserContext  
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
    //return this.props.navigation.navigate('Login');
   }


    getToken()
}
    logout(){
         AsyncStorage.removeItem('token');
         //return this.props.navigation.navigate('Login');
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

            <View style={styles.back}>
             
           
            <TouchableOpacity onPress={()=> that.props.navigation.navigate('Processes') } style={styles.button}>
            <Text style={{marginLeft:10, color:"#fff", marginTop:5 }} >Voltar</Text>
            <Ionicons name="arrow-back" size={54} color="white" />
            
             
         
                
                 </TouchableOpacity>
                 <Button
                    buttonStyle={{ marginTop: 50, height: 50, width:55, marginBottom:0 ,backgroundColor: '#ff0000' }}
                    title={'Sair'}
                    onPress={()=> that.context.signOut() }
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
      marginTop: 50, 
    
    },
    back: {
        paddingLeft:20,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        width:150,
        height:150,
        marginTop: 20, 
     
      
      },
    button:{
       
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        height: 80, 
        width:100, 
        marginBottom:0,
        backgroundColor: '#ffa000',
        borderRadius: 5
    },

})