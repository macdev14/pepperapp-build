import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { DynamicColorIOS, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import qrStart from "./components/qrStart";
import qrEnd from "./components/qrEnd";
import SignInScreen from './components/LoginScreen'
import Processes from "./components/Processes"
import Qtd from "./components/Qtd";
import Time from "./components/Time"
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator  initialRouteName="Login">
        <Stack.Screen name='Login' component={SignInScreen} options={{ headerLeft:null,  headerTintColor: '#fff',headerStyle: {
         backgroundColor: '#000'
      }, cardStyle: {
                backgroundColor: '#e0e0e0'
            } }}/>
        
        <Stack.Screen name='Qtd' component={Qtd} options={{title: 'Quantidade', headerTintColor: '#fff',headerStyle: {
         backgroundColor: '#000'
      }, cardStyle: {
                backgroundColor: '#e0e0e0'
            } }}/>

        <Stack.Screen name='Início' component={qrStart} options={{title: 'Início',  headerTintColor: '#fff',headerStyle: {
         backgroundColor: '#000'
      }, cardStyle: {
                backgroundColor: '#e0e0e0'
            } }} />
         <Stack.Screen name='Fim' component={qrEnd} options={{title: 'Fim',  headerTintColor: '#fff',headerStyle: {
         backgroundColor: '#000'
      }, cardStyle: {
                backgroundColor: '#e0e0e0'
            } }}/>
         <Stack.Screen name='Processes' component={Processes} options={{title: 'Processos', headerLeft:null,  headerTintColor: '#fff',headerStyle: {
         backgroundColor: '#000'
      }, cardStyle: {
                backgroundColor: '#e0e0e0'
            } }}/>
          <Stack.Screen name='Selecione' component={Time} options={{title: 'Selecione',  headerTintColor: '#fff',headerStyle: {
         backgroundColor: '#000'
      }, cardStyle: {
                backgroundColor: '#e0e0e0'
            } }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}


