import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, Image, Dimensions} from 'react-native';
import {MainContent, BerandaList} from '../../components';
import {HInput, HButton, AsyncTest} from '../../components';
import {RaiseHand} from '../../assets';
import jwt_decode from 'jwt-decode';
import {getByKey, checkLogin} from '../../Utils/asyncstorage';
import {useNavigation} from '@react-navigation/native';
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
  }

  useEffect(() => {
    if (route.params?.loaded) {
      console.log('TAB - Timeline');
      getByKey('token', false)
        .then(function (res) {
          if (res) {
            console.log('Masih Login.');
            ajax(route.params.URL + 'mobile/api/', {
              operation: 'getBerita',
              token: res,
            })
              .then(function (res2) {
                res2 = JSON.parse(res2);
                console.log(res2.list);
                if (res2.list) {
                  console.log('Lists Updated');
                  setBerita(res2.list);
                  setIsBusy(false);
                } else {
                  // Tidak ada Kandidat
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
    }
  }, [route.params?.loaded]);
  useEffect(() => {
    getByKey('token', false)
      .then(function (res) {
        let res_enc = res;
        if (res) {
          res = jwt_decode(res);
          if (res.data.nama) {
            setNama(res.data.nama + route.params.URL);
          }
        }
      })
      .catch(function (res) {
        console.log(res);
      });
  }, []);
  return (
    <MainContent headerText="Beranda">
      {/* <AsyncTest /> */}
      {!isBusy && (
        <>
          <BerandaList data={berita} />
          {/* <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              paddingTop: windowWidth * 0.3,
            }}>
            <View>
              <Image source={RaiseHand} style={styles.headerLogo} />
            </View>
            <Text style={styles.bodyText}>Halo{nama ? ', ' + nama : ''}</Text>
            <Text style={styles.bodyText}>
              Selamat datang di Aplikasi PEMILU-M ULM
            </Text>
          </View> */}
        </>
      )}
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
