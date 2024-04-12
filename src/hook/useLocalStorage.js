import AsyncStorage from "@react-native-async-storage/async-storage";
const useLocalStorage = () => {
  const setData = async (key, value) => {
    try {
      const convertStringify = JSON.stringify(value);
      await AsyncStorage.setItem(key, convertStringify);
    } catch (error) {
      console.log(error);
    }
  };
  const setItemData = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (error) {
      console.log(error);
    }
  };
  const getData = async (key) => {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (error) {
      console.log(error);
    }
  };
  const getItemData = async (key) => {
    try {
      const value = await AsyncStorage.getItem(key);
      if (!value) throw Error("Dữ liệu đang rỗng");
      return value;
    } catch (error) {
      console.log("Update dữ liệu không thành công");
    }
  };

  return {
    setData,
    setItemData,
    getData,
    getItemData,
  };
};

export default useLocalStorage;
