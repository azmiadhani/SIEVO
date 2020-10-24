import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, Image, Dimensions} from 'react-native';
import {MainContent, BerandaList, M} from '../../components';
import {HInput, HButton, AsyncTest} from '../../components';
import {RaiseHand} from '../../assets';
import jwt_decode from 'jwt-decode';
import {getByKey, checkLogin} from '../../Utils/asyncstorage';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
const Beranda = ({route}) => {
  const navigation = useNavigation();
  const [nama, setNama] = useState('');
  const [berita, setBerita] = useState('');
  const [isBusy, setIsBusy] = useState(true);
  function ajax(url, pkg) {
    // resource : https://stackoverflow.com/questions/14220321/how-do-i-return-the-response-from-an-asynchronous-call
    // `delay` returns a promise
    return new Promise(function (resolve, reject) {
      // Only `delay` is able to resolve or reject the promise
      var xhr = new XMLHttpRequest();
      xhr.open('post', url, true);
      xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
      xhr.send(JSON.stringify(pkg));
      xhr.onload = function () {
        resolve(this.response);
      };
      xhr.onerror = reject;
    });
  }
  useFocusEffect(
    React.useCallback(() => {
      // Do something when the screen is focused
      console.log('TAB - Beranda');
      getByKey('token', false)
        .then(function (res) {
          if (res) {
            ajax(route.params.URL + 'mobile/api/', {
              operation: 'getBerita',
              token: res,
            })
              .then(function (res2) {
                res2 = JSON.parse(res2);
                if (res2.list) {
                  setBerita(res2.list);
                  setIsBusy(false);
                } else {
                  console.log('Tidak ada List');
                }
              })
              .catch(function (res) {
                console.log(res);
              });
          } else {
            navigation.replace('Login');
          }
        })
        .catch(function (res) {
          console.log(res);
        });
      return () => {
        // Do something when the screen is unfocused
        // Useful for cleanup functions
      };
    }, []),
  );

  return (
    <MainContent headerText="Beranda">
      {/* <AsyncTest /> */}
      {!isBusy && <BerandaList data={berita} />}
    </MainContent>
  );
};

export default Beranda;

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  headerLogo: {
    height: windowHeight * 0.15,
    resizeMode: 'contain',
  },
  bodyText: {
    fontSize: 16,
    fontFamily: 'Cabin-Regular',
  },
});
