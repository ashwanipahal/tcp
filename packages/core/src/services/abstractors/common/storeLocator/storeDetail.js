import { executeStatefulAPICall } from '../../../handler';
import { parseStoreHours } from '../../../../utils/parseStoreHours';
import endpoints from '../../../endpoints';
import { getBasicInfo } from './storeLocator';

const STORE_TYPES = {
  RETAIL: 'Retail Store',
  OUTLET: 'Outlet',
};

const BRAND_TYPE = {
  gymboree: 'GYM',
  tcp: 'TCP',
};

/**
 * @function errorHandler function to handle all the server side errors.
 * @param {object} err - error object in case server side data send server side validation errors.
 * @returns {object} error object with appropirate error message
 */
const errorHandler = err => {
  return err || null;
};

/**
 * @function hasGymboreeStores to check and return a boolean value if Gymboree brand.
 * @param {object} storeInfo - store object
 * @returns {boolean} returns true is store is a gymboree store.
 */
const hasGymboreeStores = storeInfo => {
  const gymStoreArr = storeInfo.Attribute || storeInfo.brands;
  const gymStore = gymStoreArr.filter(
    attribute =>
      (typeof attribute === 'object' &&
        attribute.name === 'STORE_BRAND_TYPE' &&
        attribute.value === BRAND_TYPE.gymboree) ||
      attribute === BRAND_TYPE.gymboree
  );

  return gymStore.length > 0;
};

export const getCurrentStoreInfoApi = storeId => {
  const payloadData = {
    header: {
      stlocId: storeId,
    },
    webService: endpoints.getStoreInfo,
  };
  const formatStoreType = storeData => {
    const { storeType, addressLine } = storeData;
    return storeType || (addressLine && addressLine[addressLine.length - 1]) || '';
  };

  return (
    executeStatefulAPICall(payloadData)
      // eslint-disable-next-line complexity
      .then(res => {
        if (res.body.getStoreResponse.PhysicalStore[0] || res.body.PhysicalStore[0]) {
          const storeInfo = res.body.getStoreResponse.PhysicalStore[0] || res.body.PhysicalStore[0];
          let hoursOfOperation = [];
          if (storeInfo.Attribute) {
            /**
             * The Attributes array receiving from API contains more than one object with data,
             * till now we were using first object of array as store hours were only available in the
             * first object.
             * In current API changes store hours is not fixed to the first attribute object hence
             * changing filtering attributes for the object containing store hours.
             */
            const storeHours = storeInfo.Attribute.filter(
              attribute => attribute.name === 'STORE_HOURS_JSON'
            );
            hoursOfOperation = JSON.parse(storeHours[0].displayValue || '{}').storehours || [];
          }
          const storeType = formatStoreType(storeInfo);

          const parsedResponse = {
            basicInfo: {
              ...getBasicInfo(storeInfo),
              x_stloc: storeInfo.x_stloc
                ? JSON.parse(storeInfo.x_stloc)
                : { heading: '', bodyCopy: '', pageTitle: '' },
            },
            isGym: hasGymboreeStores(storeInfo),
            hours: {
              regularHours: [],
              holidayHours: [],
              regularAndHolidayHours: [],
            },
            features: {
              storeType:
                STORE_TYPES[storeType] || (storeType === 'PLACE' && STORE_TYPES.RETAIL) || '',
              mallType: storeInfo.x_mallType,
              entranceType: storeInfo.x_entranceType,
              isBopisAvailable:
                res.body.getStoreResponse && res.body.getStoreResponse.isBopisAvailable,
            },
          };
          if (hoursOfOperation.length) {
            parsedResponse.hours.regularHours = parseStoreHours(hoursOfOperation);
          }
          return parsedResponse;
        }
        return null;
      })
      .catch(errorHandler)
  );
};

export const cleanStr = str => str.replace(/-| |\./g, '');

export const getNearByStoreApi = payload => {
  const { storeLocationId, getNearby, maxDistance, maxStoreCount, latitude, longitude } = payload;
  const payloadData = {
    header: {
      stlocId: storeLocationId,
      latitude,
      longitude,
    },
    body: {
      distance: maxDistance || 25,
      maxStores: maxStoreCount || 5,
    },
    webService: endpoints.getNearByStore,
  };
  return executeStatefulAPICall(payloadData)
    .then(res => {
      const response = res.body;
      const parsedStoreInfo = {};
      const nearByStores = getNearby && response.getStoreLocatorByLatLngResponse.result;
      const filteredNearByStores = getNearby && nearByStores;
      parsedStoreInfo.nearByStores = filteredNearByStores.map(fStore => {
        const nearbyStoreParsedInfo = {
          basicInfo: getBasicInfo(fStore),
          hours: {
            regularHours: [],
            holidayHours: [],
            regularAndHolidayHours: [],
          },
          isGym: hasGymboreeStores(fStore),
          features: {
            storeType:
              (fStore.storeType === 'PLACE' ? STORE_TYPES.RETAIL : STORE_TYPES[fStore.storeType]) ||
              '',
            redirectURL: `${cleanStr(fStore.storeName)}-${cleanStr(fStore.city)}-${cleanStr(
              fStore.streetLine1
            )}-${fStore.state}-${fStore.storeUniqueID}`,
          },
        };
        if (fStore.storehours.storehours) {
          nearbyStoreParsedInfo.hours.regularHours = parseStoreHours(fStore.storehours.storehours);
        }
        return nearbyStoreParsedInfo;
      });

      return parsedStoreInfo;
    })
    .catch(errorHandler);
};
