import React from 'react';
import {StyleSheet, Text, View, Image, Dimensions} from 'react-native';
import {MainLogo} from '../../assets';

const LoginModal = () => {
  return (
    <View style={styles.container}>
      <Text>Test</Text>
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
