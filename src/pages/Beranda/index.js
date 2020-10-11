import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, Image, Dimensions} from 'react-native';
import {MainContent} from '../../components';
import {HInput, HButton, AsyncTest} from '../../components';
import {RaiseHand} from '../../assets';
import {getByKey} from '../../Utils/asyncstorage';
import jwt_decode from 'jwt-decode';
const Beranda = () => {
  const [nama, setNama] = useState('');
  useEffect(() => {
    getByKey('token', false)
      .then(function (res) {
        let res_enc = res;
        if (res) {
          res = jwt_decode(res);
          if (res.data.nama) {
            setNama(res.data.nama);
          }
        }
      })
      .catch(function (res) {
        console.log(res);
      });
    console.log('akun loaded');
  }, []);
  return (
    <View>
      <MainContent headerText="Beranda">
        {/* <AsyncTest /> */}
        <View
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
        </View>
      </MainContent>
    </View>
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
