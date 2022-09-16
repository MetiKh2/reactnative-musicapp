import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import StartScreen from '../screens/StartScreen';
import { NavigationContainer } from '@react-navigation/native';
import LibraryScreen from './../screens/LibraryScreen/index';
import AudioScreen from '../screens/AudioScreen';

const Stack=createNativeStackNavigator();
export default function StackNavigator() {
  return (
    <NavigationContainer>
    <Stack.Navigator initialRouteName='StartScreen'>
      <Stack.Screen name='StartScreen' component={StartScreen} options={{headerShown:false}}></Stack.Screen>
      <Stack.Screen name='LibraryScreen' component={LibraryScreen} options={{headerShown:false}}></Stack.Screen>
      <Stack.Screen name='AudioScreen' component={AudioScreen} options={{headerShown:false}}></Stack.Screen>
    </Stack.Navigator>
    </NavigationContainer>
  )
}