import calcDistanceByLatLng from '../calculateLocationDistances';

jest.mock('../resourceLoader', () => ({
  requireNamedOnlineModule: () => new Promise(resolve => resolve({})),
}));

describe('calcDistanceByLatLng', () => {
  global.google = {
    maps: {
      LatLng: (lat, long) => {
        return {
          lat: () => lat,
          lng: () => long,
        };
      },
      DistanceMatrixService: () => {
        return {
          getDistanceMatrix: (config, cb) => {
            const results = {
              rows: [
                {
                  elements: [
                    {
                      distance: {
                        text: '10 mi',
                      },
                    },
                  ],
                },
              ],
            };
            cb(results, 'OK');
          },
        };
      },
    },
  };
  test('default when both the coordinates are given', () => {
    const storeLocations = [{ lat: 32.632603, long: 117.084907 }];
    const coords = { lat: 32.659629, lng: -117.064635 };
    const returnValue = calcDistanceByLatLng(storeLocations, coords);
    expect(returnValue).toBeInstanceOf(Promise);
    returnValue.then(item => {
      expect(item).toBe('10');
    });
  });
});
