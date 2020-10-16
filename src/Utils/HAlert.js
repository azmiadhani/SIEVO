import {Alert} from 'react-native';

export const HAlert = (title, message, onpress) => {
  Alert.alert(title, message, [{text: 'OK', onPress: () => onpress}], {
    cancelable: false,
  });
};
