import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {TextInput} from 'react-native-paper';

const Ti = (props) => {
  return (
    <View style={styles.container}>
      <TextInput
        mode="flat"
        theme={theme}
        style={styles.inputFlat}
        {...props}
      />
    </View>
  );
};

export default Ti;

const theme = {
  colors: {primary: '#adadad', accent: '#000000', background: '#ffffff00'},
  fonts: {regular: ''},
};
const styles = StyleSheet.create({
  container: {
    paddingTop: 5,
    paddingBottom: 10,
  },
  inputFlat: {
    fontFamily: 'Cabin-Regular',
    fontSize: 12,
    height: 35,
  },
});
