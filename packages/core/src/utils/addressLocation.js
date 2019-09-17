import { getCacheData, setCacheData } from './localCache.util';
import { requireNamedOnlineModule } from './resourceLoader';

export const getAddressLocationInfo = async address => {
  const googleApiStoredDataObj = await getCacheData('geocode-response', address);
  if (googleApiStoredDataObj) {
    return new Promise(resolve => {
      resolve({
        lat: googleApiStoredDataObj.lat,
        lng: googleApiStoredDataObj.lng,
        country: googleApiStoredDataObj.country,
      });
    });
  }
  return requireNamedOnlineModule('google.maps').then(() => {
    // eslint-disable-next-line no-undef
    const geocoder = new google.maps.Geocoder();
    return new Promise((resolve, reject) => {
      geocoder.geocode({ address }, async (results, status) => {
        if (status === 'OK') {
          const country = results[0].address_components.find(component => {
            return component.types && component.types.find(type => type === 'country');
          });
          const timeStamp = new Date().getTime();
          const storeDataObject = {
            lat: results[0].geometry.location.lat(),
            lng: results[0].geometry.location.lng(),
            country: country && country.short_name,
          };
          await setCacheData({
            key: 'geocode-response',
            storageKey: address,
            storageValue: { ...storeDataObject, timeStamp },
          });
          resolve(storeDataObject);
        } else {
          reject(status);
        }
      });
    });
  });
};

export default getAddressLocationInfo;
