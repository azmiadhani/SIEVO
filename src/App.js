import React, {useEffect} from 'react';
import {StyleSheet, Text, View, Alert} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import Router from './router';
import messaging from '@react-native-firebase/messaging';
const App = () => {
  useEffect(() => {
    messaging()
      .getToken()
      .then((token) => {
        console.log(token);
      });

    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    return unsubscribe;
  }, []);
  return (
    <NavigationContainer>
      <Router />
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({});
