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
            activeOpacity={1}
            style={[
              styles.innerBox,
              props.terpilih == item.kandidatId
                ? {backgroundColor: '#9fff9c'}
                : {},
            ]}
            value={item.kandidatId}
            disabled={props.disabled}
            onPress={() => props.onChange(item.kandidatId)}>
            <View style={styles.textContainer}>
              <Text style={[styles.item, styles.itemBold, {fontSize: 50}]}>
                {item.kandidatNomorurut}
              </Text>
            </View>
            <View style={[styles.textContainer]}>
              <Image
                style={{width: windowWidth * 0.8, height: windowHeight * 0.2}}
                resizeMode={'contain'}
                source={{
                  uri: props.URL + 'assets/images/' + item.kandidatFoto,
                }}
              />
            </View>
            <View style={[styles.textContainer, {borderBottomWidth: 0}]}>
              <Text style={[styles.item, styles.itemBold]}>
                {item.kandidatPresiden}
              </Text>
              <Text style={styles.item}> dan </Text>
              <Text style={[styles.item, styles.itemBold]}>
                {item.kandidatWakilpresiden}
              </Text>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.kandidatId}
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
    margin: 10,
  },
  textContainer: {
    borderColor: 'black',
    borderBottomWidth: 1,
    width: windowWidth * 0.8,
    alignItems: 'center',
    padding: 2,
  },
});
