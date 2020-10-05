import React, {useEffect} from 'react';
import {StyleSheet, Text, View, ImageBackground, Image} from 'react-native';
import {SplashBackground, Logo, MainLogo} from '../../assets';
import {LoginModal} from '../../components/';
const Login = ({navigation}) => {
  return (
    <View style={styles.background}>
      <View style={styles.mainLogoContainer}>
        <Image source={MainLogo} style={styles.logo} />
      </View>
      <LoginModal style={styles.loginModal} />
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 50,
    backgroundColor: '#FFFFFF',
    // justifyContent: 'center',
  },
  logo: {
    width: 130,
    height: 175,
    resizeMode: 'stretch',
  },
  mainLogoContainer: {
    paddingBottom: 50,
  },
});
