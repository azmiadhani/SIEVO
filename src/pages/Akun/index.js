import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, Dimensions} from 'react-native';
import {MainContent, HField} from '../../components';
import {
  storeData,
  getByKey,
  removeAllData,
  getAllKeys,
} from '../../Utils/asyncstorage';

const Akun = () => {
  const [nim, setNim] = useState('-');
  const [nama, setNama] = useState('-');
  const [prodi, setProdi] = useState('-');
  const [fak, setFak] = useState('-');
  useEffect(() => {
    getByKey('token')
      .then(function (res) {
        if (res.data.username) {
          if (res.data.username) {
            setNim(res.data.username);
          }
          if (res.data.nama) {
            setNama(res.data.nama);
          }
          if (res.data.prodi) {
            setProdi(res.data.prodi);
          }
          console.log(res.data);
        }
      })
      .catch(function (res) {
        console.log(res);
      });
    console.log('akun loaded');
  }, []);
  return (
    <View>
      <MainContent headerText="Profil Pemilih">
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <View
            style={{
              width: windowWidth * 0.8,
              height: windowHeight * 0.7,
            }}>
            <HField label="Nomor Induk Mahasiswa" isi={nim} />
            <HField label="Nama" isi={nama} />
            <HField label="Program Studi" isi={prodi} />
            <HField label="Fakultas" isi={fak} />
          </View>
        </View>
      </MainContent>
    </View>
  );
};

export default Akun;

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  bodyText: {
    fontSize: 16,
    fontFamily: 'Cabin-Regular',
    padding: 5,
  },
});
