import React, {useEffect} from 'react';
import {StyleSheet, Text, View, Alert} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import Router from './router';
import messaging from '@react-native-firebase/messaging';
import {
  storeData,
  getByKey,
  removeAllData,
  getAllKeys,
} from '../src/Utils/asyncstorage';
const App = () => {
  const ajax = (url, pkg) => {
    // resource : https://stackoverflow.com/questions/14220321/how-do-i-return-the-response-from-an-asynchronous-call
    // `delay` returns a promise
    return new Promise(function (resolve, reject) {
      // Only `delay` is able to resolve or reject the promise
      console.log(pkg);

      var xhr = new XMLHttpRequest();
      xhr.open('post', url, true);
      xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
      xhr.send(JSON.stringify(pkg));
      xhr.onload = function () {
        resolve(this.response);
      };
      xhr.onerror = reject;
    });
  };
  const sendTokenFB = (token) => {
    console.log('Kirim ke DB');
    ajax(URL_DOMAIN + 'mobile/api', {
      operation: 'deviceTokenStore',
      tokenFB: token,
    })
      .then(function (res) {
        res = JSON.parse(res);
        console.log(res);
        if (res.status) {
          storeData('tokenFB', token);
          console.log(res.keterangan);
        } else {
          console.log(res.keterangan);
        }
      })
      .catch(function (res) {
        console.log(res);
      });
    console.log('Store Token ke Async');
  };
  useEffect(() => {
    console.log('app loaded');
    messaging()
      .getToken()
      .then((token) => {
        // console.log(token);
        getByKey('tokenFB', false)
          .then(function (res) {
            if (!res) {
              sendTokenFB(token);
            }
            console.log('GBK ' + res);
          })
          .catch(function (res) {
            console.log('GBK ' + res);
          });
      });
    const subscribe = messaging()
      .subscribeToTopic('pemilihan2020')
      .then(() => console.log('Subscribed to topic!'));
    // const unsubscribe = messaging().onMessage(async (remoteMessage) => {
    //   Alert.alert(
    //     remoteMessage.notification.title,
    //     remoteMessage.notification.body,
    //   );
    // });

    // return subscribe;
  }, []);
  return (
    <NavigationContainer>
      <Router />
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({});
