import React, {useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';

const Akun = (props) => {
  useEffect(() => {
    console.log('akun loaded');
  }, [])
  return (
    <View>
      <Text>Akun</Text>
    </View>
  );
};

export default Akun;

const styles = StyleSheet.create({});
