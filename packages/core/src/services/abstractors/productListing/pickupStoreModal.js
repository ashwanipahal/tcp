import { executeStatefulAPICall } from '../../handler';
import endpoints from '../../endpoints';
import { sanitizeEntity, formatPhone, parseStoreHours, isCanada } from '../../../utils';
import {
  responseContainsErrors,
  ServiceResponseError,
  getFormattedError,
} from '../../../utils/errorMessage.util';

const ERROR_MESSAGES_BOPIS = {
  caPostalCode: 'Please enter a Canadian Postal Code',
  usZipCode: 'Please enter a US Zip Code',
  zeroResults: 'ZERO_RESULTS',
  noAddressFound: 'We were unable to find the address you typed, please try again',
  selectSize: 'Please select a size',
  storeSearchException: 'Oops, something went wrong, Please retry',
};

export const BOPIS_ITEM_AVAILABILITY = {
  AVAILABLE: 'OK',
  LIMITED: 'LIMITED',
  UNAVAILABLE: 'UNAVAILABLE',
};

export const STORE_TYPES = {
  RETAIL: 'Retail Store',
  OUTLET: 'Outlet',
};

const shouldFetchAddressLine = store => {
  return (
    store.addressLine && typeof store.addressLine === 'object' && !Array.isArray(store.addressLine)
  );
};

const fetchStoreType = (store, addressLine) => {
  return (
    store.storeType || (addressLine && addressLine[addressLine.length - 1]) || store.address3 || ''
  );
};

const getHoursOfOperation = store => {
  let hoursOfOperation;
  // Backend's API structure for stores are never the same, so i am checking a few differant places for store hours
  if (store.storehours) {
    hoursOfOperation = store.storehours.storehours;
  } else if (store.Attribute && store.Attribute[0]) {
    hoursOfOperation = JSON.parse(store.Attribute[0].displayValue || '{}').storehours;
  } else if (store.attribute) {
    hoursOfOperation = JSON.parse(store.attribute.displayValue || '{}').storehours;
  }
  return hoursOfOperation;
};

const getStoreType = storeType => {
  return STORE_TYPES[storeType] || (storeType === 'PLACE' && STORE_TYPES.RETAIL) || '';
};

const basicInfoId = store => {
  return (
    store.uniqueID ||
    store.uniqueId ||
    store.storeLocId ||
    store.storeUniqueID ||
    store.stLocId
  ).toString();
};

const getIsDefault = preferredStore => {
  return preferredStore || false;
};

const getStoreAddress = store => {
  return store.address1 || store.streetLine1 || (store.addressLine && store.addressLine[0]);
};

const getState = store => {
  return store.stateOrProvinceName || store.state;
};

const getZipcode = store => {
  return (store.zipCode || store.postalCode || store.postalcode || store.zipcode).trim();
};

const getStoreName = store => {
  return (
    (store.description && store.description.displayStoreName) ||
    (store.Description && store.Description[0] && store.Description[0].displayStoreName) ||
    store.storeName ||
    store.name ||
    ''
  );
};
const getBasicInfo = store => {
  return {
    id: basicInfoId(store),
    storeName: sanitizeEntity(getStoreName(store)),
    isDefault: getIsDefault(store.preferredStore),
    address: {
      addressLine1: sanitizeEntity(getStoreAddress(store)),
      city: store.city,
      state: getState(store),
      country: store.country,
      zipCode: getZipcode(store),
    },
    phone: formatPhone(store.telephone1 || store.phone || store.phone1) || '',
    coordinates: {
      lat: parseFloat(store.latitude),
      long: parseFloat(store.longitude),
    },
  };
};

const getProductAvailability = (store, altProductAvailability1, requestedQuantity) => {
  return store.itemAvailability && store.itemAvailability[0]
    ? {
        skuId: store.itemAvailability[0].itemId,
        status:
          store.itemAvailability[0].qty < requestedQuantity
            ? BOPIS_ITEM_AVAILABILITY.UNAVAILABLE
            : altProductAvailability1,
        quantity: store.itemAvailability[0].qty,
      }
    : {};
};

/** @function storeAPIParser
 *   @summary This is the main function that should be used when trying to parse backends apis that return store information
 *   @param {Object} store - The store object exactly how backend sends it in their API
 *   @param {Object} configs - options to apply, somtimes we want some conditionaly set values
 *   @param {Number} configs.requestedQuantity - if passed this will affect a store's product status flag if not passed we will take the as its status from the API, (itemAvailability.qty < requestedQuantity) ? AVAILABILITY.UNAVAILABLE : AVAILABILITY.OK
 */

