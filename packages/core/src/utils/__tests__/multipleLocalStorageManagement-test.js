import { setLocalStorage, getLocalStorage } from '../localStorageManagement';
import { setCacheData, getCacheData } from '../multipleLocalStorageManagement';
import { isClient } from '../index';

const geocodeString = 'geocode-response';
jest.mock('../localStorageManagement', () => ({
  setLocalStorage: jest.fn(),
  getLocalStorage: jest.fn(),
}));

jest.mock('../index', () => ({
  isClient: jest.fn(),
}));

describe('Check get from storage', () => {
  beforeEach(() => {
    isClient.mockImplementation(() => true);
  });
  it('should get item from storage and return false if expired', () => {
    const expiredData = {
      '10001': {
        lat: '21.1122',
        lng: '56.2343',
        country: 'US',
        timeStamp: 1456793296018,
      },
    };
    getLocalStorage.mockImplementation(() => JSON.stringify(expiredData));
    expect(getCacheData(geocodeString, '10001')).toEqual(false);
  });

  it('should set and get items from storage', () => {
    const freshData = {
      '10001': {
        lat: '21.1122',
        lng: '56.2343',
        country: 'US',
        timeStamp: new Date().getTime() - 10000,
      },
    };
    getLocalStorage.mockImplementation(() => JSON.stringify(freshData));
    expect(getCacheData(geocodeString, '10001').lat).toEqual('21.1122');
    expect(getCacheData(geocodeString, '10001').lng).toEqual('56.2343');
    expect(getCacheData(geocodeString, '10001').country).toEqual('US');
  });
});

describe('Check set to storage', () => {
  beforeEach(() => {
    isClient.mockImplementation(() => true);
  });

  it('should set and get items from storage', () => {
    const storedData = {
      '10001': {
        lat: '21.1122',
        lng: '56.2343',
        country: 'US',
        timeStamp: new Date().getTime() - 10000,
      },
      '10002': {
        lat: '21.1122',
        lng: '56.2343',
        country: 'US',
        timeStamp: new Date().getTime() - 20000,
      },
      '10003': {
        lat: '21.1122',
        lng: '56.2343',
        country: 'US',
        timeStamp: new Date().getTime() - 10000,
      },
      '10004': {
        lat: '21.1122',
        lng: '56.2343',
        country: 'US',
        timeStamp: new Date().getTime() - 10000,
      },
      '10005': {
        lat: '21.1122',
        lng: '56.2343',
        country: 'US',
        timeStamp: new Date().getTime() - 10000,
      },
      '10006': {
        lat: '21.1122',
        lng: '56.2343',
        country: 'US',
        timeStamp: new Date().getTime() - 10000,
      },
      '10007': {
        lat: '21.1122',
        lng: '56.2343',
        country: 'US',
        timeStamp: new Date().getTime() - 10000,
      },
      '10008': {
        lat: '21.1122',
        lng: '56.2343',
        country: 'US',
        timeStamp: new Date().getTime() - 10000,
      },
      '10009': {
        lat: '21.1122',
        lng: '56.2343',
        country: 'US',
        timeStamp: new Date().getTime() - 10000,
      },
      '10010': {
        lat: '21.1122',
        lng: '56.2343',
        country: 'US',
        timeStamp: new Date().getTime() - 10000,
      },
    };
    const dataToSet = {
      lat: '21.1122',
      lng: '56.2343',
      country: 'US',
      timeStamp: new Date().getTime(),
    };
    getLocalStorage.mockImplementation(() => JSON.stringify(storedData));
    setLocalStorage.mockImplementation(() => true);
    expect(
      setCacheData({
        key: geocodeString,
        storageKey: '77777',
        storageValue: JSON.stringify(dataToSet),
      })
    ).toEqual(true);
  });
});

describe('Check non-client code', () => {
  beforeEach(() => {
    isClient.mockImplementation(() => false);
  });

  it('should get item from storage and return false if expired', () => {
    expect(getCacheData(geocodeString, '10001')).toEqual(false);
  });
});

describe('Check non-client code in case of get cache data', () => {
  beforeEach(() => {
    isClient.mockImplementation(() => false);
  });

  it('should set item in storage', () => {
    expect(setCacheData({ key: geocodeString, storageKey: '77777', storageValue: '' })).toEqual(
      false
    );
  });
});
