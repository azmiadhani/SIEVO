import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import {RaiseHand} from '../../assets';

const BerandaList = (props) => {
  console.log(props);
  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <FlatList
        data={props.data}
        renderItem={({item}) => (
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              width: windowWidth * 0.8,
              paddingTop: 10,
            }}>
            <View style={{flexDirection: 'row'}}>
              <Text style={[styles.timelineJudul]}>{item.beritaJudul}</Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Text style={[styles.timelineTanggal]}>{item.beritaTanggal}</Text>
            </View>
            {item.beritaIsi && (
              <View style={{flexDirection: 'row'}}>
                <Text style={[styles.timelineDeskripsi]}>{item.beritaIsi}</Text>
              </View>
            )}
            <View
              style={{
                borderColor: 'black',
                borderBottomWidth: 1,
                width: windowWidth * 0.2,
                paddingTop: 15,
              }}></View>
          </View>
        )}
        keyExtractor={(item) => item.beritaId}
      />
    </View>
  );
};

export default BerandaList;

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
  timelineTanggal: {
    fontSize: 10,
    fontFamily: 'Cabin-Regular',
  },
  timelineJudul: {
    fontSize: 20,
    fontFamily: 'Cabin-Regular',
    fontWeight: 'bold',
  },
  timelineDeskripsi: {
    fontSize: 15,
    fontFamily: 'Cabin-Regular',
    textAlign: 'center',
  },
});
