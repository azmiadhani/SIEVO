import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';
import {checkLogin} from '../../Utils/asyncstorage';
import {useNavigation} from '@react-navigation/native';

const Timeline = ({route}) => {
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
  const [count, setCount] = useState(1);
  const [data, setData] = useState('Initial Data');
  useEffect(() => {
    console.warn('test use effect', count);
    if (count == 5) {
      setData('finish');
    }
  });
  return (
    <View>
      <Text>{count}</Text>
      <Text>{data}</Text>
      <Button
        title="update"
        onPress={() => {
          setCount(count + 1);
        }}
      />
      <Text>Timeline</Text>
    </View>
  );
};

export default Timeline;

const styles = StyleSheet.create({});
