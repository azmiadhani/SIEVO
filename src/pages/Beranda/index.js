import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {MainContent} from '../../components';
import {HInput, HButton, AsyncTest} from '../../components';
const Beranda = () => {
  return (
    <View>
      <MainContent headerText="Beranda">
        {/* <AsyncTest /> */}
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
      </MainContent>
    </View>
  );
};

export default Beranda;

const styles = StyleSheet.create({
  bodyText: {
    fontSize: 16,
    fontFamily: 'Cabin-Regular',
  },
});
