import AsyncStorage from "@react-native-async-storage/async-storage";

export function useAsyncLocalStorage() {
    const storeData = async (key: string, value: any) => {
        try {
        const jsonValue = JSON.stringify(value);
          await AsyncStorage.setItem(key, jsonValue);
        } catch (e) {
          return []
        }
      };

    const getData = async (key: string) => {
        try {
          const jsonValue = await AsyncStorage.getItem(key);
          return jsonValue !== null ? JSON.parse(jsonValue) : [];
        } catch (e) {
          return []
        }
    };

    return { storeData, getData }
}