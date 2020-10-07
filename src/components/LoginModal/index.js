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
function ajax(url, username) {
  // resource : https://stackoverflow.com/questions/14220321/how-do-i-return-the-response-from-an-asynchronous-call
  // `delay` returns a promise
  return new Promise(function (resolve, reject) {
    // Only `delay` is able to resolve or reject the promise
    const fd = new FormData();
    console.log(username);
    fd.append('userUsername', username);
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
      <Text>{text}</Text>
      <TextField
        label="Nomor Induk Mahasiswa"
        defaultValue={username}
        onChangeText={(text) => setUsername(text)}
        keyboardType="phone-pad"
        tintColor="rgba(0,0,0,0.4)"
        baseColor="rgba(0,0,0,0.4)"
        fontSize={12}
        style={styles.input}
      />
      <TextField
        label="Kata Sandi"
        secureTextEntry={true}
        value={password}
        onChangeText={(text) => setPassword(text)}
        keyboardType="phone-pad"
        tintColor="rgba(0,0,0,0.4)"
        baseColor="rgba(0,0,0,0.4)"
        fontSize={12}
        style={styles.input}
      />
      <Button
        title="MASUK"
        style={styles.tombol}
        onPress={() => {
          ajax('http://192.168.56.1/pemilu-m/user/api', username)
            .then(function (res) {
              res = JSON.parse(res);
              if (res.status == true) {
                setText(res.data.userUsername);
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
  },
  tombol: {
    paddingTop: 20,
  },
});
