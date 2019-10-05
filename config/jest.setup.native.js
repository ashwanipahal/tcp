// eslint-disable-next-line import/no-unresolved
import { NativeModules } from 'react-native';
import MockStorage from './__mocks__/MockStorage';

const { configure } = require('enzyme');
const Adapter = require('enzyme-adapter-react-16');

configure({ adapter: new Adapter() });

Date.now = jest.fn(() => new Date('2019-08-01'));

const storageCache = {};
const AsyncStorage = new MockStorage(storageCache);

// Mock Asyncstorage
jest.setMock('@react-native-community/async-storage', AsyncStorage);

// Mock Timers for Animation
jest.useFakeTimers();
jest.mock('LayoutAnimation');

jest.mock('react-native-cookies', () => ({
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  openURL: jest.fn(),
  canOpenURL: jest.fn(),
  getInitialURL: jest.fn(),
  get: () => Promise.resolve(null),
}));

jest.mock('react-native-awesome-card-io', () => {
  return {
    DETECTION_MODE: 'IMAGE_AND_NUMBER',
    CardIOUtilities: {
      preload: jest.fn(() => Promise.resolve('the response')),
    },
  };
});

// Mock NetInfo for react-native modules
NativeModules.RNCNetInfo = {
  getCurrentState: jest.fn(() => Promise.resolve()),
  addListener: jest.fn(),
  removeListeners: jest.fn(),
};
