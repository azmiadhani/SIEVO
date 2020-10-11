import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';

const Timeline = () => {
  const [count, setCount] = useState(1);
  const [data, setData] = useState('Initial Data');
  useEffect(() => {
    console.warn('test use effect', count);
    if (count == 5) {
      setData('finish');
    }
  });
  return (
    <View>
      <Text>{count}</Text>
      <Text>{data}</Text>
      <Button
        title="update"
        onPress={() => {
          setCount(count + 1);
        }}
      />
      <Text>Timeline</Text>
    </View>
  );
};

export default Timeline;

const styles = StyleSheet.create({});
