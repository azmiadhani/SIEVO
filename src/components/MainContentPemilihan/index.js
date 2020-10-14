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
const MainContent = (props) => {
  return (
    <View style={{height: windowHeight, backgroundColor: 'white'}}>
      <SafeAreaView style={[styles.scrollView]}>{props.children}</SafeAreaView>
      <View style={styles.header}>
        <Image source={LogoULM} style={styles.headerLogo} />
      </View>
      <View style={styles.footer}>
        <Image source={LogoKPUBawaslu} style={styles.footerLogo} />
      </View>
    </View>
  );
};

export default MainContent;

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  // Header Start
  header: {
    width: windowWidth,
    paddingBottom: 10,
    paddingTop: windowHeight * 0.03,
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0)',
  },
  headerLogo: {
    height: 25,
    resizeMode: 'contain',
  },
  headerText: {
    fontSize: 22,
    fontFamily: 'CabinCondensed-Bold',
  },
  // Header End
  //   Body
  scrollView: {
    height: windowHeight * 0.8,
    paddingTop: 10,
  },
  body: {
    // flexGrow: 1,
    // paddingBottom: 20,
  },
  // Body End
  // Footer
  footer: {
    width: windowWidth,
    justifyContent: 'center',
    alignItems: 'center',
    // position: 'absolute',
    bottom: 0,
  },
  footerLogo: {
    height: 25,
    resizeMode: 'contain',
  },
  // Footer End
});
