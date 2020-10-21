import React, {useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  Dimensions,
} from 'react-native';
import {SplashBackground, Logo, MainLogo, LogoKPUBawaslu} from '../../assets';
import {LoginModal} from '../../components/';
import {
  storeData,
  getByKey,
  removeAllData,
  getAllKeys,
} from '../../Utils/asyncstorage';
const ConnectionError = ({navigation}) => {
  useEffect(() => {
    // getByKey('token').then(function (res) {
    //   if(res){
    //     // Jika token ada
    //     navigation.replace('MainApp')
    //   }
    //  }).catch(function (res) {
    //    console.log(res);
    //  });
    // setToken(getByKey('token'));
    console.log('page loaded');
  }, []);
  return (
    <SafeAreaView style={styles.background}>
      <View style={styles.background}>
        <View style={styles.headerLogoContainer}>
          <Image source={MainLogo} style={styles.headerLogo} />
        </View>
        <View style={styles.footerLogoContainer}>
          <Image source={LogoKPUBawaslu} style={styles.footerLogo} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ConnectionError;
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
  background: {
    alignItems: 'center',
    paddingTop: windowHeight * 0.1,
    backgroundColor: '#FFFFFF',
    // justifyContent: 'center',
  },
  headerLogo: {
    width: 190,
    height: 185,
    resizeMode: 'contain',
  },
  footerLogo: {
    width: 90,
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
