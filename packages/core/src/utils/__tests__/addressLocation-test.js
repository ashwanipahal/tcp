import { getAddressLocationInfo } from '../addressLocation';
import { getCacheData } from '../localCache.util';

jest.mock('../localCache.util', () => ({
  getCacheData: jest.fn(),
  // setCacheData: (),
}));

jest.mock('../resourceLoader', () => ({
  requireNamedOnlineModule: () => new Promise(resolve => resolve({})),
}));

describe('addressLocation', () => {
  test('default', () => {
    getCacheData.mockImplementation(() => {
      return { country: 'NY', lat: 77, lng: 22 };
    });
    const address = { storeLocatorField: 'NY' };
    const returnValue = getAddressLocationInfo(address);
    expect(returnValue).toBeInstanceOf(Promise);
    returnValue.then(item => {
      expect(item).toBe({ country: address.storeLocatorField, lat: 77, lng: 22 });
    });
  });

  test('no local data', () => {
    getCacheData.mockImplementation(() => undefined);
    global.google = {
      maps: {
        Geocoder: function _geoCoder() {
          return {
            geocode: (obj, cb) => {
              const results = [
                {
                  address_components: [
                    {
                      types: ['country'],
                    },
                  ],
                  geometry: {
                    location: {
                      lat: () => 70,
                      lng: () => 22,
                    },
                  },
                },
              ];
              cb(results, 'OK');
            },
          };
        },
      },
    };

    const address = { storeLocatorField: 'NY' };
    expect(getAddressLocationInfo(address)).toBeInstanceOf(Promise);
  });

  test('no local data - error', () => {
    getCacheData.mockImplementation(() => undefined);
    global.google = {
      maps: {
        Geocoder: function _geoCoder() {
          return {
            geocode: (obj, cb) => {
              cb();
            },
          };
        },
      },
    };

    const address = { storeLocatorField: 'NY' };
    expect(getAddressLocationInfo(address)).toBeInstanceOf(Promise);
  });
});
