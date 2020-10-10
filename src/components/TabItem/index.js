import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {
  IconHome,
  IconHomeActive,
  IconTimeline,
  IconTimelineActive,
  IconAkun,
  IconAkunActive,
  IconPemilihan,
  IconPemilihanActive,
} from '../../assets';
import {WARNA_UTAMA, WARNA_DISABLE} from '../../Utils/constant';

const TabItem = ({isFocused, onPress, onLongPress, label}) => {
  const Icon = () => {
    if (label === 'Beranda')
      return isFocused ? <IconHomeActive /> : <IconHome />;
    if (label === 'Timeline')
      return isFocused ? <IconTimelineActive /> : <IconTimeline />;
    if (label === 'Pemilihan')
      return isFocused ? <IconPemilihanActive /> : <IconPemilihan />;
    if (label === 'Akun') return isFocused ? <IconAkunActive /> : <IconAkun />;
  };
  return (
    <TouchableOpacity
      onPress={onPress}
      onLongPress={onLongPress}
      style={styles.container}>
      <Icon style={styles.icon} />
      {/* <Text style={styles.text(isFocused)}>{label}</Text> */}
    </TouchableOpacity>
  );
};

export default TabItem;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  text: (isFocused) => ({
    fontSize: 12,
    fontFamily: 'Cabin-Regular',
    color: isFocused ? WARNA_UTAMA : WARNA_DISABLE,
    paddingTop: 2,
  }),
  icon: {
    height: 10,
  },
});
