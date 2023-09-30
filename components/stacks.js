import  React, {useState, useEffect} from 'react';
import { DynamicColorIOS, StyleSheet, Text, View, AppRegistry } from 'react-native';
import { NavigationContainer, getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createBottomTabNavigator, BottomTabBar } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { ServiceOrder } from './ServiceOrder';
import QrStart from "./QrStart";
import QrEnd from "./QrEnd";
import api from "./api";
import SignInScreen from './LoginScreen';
import Processes from "./Processes";
import { Ponto } from "./Ponto"
import { PontoList} from "./PontoList"
import Qtd from "./Qtd";
import Time from "./Time";
import { Ionicons, AntDesign, MaterialIcons } from "@expo/vector-icons";
import UserContext from "./Context";
const Stack = createStackNavigator();
const MainStack = createStackNavigator();
const Tabs = createBottomTabNavigator();
const Drawer = createDrawerNavigator();
const ServiceOrderStack = createStackNavigator();
const PontoTabs = createBottomTabNavigator();
const PontoListStack = createStackNavigator();
const PontoRegisterStack = createStackNavigator();
const getHeaderTitle = (route) => {
  //console.log("Route obj: "+ JSON.stringify(route))
    const routeName = getFocusedRouteNameFromRoute(route);
    //console.log(route.name)
    
    
    switch (routeName) {
      case 'StackTabs':
        return 'Processos';
      case 'Processos':
        return 'Processos';
      case 'Processo':
        return 'Processos';
      case 'ServiceStack':
        return 'Ordem de Serviços';
      case 'Redirect':
        return 'Redirect';
    }
  
}

function PontoRegisterStackNav(){
  return (
  <PontoRegisterStack.Navigator screenOptions={{ tabBarStyle: { backgroundColor: '#000' }, headerShown: false }}>
<PontoRegisterStack.Screen component={Ponto} name="Ponto"/>
  </PontoRegisterStack.Navigator>
  )
}

function PontoListStackNav(){
  return (
  <PontoListStack.Navigator screenOptions={{ tabBarStyle: { backgroundColor: '#000' }, headerShown: false }}>
<PontoListStack.Screen component={PontoList} name="PontoList"/>
  </PontoListStack.Navigator>
  )
}

