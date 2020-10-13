import React, {useEffect, useState, PureComponent} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  s,
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
  const [camera, setCamera] = useState('');
  const [picture, setPicture] = useState('');
  const takePicture = async () => {
    // console.log(camera);
    if (camera) {
      // const options = {quality: 0.5, base64: true};
      const options = {quality: 0.5};
      const data = await camera.takePictureAsync(options);
      setPicture(data);

      console.log(data.uri);
    }
  };
  useEffect(() => {
    if (route.params?.loaded) {
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
      {!picture && (
        <RNCamera
          ref={(ref) => {
            setCamera(ref);
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
        />
      )}

      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          backgroundColor: '#ffffff',
          borderRadius: 30,
        }}>
        <ScrollView>
          <View style={{paddingTop: 40, paddingBottom: 40}}>
            <View style={{paddingRight: 30, paddingLeft: 30}}>
              <HButton
                label="AMBIL FOTO"
                onPress={takePicture.bind(this)}
                // console.log(refresh);
              />
              {/* <HInput label="Nomor Induk Mahasiswa" defaultValue="" />
              <HInput label="Nomor Induk Mahasiswa" defaultValue="" /> */}
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
    backgroundColor: '#ffffff',
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
