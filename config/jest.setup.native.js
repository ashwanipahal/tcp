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
