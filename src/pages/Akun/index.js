import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, Dimensions} from 'react-native';
import {MainContent, HField, HButton, AsyncTest} from '../../components';
import {
  storeData,
  getByKey,
  removeAllData,
  getAllKeys,
  checkLogin,
} from '../../Utils/asyncstorage';
import {URL_API_MAINAPP} from '../../Utils/constant';
import jwt_decode from 'jwt-decode';
import {useNavigation} from '@react-navigation/native';

function ajax(url, pkg) {
  // resource : https://stackoverflow.com/questions/14220321/how-do-i-return-the-response-from-an-asynchronous-call
  // `delay` returns a promise
  return new Promise(function (resolve, reject) {
    // Only `delay` is able to resolve or reject the promise
    // console.log(pkg);
    // pkg = new FormData(pkg);
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
const Akun = ({route}) => {
  const navigation = useNavigation();
  const [nim, setNim] = useState('-');
  const [nama, setNama] = useState('-');
  const [prodi, setProdi] = useState('-');
  const [fak, setFak] = useState('-');
  const [response, setResponse] = useState('-');
  const [refresh, setRefresh] = useState('');
  // jika ada param refresh
  useEffect(() => {
    if (route.params?.loaded) {
      console.log('TAB - Akun');
      checkLogin()
        .then(function (res) {
          if (res) {
            console.log('Masih Login.');
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
    console.log(route);
    getByKey('token', false)
      .then(function (res) {
        // console.log(res);
        if (res) {
          let res_enc = res;
          res = jwt_decode(res);
          res.data.username ? setNim(res.data.username) : setNim('');
          res.data.nama ? setNama(res.data.nama) : setNama('');
          res.data.prodiNama ? setProdi(res.data.prodiNama) : setProdi('');
          res.data.fakultasNama ? setFak(res.data.fakultasNama) : setFak('');
          // console.log(res.data);
        } else {
          console.log(refresh);
          navigation.replace('Login');
        }
      })
      .catch(function (res) {
        console.log(res);
      });
    // console.log('akun loaded');
  }, [refresh]);
  return (
    <View>
      <MainContent headerText="Profil Pemilih">
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <View
            style={{
              width: windowWidth * 0.8,
              // height: windowHeight * 0.7,
            }}>
            <AsyncTest />
            <HField label="Nomor Induk Mahasiswa" isi={nim} />
            <HField label="Nama" isi={nama} />
            <HField label="Program Studi" isi={prodi} />
            <HField label="Fakultas" isi={fak} />
            <View style={{paddingTop: 10}}>
              <HButton
                label="Logout"
                onPress={() => {
                  removeAllData().then(function () {
                    setRefresh(Math.random());
                  });
                  // console.log(refresh);
                }}
              />
            </View>
            {/* <HField label="Response" isi={response} /> */}
          </View>
        </View>
      </MainContent>
    </View>
  );
};

export default Akun;

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  bodyText: {
    fontSize: 16,
    fontFamily: 'Cabin-Regular',
    padding: 5,
  },
});
