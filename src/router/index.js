import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Splash, Home, Pemilihan, Akun} from '../pages';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const Router = () => {
  return (
    <Stack.Navigator initialRouteName="Splash">
      <Stack.Screen
        name="Splash"
        component={Splash}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="MainApp"
        component={MainApp}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

const MainApp = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Pemilihan" component={Pemilihan} />
      <Tab.Screen name="Akun" component={Akun} />
    </Tab.Navigator>
  );
};

export default Router;

const styles = StyleSheet.create({});
