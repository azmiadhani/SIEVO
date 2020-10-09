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
import {TextInput, Button} from 'react-native-paper';
import {Ti} from '../../components/';

// import {TextInput} from 'react-native-paper';

// import {username} from '../../Utils/globals';
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
      <Ti value={text} placeholder="Ajax Result" disabled={true} />
      <Ti
        value={username}
        onChangeText={(text) => setUsername(text)}
        placeholder="Username"
      />
      <Ti
        value={password}
        onChangeText={(text) => setPassword(text)}
        placeholder="Password"
      />
      <View style={styles.tombol}>
        <Button
          icon="camera"
          mode="contained"
          onPress={() => console.log('Pressed')}>
          Press me
        </Button>
        <Button
          title="MASUK"
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
                // console.log(res);
                // console.log(username);
              })
              .catch(function (res) {
                console.log(res);
              });
          }}
        />
      </View>
    </View>
  );
};

export default LoginModal;

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const theme = {
  colors: {primary: '#adadad', accent: '#000000', background: '#ffffff00'},
  fonts: {regular: ''},
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F3F3F3',
    padding: 17,
    marginHorizontal: 30,
    borderRadius: 5,
    width: windowWidth * 0.8,
  },
});
