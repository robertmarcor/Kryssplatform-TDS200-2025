import AsyncStorage from "@react-native-async-storage/async-storage";

export const writeLocalStorage = async (key: string, obj: object) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(obj));
    console.log("Saved ✅", `Data stored under key "${key}"`);
  } catch (e) {
    console.log("Error ❌", `Could not save data\n${String(e)}`);
  }
};

export const readLocalStorage = async <T>(key: string): Promise<T | null> => {
  try {
    const data = await AsyncStorage.getItem(key);

    if (!data) {
      console.log("Not found ❌", `No data stored under key "${key}"`);
      return null;
    }

    const parsedData = JSON.parse(data);
    console.log("Loaded ✅", `Data loaded for key "${key}"`);
    return parsedData as T;
  } catch (e) {
    console.log("Error ❌", `Could not retrieve data\n${String(e)}`);
    return null;
  }
};

export const appendLocalStorage = async (key: string, obj: object) => {
  try {
    const data = await AsyncStorage.getItem(key);
    if (!data) {
      await writeLocalStorage(key, [obj]);
    } else {
      const parsedData = JSON.parse(data);
      // Ensure parsedData is an array
      const dataArray = Array.isArray(parsedData) ? parsedData : [parsedData];
      dataArray.push(obj);
      await AsyncStorage.setItem(key, JSON.stringify(dataArray));
      console.log("Appended ✅", `Data appended to key "${key}"`);
    }
  } catch (e) {
    console.log("Error ❌", `Could not append data\n${String(e)}`);
  }
};

export const removeLocalStorage = async (key: string) => {
  try {
    const item = await AsyncStorage.getItem(key);
    if (item) {
      await AsyncStorage.removeItem(key);
      console.log("Removed 🗑️", `"${key}" was removed`);
    } else {
      console.log("Not Found ❌", `"${key}" did not exist`);
    }
  } catch (e) {
    console.log("Error ❌", `Failed to remove item\n${String(e)}`);
  }
};
