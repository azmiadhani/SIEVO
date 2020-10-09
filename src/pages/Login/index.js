import React, {useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
} from 'react-native';
import {SplashBackground, Logo, MainLogo, LogoKPUBawaslu} from '../../assets';
import {LoginModal} from '../../components/';
const Login = ({navigation}) => {
  return (
    <SafeAreaView style={styles.background}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.background}>
          <View style={styles.headerLogoContainer}>
            <Image source={MainLogo} style={styles.headerLogo} />
          </View>
          <LoginModal style={styles.loginModal} />
          <View style={styles.footerLogoContainer}>
            <Image source={LogoKPUBawaslu} style={styles.footerLogo} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 5,
    backgroundColor: '#FFFFFF',
    // justifyContent: 'center',
  },
  headerLogo: {
    width: 190,
    height: 185,
    resizeMode: 'contain',
  },
  footerLogo: {
    width: 80,
    // height: 'auto',
    resizeMode: 'contain',
  },
  headerLogoContainer: {
    paddingBottom: 10,
  },
  footerLogoContainer: {
    paddingTop: 10,
  },
});
