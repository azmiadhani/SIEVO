import React, {useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  PermissionsAndroid,
  Platform,
  Alert,
} from 'react-native';
import {SplashBackground, Logo, MainLogo, LogoKPUBawaslu} from '../../assets';
import {LoginModal} from '../../components/';
import {
  storeData,
  getByKey,
  removeAllData,
  getAllKeys,
} from '../../Utils/asyncstorage';
import GetLocation from 'react-native-get-location';
import {APP_VERSION} from '../../Utils/constant';
const Login = ({navigation}) => {
  const checkPermission = async () => {
    try {
      console.log('request permission');
      const camera = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.CAMERA,
      );
      const record = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
      );
      const location = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
      const perm = [];
      if (!camera) {
        perm.push(PermissionsAndroid.PERMISSIONS.CAMERA);
      }
      if (!record) {
        perm.push(PermissionsAndroid.PERMISSIONS.RECORD_AUDIO);
      }
      if (!location) {
        perm.push(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
      }
      return perm;
    } catch (err) {
      console.warn(err);
    }
  };
  const requestPermissionCamera = (perm) => {
    Alert.alert(
      'Izinkan Akses',
      'Aplikasi PEMILU-M ULM memerlukan beberapa akses agar anda bisa melakukan pemilihan dan suara yang anda kirimkan bisa dinyatakan sah oleh pihak verifikator suara.',
      [
        {
          text: 'OK',
          onPress: async () => {
            try {
              console.log('request permission');
              const granted = await PermissionsAndroid.requestMultiple(perm);
              if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log('Access Accepted');
              } else {
                console.log('Denied');
              }
            } catch (err) {
              console.warn(err);
            }
          },
        },
      ],
      {
        cancelable: false,
      },
    );
  };
  useEffect(() => {
    if (Platform.OS === 'android') {
      checkPermission()
        .then(function (res) {
          console.log(res);
          if (res.length !== 0) {
            requestPermissionCamera(res);
          }
        })
        .catch(function () {
          console.log('Terjadi Kesalahan');
        });
    }
    // GetLocation.getCurrentPosition({
    //   enableHighAccuracy: true,
    //   timeout: 15000,
    // })
    //   .then((location) => {
    //     console.log(location);
    //   })
    //   .catch((error) => {
    //     const {code, message} = error;
    //     console.warn(code, message);
    //   });
    // console.log('page loaded');
  }, []);
  return (
    <SafeAreaView style={styles.background}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.background}>
          <View style={styles.headerLogoContainer}>
            <Image source={MainLogo} style={styles.headerLogo} />
          </View>
          <LoginModal style={styles.loginModal} navigation={navigation} />
          <View style={styles.footerLogoContainer}>
            <Image source={LogoKPUBawaslu} style={styles.footerLogo} />
          </View>
          <Text style={styles.version}>version {APP_VERSION}</Text>
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
  version: {
    // flex: 1,
    fontFamily: 'Cabin-Regular',
    fontSize: 11,
  },
});
