import { getAPIConfig } from '@tcp/core/src/utils';
import logger from '@tcp/core/src/utils/loggerInstance';
import { executeExternalAPICall } from '@tcp/core/src/services/handler';

const DISTANCE_API = `https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial`;

/**
 * @function calcDistanceByLatLng - to calculate distance by latitude and longitude
 * example - store location - [{ lat: 32.632603, long: 117.084907 }]
 * example - coords -  { lat: 32.659629, lng: -117.064635}
 */
const calcDistanceByLatLng = (
  storeLocations,
  coords = { lat: 32.659629, lng: -117.064635 },
  isDisabled
) => {
  return new Promise((resolve, reject) => {
    if (isDisabled) {
      return reject();
    }
    if (!navigator.geolocation) {
      reject(new Error('Location services not available'));
    }

    const calculateWithPositionCallback = pos => {
      const googleSearchAPIKey = getAPIConfig().googleApiKey;
      const origins = `&origins=${pos.coords.latitude},${pos.coords.longitude}`;
      const destinations = `&destinations=${storeLocations[0].lat},${storeLocations[0].long}`;
      const apiUrl = `${DISTANCE_API}${origins}${destinations}&key=${googleSearchAPIKey}`;

      const payload = {
        webService: {
          URI: apiUrl,
          method: 'GET',
        },
      };

      return executeExternalAPICall(payload).then(res => {
        try {
          if (res.body && res.body.rows && res.body.rows.length > 0) {
            const allElements = res.body.rows[0].elements;
            return allElements[0].distance.text.replace('mi', 'miles');
          }
          return null;
        } catch (error) {
          return error;
        }
      });
    };

    if (coords && Object.keys(coords).length > 0) {
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
      });
    }
    return null;
  });
};

export default calcDistanceByLatLng;
