import React from 'react';
import {TouchableOpacity, StyleSheet, Text, View} from 'react-native';

const HButton = (props) => {
  return (
    <View>
      <TouchableOpacity style={styles.button} {...props}>
        <Text style={styles.text}>{props.label}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HButton;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#000000',
    padding: 10,
    borderRadius: 2,
  },
  text: {
    color: '#FFFFFF',
  },
  countContainer: {
    alignItems: 'center',
    padding: 10,
  },
});
