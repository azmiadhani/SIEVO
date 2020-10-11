import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {checkLogin} from '../../Utils/asyncstorage';
import {useNavigation} from '@react-navigation/native';
const Pemilihan = ({route}) => {
  const navigation = useNavigation();
  useEffect(() => {
    if (route.params?.loaded) {
      console.log('TAB - Beranda');
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
  return (
    <View>
      <Text>Pemilihan</Text>
    </View>
  );
};

export default Pemilihan;

const styles = StyleSheet.create({});
