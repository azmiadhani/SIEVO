import React, {useEffect, useState, PureComponent} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  ImageBackground,
  Image,
} from 'react-native';
import {checkLogin} from '../../Utils/asyncstorage';
import {useNavigation} from '@react-navigation/native';
import {RNCamera} from 'react-native-camera';
import {
  MainContent,
  HField,
  HButton,
  HInput,
  AsyncTest,
} from '../../components';
import {ScrollView} from 'react-native-gesture-handler';

const Pemilihan = ({route}) => {
  const navigation = useNavigation();
  const [camera, setCamera] = useState();
  const [picture, setPicture] = useState([]);

  // component
  const [ElCamera, setElCamera] = useState(<View></View>);
  const [ActionButton, setActionButton] = useState(<View></View>);

  const takePicture = async () => {
    showActionButton(0);
    console.log('picture pressed');
    if (camera) {
      console.log('OK - camera');
      // const options = {quality: 0.5, base64: true};
      const options = {quality: 0.5};
      const data = await camera.takePictureAsync(options);
      if (data) {
        setPicture(data.uri);
        setElCamera(
          <View style={{flex: 2}}>
            <ImageBackground
              source={{uri: data.uri}}
              style={{width: windowWidth, height: windowHeight * 0.7}}
            />
          </View>,
        );
        setActionButton(
          <HButton
            label="LANJUTKAN KE PEMILIHAN"
            // console.log(refresh);
          />,
        );
      }
    } else {
      console.log('NOT OK - camera');
      showActionButton(1);
    }
  };
  const showCamera = (props) => {
    console.log(props);
    setElCamera(
      <RNCamera
        ref={(ref) => {
          console.log('SETTED - camera');
          setCamera(ref);
          if (!camera) {
            console.log('tidak ada camera');
            navigation.navigate('Pemilihan', {
              pemilihanReload: 1,
              loaded: Math.random(),
            });
          } else {
            console.log('ada kamera');
          }
        }}
        style={styles.preview}
        type={RNCamera.Constants.Type.front}
        // flashMode={RNCamera.Constants.FlashMode.on}
        // faceDetectionMode={RNCamera.Constants.FaceDetection.Mode.accurate}
        // onFacesDetected={(data) => console.log(data)}
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
      />,
    );
  };
  const showActionButton = (show) => {
    if (show) {
      setActionButton(
        <HButton
          label="AMBIL FOTO"
          onPress={takePicture.bind(this)}
          // console.log(refresh);
        />,
      );
    } else {
      setActionButton(
        <HButton
          label="AMBIL FOTO"
          onPress={takePicture.bind(this)}
          disabled={true}
          // console.log(refresh);
        />,
      );
    }
  };
  useEffect(() => {
    if (route.params?.loaded) {
      showCamera('TRIGGER SHOW CAMERA');
      showActionButton(1);
      console.log('TAB - Pemilihan');
      checkLogin()
        .then(function (res) {
          if (res) {
            console.log('Masih Login.');
          } else {
            navigation.replace('Login');
          }
        })
        .catch(function (res) {
          console.log(res);
        });
    }
  }, [route.params?.loaded]);
  return (
    <View style={styles.container}>
      {ElCamera}
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          backgroundColor: '#ffffff',
          borderRadius: 15,
        }}>
        <ScrollView>
          <View style={{paddingTop: 40, paddingBottom: 40}}>
            <View style={{paddingRight: 30, paddingLeft: 30}}>
              {ActionButton}
              <Text
                style={{
                  fontFamily: 'Cabin-Regular',
                  fontSize: 24,
                  textAlign: 'center',
                  paddingTop: 20,
                }}>
                Pastikan Wajah & KTM/Profil SIMARI anda terlihat dengan jelas
                dan tidak blur agar pihak panitia bisa mem-verifikasi bahwa anda
                adalah pemilih valid.
              </Text>
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default Pemilihan;
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
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
});
