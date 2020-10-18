import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';
import {MainContent, MainContentBerkala, TimelineList} from '../../components';
import {checkLogin, getByKey} from '../../Utils/asyncstorage';
import {useNavigation} from '@react-navigation/native';
import {URL_API_MAINAPP, URL_PATH_FOTO_KANDIDAT} from '../../Utils/constant';

const Timeline = ({route}) => {
  const navigation = useNavigation();
  const [timeline, setTimeline] = useState([]);

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

  useEffect(() => {
    if (route.params?.loaded) {
      console.log('TAB - Beranda');
      getByKey('token', false)
        .then(function (res) {
          if (res) {
            console.log('Masih Login.');
            ajax(URL_API_MAINAPP + 'mobile/api/', {
              operation: 'getTimeline',
              token: res,
            })
              .then(function (res2) {
                res2 = JSON.parse(res2);
                console.log(res2.list);
                if (res2.list) {
                  console.log('Lists Updated');
                  setTimeline(res2.list);
                } else {
                  // Tidak ada Kandidat
                  console.log('Tidak ada List');
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

  return (
    <View>
      <MainContentBerkala headerText="Timeline">
        <TimelineList data={timeline} />
      </MainContentBerkala>
    </View>
  );
};

export default Timeline;

const styles = StyleSheet.create({});
