import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';

const Beranda = () => {
  return (
    <SafeAreaView style={styles.background}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Beranda</Text>
      </View>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.body}>
        <Text style={styles.bodyText}>Berita</Text>
        <Text style={styles.bodyText}>Berita</Text>
        <Text style={styles.bodyText}>Berita</Text>
        <Text style={styles.bodyText}>Berita</Text>
        <Text style={styles.bodyText}>Berita</Text>
        <Text style={styles.bodyText}>Berita</Text>
        <Text style={styles.bodyText}>Berita</Text>
        <Text style={styles.bodyText}>Berita</Text>
        <Text style={styles.bodyText}>Berita</Text>
        <Text style={styles.bodyText}>Berita</Text>
        <Text style={styles.bodyText}>Berita</Text>
        <Text style={styles.bodyText}>Berita</Text>
        <Text style={styles.bodyText}>Berita</Text>
        <Text style={styles.bodyText}>Berita</Text>
        <Text style={styles.bodyText}>Berita</Text>
        <Text style={styles.bodyText}>Berita</Text>
        <Text style={styles.bodyText}>Berita</Text>
        <Text style={styles.bodyText}>Berita</Text>
        <Text style={styles.bodyText}>Berita</Text>
        <Text style={styles.bodyText}>Berita</Text>
        <Text style={styles.bodyText}>Berita</Text>
        <Text style={styles.bodyText}>Berita</Text>
        <Text style={styles.bodyText}>Berita</Text>
        <Text style={styles.bodyText}>Berita</Text>
        <Text style={styles.bodyText}>Berita</Text>
        <Text style={styles.bodyText}>Berita</Text>
      </ScrollView>
    </SafeAreaView>
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
    backgroundColor: 'rgba(0, 0, 0, 0)',
  },
  headerText: {
    fontSize: 22,
    fontFamily: 'CabinCondensed-Bold',
  },
  scrollView: {
    height: windowHeight * 0.75,
  },
  body: {
    width: windowWidth,
    alignItems: 'center',
    backgroundColor: 'rgba(52, 52, 52, 0)',
  },
  bodyText: {
    fontSize: 18,
    fontFamily: 'Cabin-Regular',
  },
});
