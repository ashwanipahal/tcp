import { executeStatefulAPICall } from '../../../handler';
import endpoints from '../../../endpoints';
import { formatPhoneNumber } from '../../../../utils/formValidation/phoneNumber';
import countriesAndStates from './config/CountriesAndStates';
import { getAPIConfig } from '../../../../utils/utils';

export const errorHandler = err => {
  return err || null;
};

export const getStoreName = store =>
  (store.Description && store.Description[0] && store.Description[0].displayStoreName) || '';

export const getBasicInfo = store => ({
  basicInfo: {
    id: (store.uniqueID || '').trim(),
    storeName: getStoreName(store),
    address: {
      addressLine1: (store.addressLine && store.addressLine[0]) || '',
      city: store.city || '',
      state: store.stateOrProvinceName || '',
      zipCode: (store.postalCode || '').trim(),
    },
    phone: store.telephone1 ? formatPhoneNumber(store.telephone1.trim()) : '',
  },
  isGym: store.brandName ? store.brandName.includes('GYM') : false,
});

export const getStoresByCountry = country => {
  const payload = {
    header: {
      country: country.displayName,
    },
    webService: endpoints.getStoreLocationByCountry,
  };

  return executeStatefulAPICall(payload)
    .then(res => {
      if (res.body && res.body.PhysicalStore) {
        const stateMapping = {};
        const brandID = getAPIConfig().brandId.toLowerCase();
        res.body.PhysicalStore.forEach(store => {
          /**
           * Checking config brand name on client and then check if the response also have
           * the same brand name then only push into the array otherwise skip
           *
           * Note: Checking configured brand name inside response brand names array as it coming as array more than
           * one brand can reside.
           *
           *
           */
          const responseBrandNames = store.brandName || [];
          if (responseBrandNames.find(brand => brand.toLowerCase() === brandID)) {
            if (!stateMapping[store.stateOrProvinceName]) {
              stateMapping[store.stateOrProvinceName] = [];
            }
            stateMapping[store.stateOrProvinceName].push(getBasicInfo(store));
          }
        });
        return Object.keys(stateMapping)
          .sort()
          .map(stateId => {
            // Backend does not have the full state name store so we must map them localy
            const state = countriesAndStates.countriesStatesTable[country.id].find(
              cState => cState.id === stateId
            );
            return {
              id: stateId,
              displayName: state ? state.fullName : stateId,
              storesList: stateMapping[stateId],
            };
          });
      }
      return null;
    })
    .catch(errorHandler);
};
