import React, {useEffect, useState, PureComponent} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {checkLogin} from '../../Utils/asyncstorage';
import {useNavigation} from '@react-navigation/native';
import {RNCamera} from 'react-native-camera';

const Pemilihan = ({route}) => {
  const navigation = useNavigation();
  const [camera, setCamera] = useState('');
  const takePicture = async () => {
    // console.log(camera);
    if (camera) {
      const options = {quality: 0.5, base64: true};
      const data = await camera.takePictureAsync(options);
      console.log(data.uri);
    }
  };
  useEffect(() => {
    if (route.params?.loaded) {
      console.log('TAB - Beranda');
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
      <RNCamera
        ref={(ref) => {
          setCamera(ref);
        }}
        style={styles.preview}
        type={RNCamera.Constants.Type.front}
        // flashMode={RNCamera.Constants.FlashMode.on}
        faceDetectionMode={RNCamera.Constants.FaceDetection.Mode.accurate}
        onFacesDetected={(data) => console.log(data)}
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
          flexDirection: 'row',
          justifyContent: 'center',
          backgroundColor: '#ffffff',
          borderRadius: 30,
        }}>
        <TouchableOpacity
          onPress={takePicture.bind(this)}
          style={styles.capture}>
          <Text style={{fontSize: 14, color: 'white'}}>AMBIL FOTO</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Pemilihan;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#ffffff',
  },
  preview: {
    flex: 1,
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
