import React, {useEffect} from 'react';
import {StyleSheet, Text, View, ImageBackground, Image} from 'react-native';
import {SplashBackground, Logo} from '../../assets';
import {APP_VERSION} from '../../Utils/constant';

const Splash = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('Login');
    }, 3000);
  }, [navigation]);
  return (
    <View style={styles.background}>
      <Image source={Logo} style={styles.logo}></Image>
      <Text style={styles.version}>version {APP_VERSION}</Text>
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
  },
  logo: {
    flex: 1,
    width: 200,
    // height: 460,
    resizeMode: 'contain',
  },
  version: {
    // flex: 1,
    fontFamily: 'Cabin-Regular',
    fontSize: 11,
    paddingBottom: 40,
  },
});
