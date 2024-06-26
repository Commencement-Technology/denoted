import { MMKV } from "react-native-mmkv";

class MMKVFaker {
  private data = {};

  getString(key: string) {
    return this.data[key];
  }

  set(key: string, value: string) {
    this.data[key] = value;
  }

  delete(key: string) {
    if (this.data[key]) this.data[key] = undefined;
  }

  clearAll() {
    this.data = {};
  }
}

export const storage = __DEV__
  ? new MMKVFaker()
  : new MMKV({
      id: "denoted",
      // path: `${USER_DIRECTORY}/storage`,
      // encryptionKey: "sekret",
    });
