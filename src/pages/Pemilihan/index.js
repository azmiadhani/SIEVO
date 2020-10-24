import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ImageBackground,
  Dimensions,
  ScrollView,
} from 'react-native';
import {RNCamera} from 'react-native-camera';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import {
  MainContent,
  HField,
  HButton,
  HInput,
  AsyncTest,
  Kandidat,
  KandidatBerkala,
  MainContentPemilihan,
  MainContentBerkala,
} from '../../components';
import {checkLogin, getByKey, storeData} from '../../Utils/asyncstorage';
import axios from 'axios';

const Pemilihan = ({route}) => {
  const navigation = useNavigation();
  const [camera, setCamera] = useState();
  const [HideCamera, setHideCamera] = useState(false);
  const [HideActionView, setHideActionView] = useState(false);
  const [capturing, setCapturing] = useState(false);
  const [imageUri, setImageUri] = useState();
  const [picture1, setPicture1] = useState();
  const [picture2, setPicture2] = useState();

  const [AmbilFotoDeskripsi, setAmbilFotoDeskripsi] = useState();
  const [AmbilFotoLabel, setAmbilFotoLabel] = useState();
  const [refresh, setRefresh] = useState();

  const [step, setStep] = useState();

  const takePicture = async () => {
    if (camera) {
      setCapturing(true);
      console.log('OK CAMERA');
      const options = {quality: 0.2, base64: true, mirrorImage: false};
      const data = await camera.takePictureAsync(options);
      console.log(data.uri);
      setImageUri(data.uri);
      setHideCamera(true);
      if (step == 0) {
        setPicture1(data.uri);
      } else if (step == 1) {
        setPicture2(data.uri);
      }
      setCapturing(false);
    } else {
      console.log('NO CAMERA');
    }
  };

  useEffect(() => {
    console.log('Refresh');
  }, [refresh]);

  useEffect(() => {
    console.log('==> STEP ' + step);
    if (step == 0) {
      setAmbilFotoDeskripsi(
        'Pastikan Wajah & KTM/Profil SIMARI anda terlihat dengan jelas dan tidak blur agar pihak panitia bisa mem-verifikasi bahwa anda adalah pemilih valid.',
      );
      setAmbilFotoLabel('AMBIL FOTO PERTAMA');
    } else if (step == 1) {
      setImageUri(false);
      setHideCamera(false);
      setAmbilFotoDeskripsi(
        'Pastikan KTM/Profil SIMARI anda terlihat dengan jelas dan tidak blur agar pihak panitia bisa mem-verifikasi bahwa anda adalah pemilih valid.',
      );
      setAmbilFotoLabel('AMBIL FOTO KEDUA');
    } else if (step == 2) {
      setImageUri(false);
      setHideCamera(true);
      setHideActionView(true);
      console.log('picture1 => ' + picture1);
      console.log('picture2 => ' + picture2);
    }
    setRefresh(Math.random());
  }, [step]);

  useFocusEffect(
    React.useCallback(() => {
      // Do something when the screen is focused
      console.log('=== Tab Pemilihan ===');
      setStep(0);
      return () => {
        // Do something when the screen is unfocused
        // Useful for cleanup functions
        console.log('=== Tab Pemilihan UNFOCUSING ===');
        setStep(0);
        setHideCamera(true);
      };
    }, []),
  );

  return (
    <View style={styles.container}>
      {imageUri ? (
        <View style={{flex: 2}}>
          <ImageBackground
            source={{uri: imageUri}}
            style={{width: windowWidth, height: windowHeight * 0.7}}
          />
        </View>
      ) : null}
      <RNCamera
        ref={(ref) => {
          setCamera(ref);
        }}
        style={[styles.preview, {display: HideCamera ? 'none' : 'flex'}]}
        type={
          step == 0
            ? RNCamera.Constants.Type.front
            : step == 1
            ? RNCamera.Constants.Type.back
            : RNCamera.Constants.Type.back
        }
        flashMode={RNCamera.Constants.FlashMode.on}
        androidCameraPermissionOptions={{
          title: 'Permission to use camera',
          message: 'We need your permission to use your camera',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel',
        }}
        androidRecordAudioPermissionOptions={{
          title: 'Permission to use audio recording',
          message: 'We need your permission to use your audio',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel',
        }}
      />

      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          backgroundColor: '#ffffff',
          borderRadius: 15,
          display: HideActionView ? 'none' : 'flex',
        }}>
        <View style={{paddingTop: 40}}>
          <ScrollView>
            <View
              style={{paddingRight: 30, paddingLeft: 30, paddingBottom: 40}}>
              <View style={{display: imageUri ? 'none' : 'flex'}}>
                <HButton
                  label={AmbilFotoLabel}
                  disabled={capturing}
                  onPress={takePicture}
                />
              </View>
              <View style={{display: imageUri ? 'flex' : 'none'}}>
                <HButton label="Lanjutkan" onPress={() => setStep(step + 1)} />
              </View>
              <Text
                style={{
                  fontFamily: 'Cabin-Regular',
                  fontSize: 14,
                  textAlign: 'center',
                  paddingTop: 20,
                }}>
                {AmbilFotoDeskripsi}
              </Text>
            </View>
          </ScrollView>
        </View>
      </View>
    </View>
  );
};
export default Pemilihan;
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
  headerLogo: {
    height: windowHeight * 0.15,
    resizeMode: 'contain',
  },
  bodyText: {
    fontSize: 16,
    fontFamily: 'Cabin-Regular',
  },
  scrollView: {
    height: windowHeight * 0.63,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
  },
  preview: {
    flex: 2,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    backgroundColor: '#000',
    borderRadius: 2,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
  realFooter: {
    width: windowWidth * 0.8,
  },
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
