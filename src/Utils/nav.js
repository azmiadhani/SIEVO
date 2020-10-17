import {useNavigation} from '@react-navigation/native';

export const navi = (thename) => {
  console.log(thename);
  const navigation = useNavigation();
  navigation.reset({
    index: 0,
    routes: [
      {
        name: thename,
        params: {loaded: Math.random()},
      },
    ],
  });
};