function storeAPIParser(store, configs = { requestedQuantity: 0 }) {
  const { requestedQuantity } = configs;
  let addressLine;

  // Sometimes addressLine is returned as an array
  // Sometimes addressLine is returned as an object with numerical properties (WHY???)
  // If addressLine is object, convert to array
  if (shouldFetchAddressLine(store)) {
    addressLine = Object.keys(store.addressLine).map(key => store.addressLine[key]);
  }

  // Sometimes storeType is explicitly defined
  // Sometimes storeType needs to be determined using address
  const storeType = fetchStoreType(store, addressLine);
  const hoursOfOperation = getHoursOfOperation(store);

  const distanceAlt = store.distanceFromUserToStore
    ? parseFloat(store.distanceFromUserToStore).toFixed(2)
    : null;

  const altProductAvailability2 =
    store.itemAvailability[0].itemStatus === 'UNAVAILABLE'
      ? BOPIS_ITEM_AVAILABILITY.UNAVAILABLE
      : BOPIS_ITEM_AVAILABILITY.LIMITED;

  const altProductAvailability1 =
    store.itemAvailability[0].itemStatus === 'AVAILABLE'
      ? BOPIS_ITEM_AVAILABILITY.AVAILABLE
      : altProductAvailability2;

  // Parse Store Info
  const storeFilteredInfo = {
    // Boss store info
    storeBossInfo: {
      isBossEligible: store.isStoreBOSSEligible,
      startDate: store.bossMinDate,
      endDate: store.bossMaxDate,
    },
    /** added storeType | also checking if the flag is undefined than the value should be true
     * for default searching without any restriction
     */
    pickupType: {
      isStoreBossSelected:
        store.isStoreBossSelected !== undefined ? store.isStoreBossSelected : true,
      isStoreBopisSelected:
        store.isStoreBopisSelected !== undefined ? store.isStoreBopisSelected : true,
    },
    distance: store.distance ? parseFloat(store.distance).toFixed(2) : distanceAlt,
    basicInfo: getBasicInfo(store),
    hours: {
      regularHours: [],
      holidayHours: [],
      regularAndHolidayHours: [],
    },
    features: {
      storeType: getStoreType(storeType),
      mallType: store.x_mallType,
      entranceType: store.x_entranceType,
    },
    productAvailability: getProductAvailability(store, altProductAvailability1, requestedQuantity),
  };

  // Parse Store Hours
  if (hoursOfOperation && hoursOfOperation.length) {
    storeFilteredInfo.hours.regularHours = parseStoreHours(hoursOfOperation);
  }

  return storeFilteredInfo;
}

export const submitGetBopisSearchByLatLng = ({ locationPromise }) => {
  return locationPromise.then(location => {
    try {
      let errorMessage = '';
      if (location.error === ERROR_MESSAGES_BOPIS.zeroResults) {
        return { errorMessage: ERROR_MESSAGES_BOPIS.noAddressFound };
      }
      // Validation to check if search is for same country, else show error message.
      if (location && location.country.toLowerCase() === 'us' && isCanada()) {
        errorMessage = ERROR_MESSAGES_BOPIS.caPostalCode;
      } else if (location && location.country.toLowerCase() === 'ca' && !isCanada()) {
        errorMessage = ERROR_MESSAGES_BOPIS.usZipCode;
      }
      return { location, errorMessage };
    } catch (e) {
      return { location, errorMessage: e };
    }
  });
};

/**
 * @function getStoresPlusInventorybyLatLng
 * @summary
 */
export const getStoresPlusInventorybyLatLng = ({
  skuId,
  quantity,
  distance,
  lat,
  lng,
  country,
  variantId,
}) => {
  const countryCode =
    !country || country === undefined || country === 'PR' || country === 'pr' ? 'US' : country;
  const payload = {
    header: {
      latitude: lat,
      longitude: lng,
      catentryId: skuId,
      country: countryCode,
      sType: 'BOPIS',
      itemPartNumber: variantId,
    },
    body: {
      latitude: lat,
      longitude: lng,
      catentryId: skuId,
      distance: distance || 75,
      country: countryCode,
      sType: 'BOPIS',
      itemPartNumber: variantId,
    },
    webService: endpoints.getStoreandProductInventoryInfo,
  };
  let apiError = { error: ERROR_MESSAGES_BOPIS.noAddressFound };
  return executeStatefulAPICall(payload)
    .then(res => {
      const stores = res.body && res.body.result;
      if (stores && stores.length) {
        return {
          stores: stores.map(store => storeAPIParser(store, { requestedQuantity: quantity })),
        };
      }
      apiError = { error: ERROR_MESSAGES_BOPIS.noAddressFound };
      return { error: apiError.error, stores: [] };
    })
    .catch(err => {
      if (err && err === ERROR_MESSAGES_BOPIS.zeroResults) {
        // If google geo location is not able to find locations related to address search then responds with ZERO_RESULTS message
        apiError = { error: ERROR_MESSAGES_BOPIS.noAddressFound };
      } else if (err && err.errors) {
        apiError = { error: err.errors };
      }
    });
};

export const getCartStoresPlusInventory = ({ skuId, quantity, variantId }) => {
  const payload = {
    header: {
      catentryId: skuId,
      itemPartNumber: variantId,
    },
    webService: endpoints.getUserCartStoresAndInventory,
  };
  return executeStatefulAPICall(payload)
    .then(res => {
      if (responseContainsErrors(res)) {
        throw new ServiceResponseError(res);
      } else {
        const stores = res.body.response;
        if (stores && stores.length) {
          return stores.map(store => storeAPIParser(store, { requestedQuantity: quantity }));
        }
        return [];
      }
    })
    .catch(err => {
      throw getFormattedError(err);
    });
};
