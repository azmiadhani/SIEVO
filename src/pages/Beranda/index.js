import React from 'react';
import {StyleSheet, Text, View, Dimensions} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';

const Beranda = () => {
  return (
    <View>
      <View style={styles.header}>
        <Text style={styles.headerText}>Beranda</Text>
      </View>
      <View style={styles.body}>
        <Text style={styles.bodyText}>Berita</Text>
      </View>
    </View>
  );
};

export default Beranda;

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  header: {
    width: windowWidth,
    height: windowHeight * 0.15,
    paddingHorizontal: 0,
    paddingTop: windowHeight * 0.05,
    alignItems: 'center',
    backgroundColor: 'rgba(52, 52, 52, 0)',
  },
  headerText: {
    fontSize: 22,
    fontFamily: 'CabinCondensed-Bold',
  },
  body: {
    width: windowWidth,
    height: windowHeight * 0.63,
    paddingHorizontal: 0,
    paddingTop: 50,
    alignItems: 'center',
    backgroundColor: 'rgba(52, 52, 52, 0)',
  },
  bodyText: {
    fontSize: 18,
    fontFamily: 'Cabin-Regular',
  },
});
