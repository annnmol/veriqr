import * as SecureStore from 'expo-secure-store';

//NOTE: Size limit for a value is 2048 bytes only for tokens 
//try @react-native-async-storage/async or react-native-mmkv for other state

const secureStorage = {
    getItem: async (key: string) => {
      const result = await SecureStore.getItemAsync(key);
      return result;
    },
    setItem: async (key: string, value: string) => {
      await SecureStore.setItemAsync(key, value);
    },
    removeItem: async (key: string) => {
      await SecureStore.deleteItemAsync(key);
    },
  };

export default secureStorage;