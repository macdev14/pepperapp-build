import  React, {useContext, useState, useEffect} from 'react';
import { DynamicColorIOS, ActivityIndicator, StyleSheet, Text, View, AppRegistry, SafeAreaView, ScrollView, RefreshControl } from 'react-native';
import UserContext from "./Context";
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from "./api";
import {
    Input,
    Card,
    FormValidationMessage,
    Button,
    Badge
} from 'react-native-elements';

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
  
export function ServiceOrder({navigation}){
 const [data, setData] = useState(JSON.stringify({}))
 const [token_all, setToken_all] = useState(JSON.stringify({}))
 const [user_id, setUserId] = useState(JSON.stringify({}))
 const context = useContext(UserContext)



 const refreshLogin = async ()=> {
  let token_local = await AsyncStorage.getItem('token')
  const {refresh, user_id} = JSON.parse(token_local)
  //console.log("object token: " + refresh )
   api.post('api/token/refresh/', { refresh : refresh } ).then( (res) => {
    const store = { 
      token : res.data.access,
      refresh : refresh,
      user_id : user_id
    }
    //console.log("token refresh "+ refresh )
    AsyncStorage.setItem('token', JSON.stringify(store));
    api.get('api/osuserhist/?fim=""', { headers: { 'Authorization':  'Bearer ' + res.data.access } } ) .then(responseJson => {
      if (responseJson.messages){throw "Sessão Expirada"}
     
      setData(responseJson.data)
   
    }).catch(err => {      
      //console.log(err, err.response)
       context.signOut()
      });
  //  return store
  }  ).catch((err) => {console.log("MY ERROR: "+ err);  
  //console.log(err.request); 
})
return
 }
     


 useEffect(() => {

  refreshLogin()
    
 }, [])
 
 


    const Context = React.useContext(UserContext);
    const Style = { badgeStyle: {height: 30, width:100, borderRadius:30}, badgeText:{
      fontSize:15, color:'white'
    } }
    function reformatDate(dateStr)
{
  try{
    const dArr = dateStr.split("-");  // ex input "2010-01-18"
  return dArr[2]+ "/" +dArr[1]}
  catch (err){ return 'Nenhum' }
   //+ "/" +dArr[0].substring(2); //ex out: "18/01/10"
}
    return(
        <SafeAreaView style={styles.container}>
    
     
        <ScrollView style={StyleSheet.absoluteFill}  showsVerticalScrollIndicator ={false}
   showsHorizontalScrollIndicator={false}
   refreshControl={
    <RefreshControl
    
      onRefresh={refreshLogin}
    />
  }
   
   >
        

     {(Array.isArray(data))?(data.map((obj, i)=>(
       <Card borderRadius={10} style={{ textAlign:"left" }} key={i}>
       <Card.Title style={{ fontFamily:'Arial', color:"black", fontSize:25, textAlign:"left"  }}>
         <Text> O.S: {obj['os']['Numero_Os']}</Text>  {"\n"} <Text> Prazo: {reformatDate(obj.os.Prazo)} </Text>
          </Card.Title>
          
          <Card.FeaturedTitle>
          {(obj.fim)?(  
          <Badge badgeStyle={Style.badgeStyle} status="success" value={<Text style={Style.badgeText}>
          {(obj.colaborador == user_id )?( obj.fim ) : 'Finalizado'}</Text>} />):
          ( <Badge badgeStyle={Style.badgeStyle} status="error" value={<Text style={Style.badgeText}>{obj.inicio}</Text>}/>)}
          
          </Card.FeaturedTitle>
          
       </Card>
     )) ) : 
    (  <ActivityIndicator style={{marginTop:50}}/>  )}
             
        
        </ScrollView>
     </SafeAreaView>
    );
  }