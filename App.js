import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import qrStart from "./components/qrStart";
import qrEnd from "./components/qrEnd";
import SignInScreen from './components/LoginScreen'
import Processes from "./components/Processes"
import Time from "./components/Time"
const Stack = createStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator  initialRouteName="Login">
        <Stack.Screen name='Login' component={SignInScreen} />
        <Stack.Screen name='Início' component={qrStart} />
         <Stack.Screen name='Fim' component={qrEnd} />
         <Stack.Screen name='Processes' component={Processes} />
          <Stack.Screen name='Selecione' component={Time} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