export function PontoTabsNavigator() {
  return ( <PontoTabs.Navigator screenOptions={{ tabBarStyle: { backgroundColor: '#000' }, headerShown: false }}>
 <PontoTabs.Screen component={PontoRegisterStackNav} name="PontoRegisterStack"
 options={{
  tabBarLabel: ({focus})=>{
    return <Text style={{color: "#fff"}}>Ponto</Text>
  },
  tabBarIcon: ({ color, size }) => (
    <AntDesign name="idcard" color={'#fff'} size={size} />
  ),
}}
 />
 <PontoTabs.Screen component={PontoListStackNav} name="PontoListStack"
 options={{
  tabBarLabel: ({focus})=>{
    return <Text style={{color: "#fff"}}>Histórico</Text>
  },
  tabBarIcon: ({ color, size }) => (
    <MaterialIcons name="history-toggle-off" color={'#fff'} size={size} />
  ),
}}
 
 />
  </PontoTabs.Navigator>
  )
}
  
  export function TabStackNavigator() {
    return(<Tabs.Navigator screenOptions={{ tabBarStyle: { backgroundColor: '#000' }, headerShown: false }}>
      <Tabs.Screen component={ProcessesStack} name="Processo" options={{
        tabBarLabel: ({focus})=>{
          return <Text style={{color: "#fff"}}>Processos</Text>
        },
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="hammer-outline" color={'#fff'} size={size} />
        ),
      }}/>
  
  <Tabs.Screen component={ServiceStack} name="ServiceStack" options={{
        tabBarLabel: ({focus})=>{
          return <Text style={{color: "#fff"}}>Ordem de Serviços</Text>
        },
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="ios-newspaper-outline" color={'#fff'} size={size} />
        ),
      }}/>
  
    </Tabs.Navigator>)
  }
  
  export function RootStack({navigation}){
    return(<MainStack.Navigator screenOptions={{ headerShown: true }}>
      <MainStack.Screen component={TabStackNavigator} name="StackTabs"
      options={({route}) => ({
        headerTitle: getHeaderTitle(route),
        // headerLeft: () => (
        //   <NavigationDrawerStructure
        //     navigationProps={navigation}
        //   />
        // ),
        headerStyle: {
          backgroundColor: '#000', //Set Header color
        },
        headerTintColor: '#fff', //Set Header text color
        headerTitleStyle: {
          fontWeight: 'bold', //Set Header text style
        },
      })}
      />
    </MainStack.Navigator>)
  }
  
  export function DrawerStack(){
    return (<Drawer.Navigator>
      <Drawer.Screen component={RootStack} name="Processos" options={({route}) => ({headerTitle:"Processos & O.S", headerTintColor: '#fff', drawerActiveTintColor:'#000', headerStyle: {backgroundColor: "#000"}  })}
      />
       <Drawer.Screen component={PontoTabsNavigator} name="Ponto" options={({route}) => ({headerTitle:"Ponto", headerTintColor: '#fff', drawerActiveTintColor:'#000', headerStyle: {backgroundColor: "#000"}  })}
      />
    </Drawer.Navigator>)
  }
  
  export function ProcessesStack(){
    return(
      <Stack.Navigator  screenOptions={{ headerShown: false }} initialRouteName="Processes">
          
          
          <Stack.Screen name='Qtd' component={Qtd} options={{title: 'Quantidade', headerTintColor: '#fff',headerStyle: {
           backgroundColor: '#000'
        }, cardStyle: {
                  backgroundColor: '#fff'
              } }}/>
  
          <Stack.Screen name='Início' component={QrStart} options={{title: 'Início',  headerTintColor: '#fff',headerStyle: {
           backgroundColor: '#000'
        }, cardStyle: {
                  backgroundColor: '#e0e0e0'
              } }} />
           <Stack.Screen name='Fim' component={QrEnd} options={{title: 'Fim',  headerTintColor: '#fff',headerStyle: {
           backgroundColor: '#000'
        }, cardStyle: {
                  backgroundColor: '#e0e0e0'
              } }}/>
           <Stack.Screen name='Processes' component={Processes} options={{title: 'Processos', headerLeft:null,  headerTintColor: '#fff',headerStyle: {
           backgroundColor: '#e0e0e0'
        }, cardStyle: {
                  backgroundColor: '#fff'
              } }}/>
            <Stack.Screen name='Selecione' component={Time} options={{title: 'Selecione',  headerTintColor: '#fff',headerStyle: {
           backgroundColor: '#000'
        }, cardStyle: {
                  backgroundColor: '#e0e0e0'
              } }}/>
        </Stack.Navigator>
    )
  }
  
  export function LoginStack (){
    return(
      <Stack.Navigator>  
      <Stack.Screen name='Login' component={SignInScreen} options={{ headerLeft:null,  headerTintColor: '#fff',headerStyle: {
       backgroundColor: '#000'
    }, cardStyle: {
              backgroundColor: '#fff'
          } }}/>
        </Stack.Navigator>
    )
  }
  



  export function ServiceStack(){
    return (
    <ServiceOrderStack.Navigator  screenOptions={{ headerShown: false }}>
  <ServiceOrderStack.Screen component={ServiceOrder} name="ordemdeservico"/>
    </ServiceOrderStack.Navigator>
    )
  }
  
  const RootStackNav = createStackNavigator();
  const RootStackScreen = ({ userToken }) => (
    <RootStackNav.Navigator headerMode="none">
      {userToken ? (
        <RootStackNav.Screen
          name="App"
          component={RootStack}
          userToken={userToken}
          options={{
            animationEnabled: false
          }}
        />
      ) : (
        <RootStackNav.Screen
          name="Auth"
          component={LoginStack}
          options={{
            animationEnabled: false
          }}
        />
      )}
    </RootStackNav.Navigator>
  );
export default RootStackScreen;