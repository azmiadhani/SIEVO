import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Alert,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import Router from './router';
import messaging from '@react-native-firebase/messaging';
import {
  storeData,
  getByKey,
  removeAllData,
  getAllKeys,
} from '../src/Utils/asyncstorage';
import {URL_DOMAIN, URL_JSON_API} from '../src/Utils/constant';
import axios from 'axios';
import ConnectionError from '../src/pages/ConnectionError';
const App = () => {
  const [getUrl, setGetUrl] = useState('loading');
  const [urlError, setUrlError] = useState('loading');
  const [theError, setTheError] = useState('');
  const get_url = () => {
    // resource : https://stackoverflow.com/questions/14220321/how-do-i-return-the-response-from-an-asynchronous-call
    // `delay` returns a promise
    console.log('submit_ajax');

    return new Promise(function (resolve, reject) {
      // Make a request for a user with a given ID
      axios
        .get(URL_JSON_API)
        .then(function (response) {
          // handle success
          resolve(response.data);
        })
        .catch(function (error) {
          // handle error
          // console.log('err -->' + error);
          reject('' + error);
        })
        .then(function () {
          // always executed
        });
    });
  };

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
    get_url()
      .then(function (res_url) {
        if (res_url.URL_DOMAIN) {
          console.log('get_url() --> ' + res_url);
          setGetUrl(true);
          storeData('BASE_URL', res_url.URL_DOMAIN);

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
        } else {
          setTheError('Error : URL utama tidak tersedia');
          setUrlError(true);
        }
      })
      .catch(function (res) {
        console.log('get_url() --> ' + res);
        setUrlError(true);
        setTheError('Error : ' + res);
      });
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
      {getUrl == true && <Router />}
      {getUrl == 'loading' && (
        <View
          style={{
            backgroundColor: '#ffffff',
            height: windowHeight * 1,
          }}>
          <ConnectionError />
          <View
            style={{
              alignItems: 'center',
              paddingRight: windowWidth * 0.05,
              paddingLeft: windowWidth * 0.05,
            }}>
            {urlError == true && (
              <TouchableOpacity
                onPress={() => {
                  Alert.alert(
                    '',
                    theError,
                    [
                      {
                        text: 'OK',
                        onPress: () => {},
                      },
                    ],
                    {
                      cancelable: false,
                    },
                  );
                }}>
                <Text style={{textAlign: 'center'}}>
                  Terjadi kesalahan pada koneksi ke server, coba lagi nanti!
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      )}
    </NavigationContainer>
  );
};

export default App;
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({});
