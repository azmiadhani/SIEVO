import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {
  TextField,
  FilledTextField,
  OutlinedTextField,
} from '@ubaids/react-native-material-textfield';

const HInput = (props) => {
  return (
    <View>
      <TextField
        tintColor="rgba(0,0,0,0.4)"
        baseColor="rgba(0,0,0,0.4)"
        fontSize={12}
        style={styles.input}
        {...props}
      />
    </View>
  );
};

export default HInput;

const styles = StyleSheet.create({
  input: {
    fontFamily: 'Cabin-Regular',
    fontSize: 12,
    padding: 0,
  },
});
