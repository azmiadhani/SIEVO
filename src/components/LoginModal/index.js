import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import {MainLogo} from '../../assets';
import {
  TextField,
  FilledTextField,
  OutlinedTextField,
} from '@ubaids/react-native-material-textfield';
import {HInput, HButton, AsyncTest} from '../../components';
import {URL_API_LOGIN} from '../../Utils/constant';
import {
  storeData,
  getByKey,
  removeAllData,
  getAllKeys,
} from '../../Utils/asyncstorage';
import jwt_decode from 'jwt-decode';

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
const LoginModal = (props) => {
  const [user, setUsername] = useState('1611016110005');
  const [pass, setPassword] = useState('jakarta12');
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [text, setText] = useState('');
  const [token, setToken] = useState('');
  useEffect(() => {
    getByKey('token')
      .then(function (res) {
        if (res) {
          props.navigation.replace('MainApp');
        } else {
          console.log('kunci tidak ada!');
        }
      })
      .catch(function (res) {
        console.log(res);
      });
  }, [token]);
  return (
    <View style={styles.container}>
      <HInput
        label="Nomor Induk Mahasiswa"
        defaultValue={user}
        onChangeText={(text) => setUsername(text)}
      />
      <HInput
        label="Kata Sandi"
        value={pass}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry={true}
      />
      <View style={styles.tombolContainer}>
        {/* <AsyncTest /> */}
        <HButton
          label="Login"
          onPress={() => {
            removeAllData();
            ajax(URL_API_LOGIN + 'api/v1/auth', {
              username: user,
              password: pass,
            })
              .then(function (res) {
                res = JSON.parse(res);
                // console.log(res);
                if (res.token) {
                  storeData('token', res.token);
                  setToken(res.token);
                  console.log(res.token);
                }
              })
              .catch(function (res) {
                console.log(res);
              });
          }}
        />
      </View>
      {/* <HInput
        placeholder="Ajax Req"
        defaultValue={text}
        keyboardType="phone-pad"
        tintColor="rgba(0,0,0,0.4)"
        baseColor="rgba(0,0,0,0.4)"
        fontSize={12}
        style={styles.input}
      /> */}
    </View>
  );
};

export default LoginModal;

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
  tombol: {
    paddingTop: 20,
  },
  container: {
    backgroundColor: '#F3F3F3',
    padding: 17,
    marginHorizontal: 30,
    borderRadius: 5,
    width: windowWidth * 0.8,
  },
  input: {
    fontFamily: 'Cabin-Regular',
    fontSize: 12,
  },
  tombol: {
    fontFamily: 'Cabin-Regular',
    fontSize: 11,
  },
  tombolContainer: {
    paddingTop: 30,
    paddingBottom: 15,
    color: '#000000',
  },
});
