import { getAPIConfig } from '@tcp/core/src/utils';
import logger from '@tcp/core/src/utils/loggerInstance';
import { executeExternalAPICall } from '@tcp/core/src/services/handler';
import googleMapConstants from '@tcp/core/src/config/googleMapConstants.config';

/**
 * @function calcDistanceByLatLng - to calculate distance by latitude and longitude
 * example - store location - [{ lat: 32.632603, long: -117.084907 }]
 * example - coords -  { lat: 32.659629, lng: -117.064635}
 */
export const calcDistanceByLatLng = (
  storeLocations = [],
  coords = { lat: 32.659629, lng: -117.064635 },
  isDisabled = false
) => {
  if (isDisabled) {
    logger.info('Distance calculation is disabled!!');
  }
  if (!navigator.geolocation) {
    logger.info('Location services not available');
  }

  const calculateWithPositionCallback = pos => {
    const googleSearchAPIKey = getAPIConfig().googleApiKey;
    const origins = `&origins=${pos.coords.latitude},${pos.coords.longitude}`;
    const destinations = `&destinations=${storeLocations[0].lat},${storeLocations[0].long}`;
    const apiUrl = `${
      googleMapConstants.DISTANCE_API
    }${origins}${destinations}&key=${googleSearchAPIKey}`;

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
          const distanceText = allElements[0].distance.text;
          return distanceText.substring(0, distanceText.lastIndexOf(' '));
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
      logger.error(err);
    });
  }
  return null;
};

export default calcDistanceByLatLng;
