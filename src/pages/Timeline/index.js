import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';
import {MainContent} from '../../components';
import {checkLogin} from '../../Utils/asyncstorage';
import {useNavigation} from '@react-navigation/native';

const Timeline = ({route}) => {
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
      <MainContent headerText="Timeline"></MainContent>
    </View>
  );
};

export default Timeline;

const styles = StyleSheet.create({});
