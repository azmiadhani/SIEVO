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
import {URL_API_MAINAPP, URL_PATH_FOTO_KANDIDAT} from '../../Utils/constant';

const TimelineList = (props) => {
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
              <Text style={[styles.timelineJudul]}>{item.timelineJudul}</Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Text style={[styles.timelineTanggal]}>
                {item.timelineTanggalMulai}
              </Text>
              <Text style={[styles.timelineTanggal]}> s.d </Text>
              <Text style={[styles.timelineTanggal]}>
                {item.timelineTanggalSelesai}
              </Text>
            </View>
            {item.timelineDeskripsi && (
              <View style={{flexDirection: 'row'}}>
                <Text style={[styles.timelineDeskripsi]}>
                  {item.timelineDeskripsi}
                </Text>
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
        keyExtractor={(item) => item.timelineId}
      />
    </View>
  );
};

export default TimelineList;

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
  timelineTanggal: {
    fontSize: 13,
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
