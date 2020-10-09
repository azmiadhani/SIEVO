import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  Button,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import {MainLogo} from '../../assets';
import {
  TextField,
  FilledTextField,
  OutlinedTextField,
} from '@ubaids/react-native-material-textfield';
// import {TextInput} from 'react-native-paper';

// import {username} from '../../Utils/globals';
import {HInput, HButton} from '../../components';
function ajax(url, pkg) {
  // resource : https://stackoverflow.com/questions/14220321/how-do-i-return-the-response-from-an-asynchronous-call
  // `delay` returns a promise
  return new Promise(function (resolve, reject) {
    // Only `delay` is able to resolve or reject the promise
    const fd = new FormData();
    console.log(pkg);
    fd.append('operation', pkg['operation']);
    fd.append('userUsername', pkg['userUsername']);
    fd.append('userPassword', pkg['userPassword']);
    var xhr = new XMLHttpRequest();
    xhr.open('post', url, true);
    xhr.setRequestHeader('X-Requested-With', 'xmlhttprequest');
    xhr.send(fd);
    xhr.onload = function () {
      resolve(this.response);
    };
    xhr.onerror = reject;
  });
}
const LoginModal = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [text, setText] = useState('');

  return (
    <View style={styles.container}>
      <HInput
        label="Nomor Induk Mahasiswa"
        defaultValue={username}
        onChangeText={(text) => setUsername(text)}
      />
      <TextField
        label="Kata Sandi"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry={true}
        tintColor="rgba(0,0,0,0.4)"
        baseColor="rgba(0,0,0,0.4)"
        fontSize={12}
        style={styles.input}
      />
      <View style={styles.tombolContainer}>
        <HButton
          label="Login"
          onPress={() => {
            ajax('http://192.168.56.1/pemilu-m/mobile/api', {
              operation: 'login',
              userUsername: username,
              userPassword: password,
            })
              .then(function (res) {
                res = JSON.parse(res);
                if (res.status == true) {
                  setText(res.data.token);
                } else {
                  setText('Not found!');
                }
                console.log(res);
                // console.log(username);
              })
              .catch(function (res) {
                console.log(res);
              });
          }}
        />
      </View>
      <HInput
        placeholder="Ajax Req"
        defaultValue={text}
        keyboardType="phone-pad"
        tintColor="rgba(0,0,0,0.4)"
        baseColor="rgba(0,0,0,0.4)"
        fontSize={12}
        style={styles.input}
      />
    </View>
  );
};

export default LoginModal;

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
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
