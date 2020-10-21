import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Splash, Beranda, Pemilihan, Akun, Timeline, Login} from '../pages';
import BottomNavigation from '../components/BottomNavigator';
import {getByKey} from '../Utils/asyncstorage';
import {useNavigation} from '@react-navigation/native';
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const Router = () => {
  return (
    <Stack.Navigator initialRouteName="Splash">
      <Stack.Screen
        name="Splash"
        component={Splash}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="MainApp"
        component={MainApp}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Timeline"
        component={Timeline}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

const MainApp = ({routes}) => {
  const navigation = useNavigation();
  const [BASE_URL, setBASE_URL] = useState('');
  const [isBusy, setBusy] = useState(true);
  const [initParam, setInitParam] = useState(true);

  console.log('mainapp loaded');
  useEffect(() => {
    getByKey('BASE_URL', false)
      .then(function (res) {
        if (res) {
          console.log('BASEBASE ' + res);
          // setBASE_URL(res);
          setInitParam({URL: res});
          setBusy(false);
        }
      })
      .catch(function (res) {
        console.log(res);
      });
  }, []);
  return (
    <>
      {!isBusy && (
        <Tab.Navigator
          tabBar={(props) => (
            <BottomNavigation navigation={navigation} {...props} />
          )}>
          <Tab.Screen
            name="Beranda"
            component={Beranda}
            initialParams={initParam}
          />
          <Tab.Screen
            name="Timeline"
            component={Timeline}
            initialParams={initParam}
          />
          <Tab.Screen
            name="Pemilihan"
            component={Pemilihan}
            initialParams={initParam}
          />
          <Tab.Screen
            name="Akun"
            component={Akun}
            navigation={navigation}
            initialParams={initParam}
          />
        </Tab.Navigator>
      )}
    </>
  );
};

export default Router;

const styles = StyleSheet.create({});
