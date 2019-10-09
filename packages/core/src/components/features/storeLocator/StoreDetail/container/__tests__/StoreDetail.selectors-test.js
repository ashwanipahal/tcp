import { Map, fromJS } from 'immutable';
import {
  getCurrentStore,
  getCurrentStoreBasicInfo,
  formatCurrentStoreToObject,
  formatGenericMapObject,
  formatHoursToObject,
  getNearByStores,
  getLabels,
  isFavoriteStore,
} from '../StoreDetail.selectors';

describe('# Store Details Selectors', () => {
  it('#getCurrentStore - get current store', () => {
    const state = {
      StoreDetailReducer: fromJS({
        currentStore: {},
      }),
    };
    const result = getCurrentStore(state);
    expect(Map.isMap(result)).toBeTruthy();
  });
  it('#getCurrentStoreBasicInfo - get current store basic info', () => {
    const state = {
      StoreDetailReducer: fromJS({
        currentStore: fromJS({
          basicInfo: {},
        }),
      }),
    };
    const result = getCurrentStoreBasicInfo(state);
    expect(Map.isMap(result)).toBeTruthy();
  });
  it('#formatHoursToObject - Format the hours map to object', () => {
    const storeHours = fromJS({
      regularHours: [],
      holidayHours: [],
      regularAndHolidayHours: [],
    });
    const result = formatHoursToObject(storeHours);
    const expected = {
      regularHours: [],
      holidayHours: [],
      regularAndHolidayHours: [],
    };
    expect(result).toMatchObject(expected);
  });
  it('#formatHoursToObject - Format the hours map to object', () => {
    const storeHours = fromJS({
      regularHours: [
        {
          dayName: 'FRIDAY',
          openIntervals: [
            {
              fromHour: '2019-01-04 10:00:00',
              toHour: '2019-01-04 20:00:00',
            },
          ],
          isClosed: false,
        },
        {
          dayName: 'SATURDAY',
          openIntervals: [
            {
              fromHour: '2019-01-05 10:00:00',
              toHour: '2019-01-05 20:00:00',
            },
          ],
          isClosed: false,
        },
      ],
      holidayHours: [],
      regularAndHolidayHours: [],
    });
    const result = formatHoursToObject(storeHours);
    const expected = {
      regularHours: [
        {
          dayName: 'FRIDAY',
          openIntervals: [
            {
              fromHour: '2019-01-04 10:00:00',
              toHour: '2019-01-04 20:00:00',
            },
          ],
          isClosed: false,
        },
        {
          dayName: 'SATURDAY',
          openIntervals: [
            {
              fromHour: '2019-01-05 10:00:00',
              toHour: '2019-01-05 20:00:00',
            },
          ],
          isClosed: false,
        },
      ],
      holidayHours: [],
      regularAndHolidayHours: [],
    };
    expect(result).toMatchObject(expected);
  });
  it('#formatGenericMapObject - Format any generic map to object', () => {
    const storeHours = fromJS({
      test: 'test',
    });
    const result = formatGenericMapObject(storeHours);
    const expected = {
      test: 'test',
    };
    expect(result).toMatchObject(expected);
  });
  it('#formatCurrentStoreToObject - formate a store map to object', () => {
    const storeHours = fromJS({
      basicInfo: {
        address: {},
        coordinates: {
          lat: '',
          long: '',
        },
      },
      hours: {
        regularHours: [],
        holidayHours: [],
        regularAndHolidayHours: [],
      },
      features: {},
    });
    const result = formatCurrentStoreToObject(storeHours);
    const expected = {
      basicInfo: {
        address: {},
        coordinates: {},
      },
      hours: {
        regularHours: [],
        holidayHours: [],
        regularAndHolidayHours: [],
      },
      features: {},
    };
    expect(result).toMatchObject(expected);
  });
  it('#getNearByStores - Get Nearby stores', () => {
    const state = {
      StoreDetailReducer: fromJS({
        suggestedStores: [],
      }),
    };
    const result = getNearByStores(state);
    expect(result.size).toEqual(0);
  });
  it('#getLabels - Get Labels', () => {
    const state = {
      Labels: {
        StoreLocator: {},
      },
    };
    const result = getLabels(state);
    expect(result).toMatchObject({});
  });
  it('#isFavoriteStore - send false if gav store', () => {
    const state = {
      User: fromJS({
        defaultStore: {
          basicInfo: {
            id: 'test',
          },
        },
      }),
      StoreDetailReducer: fromJS({
        currentStore: {
          basicInfo: {
            id: 'test1',
            address: {},
            coordinates: {},
          },
          hours: {},
          features: {},
        },
      }),
    };
    const result = isFavoriteStore(state);
    expect(result).toBeFalsy();
  });
});
