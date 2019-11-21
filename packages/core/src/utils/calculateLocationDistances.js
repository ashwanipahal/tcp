import logger from '@tcp/core/src/utils/loggerInstance';
import { requireNamedOnlineModule } from './resourceLoader';

const calcDistanceByLatLng = async (storeLocations = [], coords = {}, isDisabled) => {
  // eslint-disable-next-line sonarjs/cognitive-complexity
  return requireNamedOnlineModule('google.maps').then(() => {
    // eslint-disable-next-line consistent-return
    return new Promise((resolve, reject) => {
      if (isDisabled) {
        return reject();
      }
      if (!navigator.geolocation) {
        reject(new Error('Location services not available'));
      }

      const calculateWithPositionCallback = pos => {
        try {
          // eslint-disable-next-line no-undef
          const origin = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
          // eslint-disable-next-line no-undef
          const service = new google.maps.DistanceMatrixService();
          const destination = storeLocations.map(location => {
            // eslint-disable-next-line no-undef
            return new google.maps.LatLng(location.lat, location.long);
          });
          const distanceMetrixConfig = {
            origins: [origin],
            destinations: destination,
            travelMode: 'DRIVING',
            // eslint-disable-next-line no-undef
            unitSystem: google.maps.UnitSystem.IMPERIAL,
            avoidHighways: false,
            avoidTolls: false,
          };

          service.getDistanceMatrix(distanceMetrixConfig, async (response, status) => {
            if (status === 'OK') {
              const results = response.rows && response.rows[0] && response.rows[0].elements;
              const distanceText = results[0].distance.text;
              resolve(distanceText.substring(0, distanceText.lastIndexOf(' ')));
            } else {
              switch (status) {
                case 'INVALID_REQUEST':
                  throw new Error(
                    'The provided request was invalid. This is often due to missing required fields'
                  );
                case 'MAX_ELEMENTS_EXCEEDED':
                  throw new Error(
                    'The product of origins and destinations exceeds the per-query limit.'
                  );
                case 'MAX_DIMENSIONS_EXCEEDED':
                  throw new Error(
                    'Your request contained more than 25 origins, or more than 25 destinations.'
                  );
                case 'OVER_QUERY_LIMIT':
                  throw new Error(
                    'Your application has requested too many elements within the allowed time period. The request should succeed if you try again after a reasonable amount of time.'
                  );
                case 'REQUEST_DENIED':
                  throw new Error(
                    'The service denied use of the Distance Matrix service by your web page.'
                  );
                default:
                  throw new Error(
                    'A Distance Matrix request could not be processed due to a server error. The request may succeed if you try again.'
                  );
              }
            }
          });
        } catch (err) {
          // try/catch level error, before google api call but after getting users geolocation
          resolve(storeLocations.map(() => -1));
        }
      };

      if (Object.keys(coords).length > 0) {
        calculateWithPositionCallback({
          coords: {
            latitude: coords.lat,
            longitude: coords.lng,
          },
        });
      } else {
        navigator.geolocation.getCurrentPosition(calculateWithPositionCallback, err => {
          // geolocation level error, user may have it disabled
          logger.error(err);
          resolve(storeLocations.map(() => -1));
        });
      }
    });
  });
};

export default calcDistanceByLatLng;
