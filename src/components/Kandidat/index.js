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

const Kandidat = (props) => {
  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <FlatList
        data={props.dataKandidat}
        renderItem={({item}) => (
          <TouchableOpacity
            style={[
              styles.innerBox,
              props.terpilih == item.key ? {backgroundColor: '#9fff9c'} : {},
            ]}
            value={item.key}
            onPress={() => props.onChange(item.key)}>
            <Text style={[styles.item, styles.itemBold, {fontSize: 50}]}>
              {item.key}
            </Text>
            <Text style={[styles.item, styles.itemBold]}>
              {item.kandidatPresiden}
            </Text>
            <Text style={styles.item}> dan </Text>
            <Text style={[styles.item, styles.itemBold]}>
              {item.kandidatWakilpresiden}
            </Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.key}
      />
    </View>
  );
};

export default Kandidat;

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
  item: {
    fontSize: 16,
    fontFamily: 'Cabin-Regular',
  },
  itemBold: {
    fontWeight: 'bold',
  },
  outerView: {
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'grey',
    width: windowWidth * 0.8,
  },
  innerBox: {
    borderColor: 'black',
    borderWidth: 2,
    width: windowWidth * 0.8,
    alignItems: 'center',
    padding: 10,
    margin: 10,
  },
});
