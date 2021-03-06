import AsyncStorage from '@react-native-community/async-storage';
import jwt_decode from 'jwt-decode';
export const storeData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    // saving error
  }
  console.log('Done.');
};

export const removeData = async (dataArray) => {
  dataArray.forEach(async (item, index) => {
    try {
      await AsyncStorage.removeItem(item);
    } catch (e) {
      // remove error
    }
  });
  console.log('Done.');
};

export const removeAllData = async () => {
  let keys = [];
  try {
    keys = await AsyncStorage.getAllKeys();
    for (const property in keys) {
      try {
        await AsyncStorage.removeItem(keys[property]);
      } catch (e) {
        // remove error
      }
    }
  } catch (e) {
    // read key error
  }
  console.log('Done.');
};

export const getAllKeys = async () => {
  let keys = [];
  try {
    keys = await AsyncStorage.getAllKeys();
  } catch (e) {
    // read key error
  }
  console.log(keys);
};

export const getByKey = (key, decoded = true) => {
  return new Promise(async function (resolve, reject) {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        if (decoded) {
          resolve(jwt_decode(value));
        } else {
          resolve(value);
        }
      } else {
        resolve(false);
      }
    } catch (e) {
      reject(e);
    }
  });
};

export const checkLogin = async () => {
  return new Promise(async function (resolve, reject) {
    getByKey('token', false)
      .then(function (res) {
        if (res) {
          resolve(res);
        } else {
          resolve(false);
        }
      })
      .catch(function (res) {
        console.log(res);
      });
  });
};
