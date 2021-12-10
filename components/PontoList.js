import  React, {useContext, useState, useEffect} from 'react';
import { DynamicColorIOS, StyleSheet, Text, View, AppRegistry, SafeAreaView, ScrollView, RefreshControl } from 'react-native';
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
  
export function PontoList({navigation}){
 const [data, setData] = useState(JSON.stringify({}))
 const context = useContext(UserContext)

     
 const fetch = async()=>{
  //await  getToken();
  let token = await context.retrieveToken()
  
 
  console.log("end: "+token)
  const allproc = await api.get('api/osuserhist/?fim=""', { headers: { 'Authorization':  'Bearer ' + token } } ) .then(responseJson => {
   if (responseJson.messages){throw "Sessão Expirada"}
   console.log(responseJson.data)
   setData(responseJson.data)
   //setData(Object.keys(responseJson.data).map((key) => [Number(key), responseJson.data[key]]))
   console.log("Objeto: "+data)
 }).catch(err => {
   console.log(err, err.response)
   AsyncStorage.removeItem('token');
   //return this.props.navigation.navigate('Login')
   });

}

 useEffect(() => {

    //fetch()
    
 }, [])
 
 


    const Context = React.useContext(UserContext);
    const Style = { badgeStyle: {height: 30, width:100, borderRadius:30}, badgeText:{
      fontSize:15, color:'white'
    } }
    function reformatDate(dateStr)
{
  const dArr = dateStr.split("-");  // ex input "2010-01-18"
  return dArr[2]+ "/" +dArr[1] //+ "/" +dArr[0].substring(2); //ex out: "18/01/10"
}
    return(
        <SafeAreaView style={styles.container}>
    
     
        <ScrollView style={StyleSheet.absoluteFill}  showsVerticalScrollIndicator ={false}
   showsHorizontalScrollIndicator={false}
   refreshControl={
    <RefreshControl
    
      onRefresh={fetch}
    />
  }
   
   >
        

     {(Array.isArray(data))?(data.map((obj)=>(
       <Card borderRadius={10} style={{ textAlign:"left" }}>
       <Card.Title style={{ fontFamily:'Arial', color:"black", fontSize:25, textAlign:"left"  }}>
         <Text> O.S: {obj['os']['Numero_Os']}</Text>  {"\n"} <Text> Prazo: {reformatDate(obj.os.Prazo)} </Text>
          </Card.Title>
          
          <Card.FeaturedTitle>
          {(obj.fim!="")?(  <Badge badgeStyle={Style.badgeStyle} status="success" value={<Text style={Style.badgeText}>{(obj.id_func == obj.id_func_fim)?( obj.fim ) : 'Finalizado'}</Text>} />):( <Badge badgeStyle={Style.badgeStyle} status="error" value={<Text style={Style.badgeText}>{obj.inicio}</Text>}/>)}
          
          </Card.FeaturedTitle>
          
       </Card>
     )) ) : <Text> Não há o.s </Text>  }
             
        
        </ScrollView>
     </SafeAreaView>
    );
  }