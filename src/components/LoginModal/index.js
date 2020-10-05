import React from 'react';
import {StyleSheet, Text, View, Image, Dimensions} from 'react-native';
import {MainLogo} from '../../assets';
import {
  TextField,
  FilledTextField,
  OutlinedTextField,
} from '@ubaids/react-native-material-textfield';

const LoginModal = () => {
  return (
    <View style={styles.container}>
      <TextField
        label="Nomor Induk Mahasiswa"
        keyboardType="phone-pad"
        tintColor="rgba(0,0,0,0.4)"
        baseColor="rgba(0,0,0,0.4)"
        style={{fontFamily: 'Cabin-Regular'}}
      />
      <TextField
        label="Kata Sandi"
        keyboardType="phone-pad"
        tintColor="rgba(0,0,0,0.4)"
        baseColor="rgba(0,0,0,0.4)"
        style={{fontFamily: 'Cabin-Regular'}}
      />
    </View>
  );
};

export default LoginModal;

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F3F3F3',
    padding: 17,
    marginHorizontal: 30,
    borderRadius: 5,
    width: windowWidth * 0.8,
  },
});
