import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {
  storeData,
  getByKey,
  removeAllData,
  getAllKeys,
} from '../../Utils/asyncstorage';
import {HButton} from '../../components';

const index = () => {
  return (
    <View>
      <HButton
        label="Create Data"
        onPress={async () => {
          storeData('test1', 'ini key 1');
          storeData('test2', 'ini key 2');
        }}
      />
      <HButton
        label="Remove All"
        onPress={async () => {
          removeAllData();
        }}
      />
      <HButton
        label="Read All"
        onPress={async () => {
          getAllKeys();
        }}
      />
      <HButton
        label="Read Async"
        onPress={async () => {
          getByKey('token')
            .then(function (res) {
              if (res) {
                console.log(res.data);
              } else {
                console.log('kunci tidak ada!');
              }
            })
            .catch(function (res) {
              console.log(res);
            });
        }}
      />
    </View>
  );
};

export default index;

const styles = StyleSheet.create({});
