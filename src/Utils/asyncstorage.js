import AsyncStorage from '@react-native-community/async-storage';
import jwt_decode from "jwt-decode";

export const storeData = async (key,value) => {
    try {
      await AsyncStorage.setItem(key, value)
    } catch (e) {
      // saving error
    }
    console.log('Done.')
}
  
export const removeAllData = async()=>{
    let keys = []
    try {
      keys = await AsyncStorage.getAllKeys()
      for (const property in keys) {
        try {
          await AsyncStorage.removeItem(keys[property])
        } catch(e) {
          // remove error
        }
      }
    } catch(e) {
      // read key error
    }
    console.log('Done.')
}
  
export const getAllKeys = async()=>{
    let keys = []
    try {
      keys = await AsyncStorage.getAllKeys()
    } catch(e) {
      // read key error
    }
    console.log(keys)
}

export const getByKey = (key) => {
  return new Promise(async function (resolve, reject) {
    try {
      const value = await AsyncStorage.getItem(key)
      if(value !== null) {
        resolve(jwt_decode(value));
      }else{
        resolve(false)
      }
    } catch(e) {
      reject(e);
    }
  })
}
