import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const HField = (props) => {
  return (
    <View style={{paddingTop: 5, paddingBottom: 5}}>
      <Text style={styles.label}>{props.label}</Text>
      <Text style={styles.isi}>{props.isi}</Text>
    </View>
  );
};

export default HField;

const styles = StyleSheet.create({
  label: {
    fontSize: 12,
    fontFamily: 'Cabin-Regular',
    color: '#4d4d4d',
    padding: 1,
  },
  isi: {
    fontSize: 14,
    fontFamily: 'Cabin-Regular',
    color: '#000000',
    padding: 1,
  },
});
