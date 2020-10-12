import React, {useEffect, useState, PureComponent} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {checkLogin} from '../../Utils/asyncstorage';
import {useNavigation} from '@react-navigation/native';
import {RNCamera} from 'react-native-camera';

const takePicture = async () => {
  if (this.camera) {
    const options = {quality: 0.5, base64: true};
    const data = await this.camera.takePictureAsync(options);
    console.log(data.uri);
  }
};
const Pemilihan = ({route}) => {
  const navigation = useNavigation();
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
        style={styles.preview}
        type={RNCamera.Constants.Type.back}
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
        onGoogleVisionBarcodesDetected={({barcodes}) => {
          console.log(barcodes);
        }}
      />
      <View style={{flex: 0, flexDirection: 'row', justifyContent: 'center'}}>
        <TouchableOpacity
          onPress={takePicture.bind(this)}
          style={styles.capture}>
          <Text style={{fontSize: 14}}> SNAP </Text>
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
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
});
