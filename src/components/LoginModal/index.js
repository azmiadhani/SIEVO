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
import {SafeAreaInsetsContext} from 'react-native-safe-area-context';
// import {username} from '../../Utils/globals';

const LoginModal = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [text, setText] = useState('');
  async function getAPIUser() {
    // fetch('http://192.168.56.1/pemilu-m/user/api')
    //   .then((response) => response.json())
    //   .then((json) => console.log(json));
    const dataForAPI = {
      userUsername: 'admin_kpu',
    };
    const fd = new FormData();
    fd.append('userUsername', 'admin_kpu');
    fetch('http://192.168.56.1/pemilu-m/user/api', {
      method: 'POST',
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
      },
      body: fd,
    })
      .then((response) => response.json())
      .then((json) => {
        setText(JSON.stringify(json));
      });
  }
  async function getAPI() {
    const dataForAPI = {
      name: 'morpheus',
      job: 'leader',
    };
    fetch('https://reqres.in/api/users/', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(dataForAPI),
    })
      .then((response) => response.json())
      .then((json) => {
        setUsername(json.name);
      });
  }

  return (
    <View style={styles.container}>
      <Text>{text}</Text>
      <Button
        title={username}
        onPress={async () => {
          getAPIUser();
        }}
      />
      <TextField
        label="Nomor Induk Mahasiswa"
        defaultValue={username}
        onChangeText={(text) => setUsername(text)}
        keyboardType="phone-pad"
        tintColor="rgba(0,0,0,0.4)"
        baseColor="rgba(0,0,0,0.4)"
        style={{fontFamily: 'Cabin-Regular'}}
      />
      <TextField
        label="Kata Sandi"
        value={password}
        onChangeText={(text) => setPassword(text)}
        keyboardType="phone-pad"
        tintColor="rgba(0,0,0,0.4)"
        baseColor="rgba(0,0,0,0.4)"
        style={{fontFamily: 'Cabin-Regular'}}
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
});
