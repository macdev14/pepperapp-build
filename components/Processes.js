import { StatusBar } from 'expo-status-bar';
import { PropTypes } from 'react'
import {ActivityIndicator, StyleSheet, Text, View,  SafeAreaView, ScrollView , RefreshControl } from 'react-native';
import Constants from 'expo-constants';
import React, { useEffect, useState, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import api from './api';
import UserContext from './Context'
import {
    Input,
    Card,
    FormValidationMessage,
    Button
} from 'react-native-elements';



class Processes extends React.Component{
  static contextType = UserContext

  constructor(props) {
   
    super(props);
    this.state = { isLoading: true, Token:'', Processes:'' };
  //  this.props = this.props.bind(this);
 //   this.setState = this.setState.bind(this);
  };
   
  Drawer = createDrawerNavigator(); 
  componentDidMount() {
   
  //   const getToken = async () =>{
  //      const tok = await AsyncStorage.getItem('token');
      
  //      if (tok) {
  //   return this.setState({ Token: tok })
  //   }else{
  //   //AsyncStorage.removeItem('token');
  //   //return this.props.navigation.navigate('Login');
  //   this.context.signOut()
  //   }
  //  }
  
   
  
    const refreshLogin = async() =>{
      const token = await AsyncStorage.getItem('token') ?? this.context.signOut()
      try {
        
      
      const tok = JSON.parse(token)
      api.post('api/refresh/', { refresh : tok.refresh} ).then( (res) => {
        const store = { 
          token : res.data.access,
          refresh : tok.refresh,
          user_id : tok.user_id
        }
        //console.log("token refresh "+ tok.refresh )
       //
       api.get('api/process/', { headers: { 'Authorization':  'Bearer ' + res.data.access } } ) .then(responseJson => {
       // if (responseJson.messages){console.log(responseJson.messages); throw "Sessão Expirada"}
        //console.log(responseJson.data)
        return this.setState(
          {
            isLoading: false,
            Processes: responseJson.data,
            Token: JSON.stringify(store)
          },
          //function() {}
        );
      }).catch(err => {
        //console.log(err, err.response)
        return this.context.signOut()
        });
      AsyncStorage.setItem('token', JSON.stringify(store));
       
      }  ).catch( (err) => {
        //console.log(err); 
         return this.context.signOut()} )

        } catch (error) {
          this.context.signOut()
        }

    }
  
   
    

   refreshLogin()
    
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
       refreshControl={
        <RefreshControl
        
          onRefresh={that.refreshLogin}
        />}
  showsHorizontalScrollIndicator={false}>
            <Card titleStyle={{height: 200}} >
                {that.state.Processes.map(function(object, i){
        return  <Button
                    buttonStyle={{ margin: 10, marginTop: 50, marginBottom:50,height: 100, backgroundColor: '#000000'}}
                    title={object.name}
                    onPress={()=>  that.props.navigation.navigate('Selecione', {idProc: object.id, nome: object.name}) } key={i}
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