import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ImageBackground,
  Dimensions,
  ScrollView,
  ActivityIndicator,
  Alert,
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
import {HAlert} from '../../Utils/HAlert';
import axios from 'axios';

const Pemilihan = ({route}) => {
  const navigation = useNavigation();
  const [camera, setCamera] = useState();
  const [HideCamera, setHideCamera] = useState(true);
  const [HideActionView, setHideActionView] = useState(true);
  const [capturing, setCapturing] = useState(false);
  const [imageUri, setImageUri] = useState();
  const [picture1, setPicture1] = useState();
  const [picture2, setPicture2] = useState();

  const [AmbilFotoDeskripsi, setAmbilFotoDeskripsi] = useState();
  const [AmbilFotoLabel, setAmbilFotoLabel] = useState();
  const [refresh, setRefresh] = useState();

  const [step, setStep] = useState();

  const [token, setToken] = useState();
  const [sudahMemilih, setSudahMemilih] = useState();

  // Step 2
  const [dataKandidat, setDataKandidat] = useState([]);
  const [pilihan, setPilihan] = useState('');
  const [simpan, setSimpan] = useState(true);

  // Step 3
  const [dataBerkala, setDataBerkala] = useState([]);

  const submit_ajax = (url) => {
    // resource : https://stackoverflow.com/questions/14220321/how-do-i-return-the-response-from-an-asynchronous-call
    // `delay` returns a promise
    console.log('submit_ajax');

    return new Promise(function (resolve, reject) {
      // Only `delay` is able to resolve or reject the promise
      var fd = new FormData();
      fd.append('token', token);
      fd.append('operation', 'submit_pilihan');
      fd.append('pilihanKandidatid', pilihan);
      fd.append('pilihanFoto', picture1.base64);
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
  };
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
        setPicture1(data);
      } else if (step == 1) {
        setPicture2(data);
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
      setHideCamera(false);
      setHideActionView(false);
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
      axios
        .post(route.params.URL + 'mobile/api/', {
          operation: 'getKandidat',
          token: token,
        })
        .then(function (response) {
          setDataKandidat(response.data.listKandidat);
        })
        .catch(function (error) {
          console.log(error);
        });
    } else if (step == 3) {
      setImageUri(false);
      setHideCamera(true);
      setHideActionView(true);
      axios
        .post(route.params.URL + 'mobile/api/', {
          operation: 'pilihanBerkala',
          token: token,
        })
        .then(function (response) {
          setDataBerkala(response.data.listBerkala);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
    setRefresh(Math.random());
  }, [step]);

  useFocusEffect(
    React.useCallback(() => {
      // Do something when the screen is focused
      console.log('=== Tab Pemilihan ===');
      setStep(4);
      getByKey('token', false)
        .then(function (res) {
          if (res) {
            axios
              .post(route.params.URL + 'mobile/api/', {
                operation: 'checkPeriode',
                token: token,
              })
              .then(function (response) {
                if (response) {
                  setToken(res);
                  getByKey('sudah_memilih', false)
                    .then(function (res_sudah) {
                      if (res_sudah) {
                        if (
                          res_sudah == 'sudah' ||
                          response.data.list == false
                        ) {
                          setSudahMemilih(true);
                          setStep(3);
                        } else {
                          console.log('BELUM');
                          setSudahMemilih(false);
                          setStep(0); // original --> 0
                        }
                      } else {
                        navigation.replace('Login');
                      }
                    })
                    .catch(function (res) {
                      console.log(res);
                    });
                } else {
                  console.log('Terjadi kesalahan pada koneksi');
                }
              })
              .catch(function (error) {
                console.log(error);
              });
          } else {
            navigation.replace('Login');
          }
        })
        .catch(function (res) {
          console.log(res);
        });
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
      {HideCamera ? null : (
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
      )}
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
      {step == 2 ? (
        <>
          <MainContentPemilihan>
            <Kandidat
              dataKandidat={dataKandidat}
              terpilih={pilihan}
              onChange={(key) => {
                setPilihan(key);
              }}
              URL={route.params.URL}
              disabled={simpan ? false : true}
            />
          </MainContentPemilihan>
          <ScrollView>
            <View
              style={{alignItems: 'center', paddingTop: windowWidth * 0.05}}>
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
                                  setStep(3);
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
          </ScrollView>
        </>
      ) : null}
      {step == 3 ? (
        <View>
          <MainContentBerkala headerText="Status Pemilihan">
            <KandidatBerkala data={dataBerkala} URL={route.params.URL} />
          </MainContentBerkala>
        </View>
      ) : null}
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
