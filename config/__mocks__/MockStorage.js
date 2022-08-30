// Mock AsyncStorage for tests
export default class MockStorage {
  constructor(cache = {}) {
    this.storageCache = cache;
  }

  setItem = jest.fn((key, value) => {
    return new Promise((resolve, reject) => {
      if (typeof key !== 'string' || typeof value !== 'string') reject();
      resolve((this.storageCache[key] = value));
    });
  });

  getItem = jest.fn(key => {
    return new Promise(resolve => {
      return this.storageCache.hasOwnProperty.call(key)
        ? resolve(this.storageCache[key])
        : resolve(null);
    });
  });

  removeItem = jest.fn(key => {
    return new Promise((resolve, reject) => {
      return this.storageCache.hasOwnProperty.call(key)
        ? resolve(delete this.storageCache[key])
        : reject();
    });
  });

  clear = jest.fn(() => {
    return new Promise(resolve => {
      resolve((this.storageCache = {}));
    });
  });

  getAllKeys = jest.fn(() => {
    return new Promise(resolve => resolve(Object.keys(this.storageCache)));
  });
}
