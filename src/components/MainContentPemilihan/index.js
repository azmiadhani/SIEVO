import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  SafeAreaView,
  ScrollView,
  Image,
} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {
  SplashBackground,
  Logo,
  MainLogo,
  LogoKPUBawaslu,
  LogoULM,
} from '../../assets';
import HButton from '../HButton';
const MainContent = (props) => {
  return (
    <View style={{backgroundColor: 'white'}}>
      <View style={styles.header}>
        <Image source={LogoULM} style={styles.headerLogo} />
      </View>
      <View style={styles.footer}>
        <Image source={LogoKPUBawaslu} style={styles.footerLogo} />
      </View>
      <SafeAreaView style={[styles.scrollView]}>{props.children}</SafeAreaView>
    </View>
  );
};

export default MainContent;

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  // Header Start

  headerText: {
    fontSize: 22,
    fontFamily: 'CabinCondensed-Bold',
  },
  // Header End
  //   Body
  scrollView: {
    height: windowHeight * 0.65,
    paddingTop: 10,
  },
  body: {
    // flexGrow: 1,
    // paddingBottom: 20,
  },
  // Body End
  // Footer
  header: {
    width: windowWidth,
    paddingBottom: windowHeight * 0.01,
    paddingTop: windowHeight * 0.01,
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0)',
  },
  headerLogo: {
    height: windowWidth * 0.05,
    resizeMode: 'contain',
  },
  footer: {
    width: windowWidth,
    justifyContent: 'center',
    alignItems: 'center',
    // position: 'absolute',
    bottom: 0,
  },
  footerLogo: {
    height: windowWidth * 0.05,
    resizeMode: 'contain',
  },
  // Footer End
});
