
import superagent from 'superagent';
import { getAPIConfig } from '@tcp/core/src/utils';

const  GOOGLE_SEARCH_API_ENDPOINT = 'https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=';

export const getAddressLocationInfo = async address => {
  const googleSearchAPIKey = getAPIConfig().googleApiKey;
  const apiUrl = `${GOOGLE_SEARCH_API_ENDPOINT}${address}&inputtype=textquery&fields=geometry&key=${googleSearchAPIKey}`;
  return new Promise((resolve) => {
    superagent
    .get(apiUrl)
    .accept('application/json')
    .end((err, res) => {
      try {
        const { lat, lng } = res.body.candidates[0].geometry.location;
        return resolve({
            lat,
            lng,
            country: 'US',
        });
      } catch (error) {
        return error;
      }
    });
  });
};

export default getAddressLocationInfo;
