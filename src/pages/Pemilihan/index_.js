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
  Alert,
  ActivityIndicator,
} from 'react-native';
import {checkLogin, getByKey, storeData} from '../../Utils/asyncstorage';
import {HAlert} from '../../Utils/HAlert';
import {useNavigation, CommonActions} from '@react-navigation/native';
import {RNCamera} from 'react-native-camera';
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
import {ScrollView} from 'react-native-gesture-handler';
import axios from 'axios';
import jwt_decode from 'jwt-decode';

const Pemilihan = ({route}) => {
  const navigation = useNavigation();
  const [camera, setCamera] = useState();
  const [showCam, setShowCam] = useState(false);
  const [showCam2, setShowCam2] = useState(false);
  const [preview, setPreview] = useState(false);
  const [preview2, setPreview2] = useState(false);
  const [picture, setPicture] = useState([]);
  const [picture2, setPicture2] = useState([]);

  // component
  const [step, setStep] = useState(5);
  const [ElCamera, setElCamera] = useState(<View></View>);
  const [ActionButton, setActionButton] = useState(<View></View>);

  // Data Kandidat
  const [dataKandidat, setDataKandidat] = useState([]);
  const [pilihan, setPilihan] = useState('');
  const [token, setToken] = useState('');

  // pilihan berkala
  const [dataBerkala, setDataBerkala] = useState([]);

  // Button Simpan
  const [simpan, setSimpan] = useState(true);

  const pilihKandidat = (key) => {
    setPilihan(key);
    console.log('PILIH');
  };

  const showActionButton = (show) => {
    if (step == 0) {
      var label = 'AMBIL FOTO SELFIE DENGAN KTM';
    } else if (step == 1) {
      var label = 'AMBIL FOTO KTM';
    }
    if (show) {
      setActionButton(
        <HButton
          label={label}
          onPress={takePicture.bind(this)}
          // console.log(refresh);
        />,
      );
    } else {
      setActionButton(
        <HButton
          label={label}
          disabled={true}
          // console.log(refresh);
        />,
      );
    }
  };

  const showCamera = (props) => {
    console.log(props);
  };

  function ajax(url, pkg) {
    // resource : https://stackoverflow.com/questions/14220321/how-do-i-return-the-response-from-an-asynchronous-call
    // `delay` returns a promise
    return new Promise(function (resolve, reject) {
      // Only `delay` is able to resolve or reject the promise
      console.log(pkg);

      var xhr = new XMLHttpRequest();
      xhr.open('post', url, true);
      xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
      xhr.send(JSON.stringify(pkg));
      xhr.onload = function () {
        resolve(this.response);
      };
      xhr.onerror = reject;
    });
  }

  function submit_ajax(url) {
    // resource : https://stackoverflow.com/questions/14220321/how-do-i-return-the-response-from-an-asynchronous-call
    // `delay` returns a promise
    console.log('submit_ajax');

    return new Promise(function (resolve, reject) {
      // Only `delay` is able to resolve or reject the promise
      var fd = new FormData();
      fd.append('token', token);
      fd.append('operation', 'submit_pilihan');
      fd.append('pilihanKandidatid', pilihan);
      fd.append('pilihanFoto', picture.base64);
      fd.append('pilihanFotoBerkas', picture2.base64);
      axios
        .post(url, fd)
        .then(function (response) {
          resolve(response.data);
        })
        .catch(function (error) {
          reject(error);
        });
    });
  }

  const takePicture = async () => {
    showActionButton(0);
    console.log('picture pressed');
    if (camera) {
      console.log('OK - camera');
      const options = {quality: 0.2, base64: true, mirrorImage: false};
      const data = await camera.takePictureAsync(options);
      if (data) {
        setShowCam2(false);
        setShowCam(false);
        if (step == 0) {
          setPreview(true);
          setPicture(data);
          setActionButton(
            <HButton
              label="LANJUTKAN"
              onPress={() => {
                setStep(1);
                setShowCam(false);
                setShowCam2(true);
                setPreview(false);
              }}
              // console.log(refresh);
            />,
          );
        } else if (step == 1) {
          setPreview2(true);
          setPicture2(data);
          setActionButton(
            <HButton
              label="LANJUTKAN"
              onPress={() => {
                setStep(2);
                setShowCam2(false);
                setPreview2(false);
                console.log('===SETPICTURE');
                console.log(picture.uri);
                console.log(picture2.uri);
                console.log('###SETPICTURE');
              }}
              // console.log(refresh);
            />,
          );
        }
      }
    } else {
      console.log('NOT OK - camera');
      showActionButton(1);
    }
  };

  useEffect(() => {
    if (route.params?.loaded) {
      // setStep(2);
      // ENABLE LATER
      console.log('TAB - Pemilihan');
      setPilihan('');
      setDataKandidat([]);
      getByKey('token', false)
        .then(function (res) {
          if (res) {
            setToken(res);
            getByKey('sudah_memilih', false)
              .then(function (res_sudah) {
                if (res_sudah) {
                  // setStep(1);
                  console.log('SUDAH MEMILIH =', res_sudah);
                  if (res_sudah == 'sudah') {
                    setStep(3);
                    console.log('Masih Login.');
                    ajax(route.params.URL + 'mobile/api/', {
                      operation: 'pilihanBerkala',
                      token: res,
                    })
                      .then(function (res2) {
                        res2 = JSON.parse(res2);
                        console.log(res2.listBerkala);
                        if (res2.listBerkala) {
                          console.log('List Berkala Updated');
                          setDataBerkala(res2.listBerkala);
                        } else {
                          // Tidak ada Kandidat
                          console.log('Tidak ada List Berkala');
                        }
                      })
                      .catch(function (res) {
                        console.log(res);
                      });
                  } else {
                    if (step == 5) {
                      setStep(0);
                      setShowCam(true);
                    }
                    showCamera('TRIGGER SHOW CAMERA');
                    showActionButton(1);
                    console.log('Masih Login.');
                    ajax(route.params.URL + 'mobile/api/', {
                      operation: 'getKandidat',
                      token: res,
                    })
                      .then(function (res2) {
                        res2 = JSON.parse(res2);
                        // console.log(res);
                        if (res2.listKandidat) {
                          console.log('Kandidat Loaded');
                          setDataKandidat(res2.listKandidat);
                        } else {
                          // Tidak ada Kandidat
                          console.log('Tidak ada kandidat');
                        }
                      })
                      .catch(function (res) {
                        console.log(res);
                      });
                  }
                } else {
                  navigation.replace('Login');
                  s;
                }
              })
              .catch(function (res) {
                console.log(res);
              });
          } else {
            navigation.replace('Login');
          }
        })
        .catch(function (res) {
          console.log(res);
        });
    }
  }, [route.params?.loaded]);

  const navi = (name, extraparam) => {
    navigation.reset({
      index: 0,
      routes: [
        {
          name: name,
          params: extraparam,
        },
      ],
    });
  };

  return (
    <View style={styles.container}>
      {preview && (
        <View style={{flex: 2}}>
          <ImageBackground
            source={{uri: picture.uri}}
            style={{width: windowWidth, height: windowHeight * 0.7}}
          />
        </View>
      )}
      {preview2 && (
        <View style={{flex: 2}}>
          <ImageBackground
            source={{uri: picture2.uri}}
            style={{width: windowWidth, height: windowHeight * 0.7}}
          />
        </View>
      )}
      {showCam && (
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
        />
      )}
      {showCam2 && (
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
          type={RNCamera.Constants.Type.back}
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
      {step == 0 && (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            backgroundColor: '#ffffff',
            borderRadius: 15,
          }}>
          <View style={{paddingTop: 40}}>
            <ScrollView>
              <View
                style={{paddingRight: 30, paddingLeft: 30, paddingBottom: 40}}>
                {ActionButton}
                <Text
                  style={{
                    fontFamily: 'Cabin-Regular',
                    fontSize: 14,
                    textAlign: 'center',
                    paddingTop: 20,
                  }}>
                  Pastikan Wajah & KTM/Profil SIMARI anda terlihat dengan jelas
                  dan tidak blur agar pihak panitia bisa mem-verifikasi bahwa
                  anda adalah pemilih valid.
                </Text>
              </View>
            </ScrollView>
          </View>
        </View>
      )}
      {step == 1 && (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            backgroundColor: '#ffffff',
            borderRadius: 15,
          }}>
          <View style={{paddingTop: 40}}>
            <ScrollView>
              <View
                style={{paddingRight: 30, paddingLeft: 30, paddingBottom: 40}}>
                {ActionButton}
                <Text
                  style={{
                    fontFamily: 'Cabin-Regular',
                    fontSize: 14,
                    textAlign: 'center',
                    paddingTop: 20,
                  }}>
                  Pastikan KTM/Profil SIMARI anda terlihat dengan jelas dan
                  tidak blur agar pihak panitia bisa mem-verifikasi bahwa anda
                  adalah pemilih valid.
                </Text>
              </View>
            </ScrollView>
          </View>
        </View>
      )}
      {step == 2 && (
        <>
          <MainContentPemilihan>
            <Kandidat
              dataKandidat={dataKandidat}
              terpilih={pilihan}
              onChange={pilihKandidat}
              URL={route.params.URL}
              disabled={simpan ? false : true}
            />
          </MainContentPemilihan>
          <View style={{alignItems: 'center', paddingTop: windowWidth * 0.05}}>
            <View style={styles.realFooter}>
              <HButton
                label="SIMPAN PILIHAN"
                disabled={pilihan ? (simpan ? false : true) : true}
                onPress={() => {
                  setSimpan(false);
                  submit_ajax(route.params.URL + 'mobile/api_fd/')
                    .then(function (res2) {
                      console.log(res2);
                      if (res2.status) {
                        storeData('sudah_memilih', 'sudah');
                        Alert.alert(
                          '',
                          res2.keterangan,
                          [
                            {
                              text: 'OK',
                              onPress: () => {
                                navigation.navigate('Pemilihan', {
                                  pemilihanReload: 1,
                                  loaded: Math.random(),
                                });
                              },
                            },
                          ],
                          {
                            cancelable: false,
                          },
                        );
                      } else {
                        HAlert('Gagal', res2.keterangan);
                      }
                      setSimpan(true);
                    })
                    .catch(function (res) {
                      console.log(res);
                      HAlert(
                        'Gagal',
                        'Terjadi kesalahan saat menghubungi server.',
                      );

                      setSimpan(true);
                    });
                }}
              />
              {simpan ? (
                <Text>
                  Setelah anda menekan tombol simpan anda tidak bisa merubah
                  suara lagi.
                </Text>
              ) : (
                // <Text>Sedang menyimpan mohon menunggu</Text>
                <ActivityIndicator size="large" color="#000000" />
              )}
            </View>
          </View>
        </>
      )}
      {step == 3 && (
        <View>
          <MainContentBerkala headerText="Status Pemilihan">
            <KandidatBerkala data={dataBerkala} URL={route.params.URL} />
          </MainContentBerkala>
        </View>
      )}
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
