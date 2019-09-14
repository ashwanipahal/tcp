/* istanbul ignore file */
/* eslint-disable complexity */
import { executeStatefulAPICall } from '../../../handler';
import { formatPhoneNumber } from '../../../../utils/formValidation/phoneNumber';
import { parseStoreHours } from '../../../../utils/parseStoreHours';
import { sanitizeEntity } from '../../../../utils';
import endpoints from '../../../endpoints';
import { getSuggestedStoreById } from '../../../../components/features/storeLocator/container/StoreLocator.selectors';
import { getPersonalDataState } from '../../../../components/features/account/User/container/User.selectors';
import { BOPIS_ITEM_AVAILABILITY } from '../../../../components/features/storeLocator/StoreLocator.constants';

const DEFAULT_RADIUS = 75;
const STORE_TYPES = {
  RETAIL: 'Retail Store',
  OUTLET: 'Outlet',
};

/**
 * @function errorHandler function to handle all the server side errors.
 * @param {object} err - error object in case server side data send server side validation errors.
 * @returns {object} error object with appropirate error message
 */
const errorHandler = err => {
  return err || null;
};

export const getAddress = storeDetails => {
  const {
    address1,
    streetLine1,
    addressLine,
    city,
    stateOrProvinceName,
    state,
    country,
    zipCode,
    postalCode,
    postalcode,
    zipcode,
  } = storeDetails;
  const addressLine1 = sanitizeEntity(address1 || streetLine1 || (addressLine && addressLine[0]));
  return {
    addressLine1,
    city,
    state: stateOrProvinceName || state,
    country,
    zipCode: (zipCode || postalCode || postalcode || zipcode).trim(),
  };
};

// eslint-disable-next-line sonarjs/cognitive-complexity
export const getBasicInfo = storeDetails => {
  const id = (
    storeDetails.uniqueId ||
    storeDetails.storeLocId ||
    storeDetails.storeUniqueID ||
    storeDetails.stLocId
  ).toString();
  const storeNameVal = sanitizeEntity(
    (storeDetails.description && storeDetails.description.displayStoreName) ||
      (storeDetails.Description &&
        storeDetails.Description[0] &&
        storeDetails.Description[0].displayStoreName) ||
      (storeDetails.storeName || storeDetails.name || '')
  );
  const phoneNumber =
    formatPhoneNumber(storeDetails.telephone1 || storeDetails.phone || storeDetails.phone1) || '';
  return {
    id,
    storeName: storeNameVal,
    isDefault: storeDetails.preferredStore || false,
    address: getAddress(storeDetails),
    phone: phoneNumber,
    coordinates: {
      lat: parseFloat(storeDetails.latitude),
      long: parseFloat(storeDetails.longitude),
    },
  };
};

export const getDistance = ({ distance, distanceFromUserToStore }) => {
  if (distance) {
    return parseFloat(distance).toFixed(2);
  }
  if (distanceFromUserToStore) {
    return parseFloat(distanceFromUserToStore).toFixed(2);
  }
  return null;
};

export const getStoreStatus = (storeDetails, requestedQuantity) => {
  if (storeDetails.itemAvailability[0].qty < requestedQuantity) {
    return BOPIS_ITEM_AVAILABILITY.UNAVAILABLE;
  }
  if (storeDetails.itemAvailability[0].itemStatus === 'AVAILABLE') {
    return BOPIS_ITEM_AVAILABILITY.AVAILABLE;
  }
  if (storeDetails.itemAvailability[0].itemStatus === 'UNAVAILABLE') {
    return BOPIS_ITEM_AVAILABILITY.UNAVAILABLE;
  }
  return BOPIS_ITEM_AVAILABILITY.LIMITED;
};

// eslint-disable-next-line sonarjs/cognitive-complexity
export const storeResponseParser = (storeDetails, configs = { requestedQuantity: 0 }) => {
  const { requestedQuantity } = configs;
  const {
    addressLine,
    storeType,
    address3,
    storehours,
    Attribute,
    attribute,
    isStoreBOSSEligible,
    bossMinDate,
    bossMaxDate,
    isStoreBossSelected,
    isStoreBopisSelected,
    itemAvailability,
  } = storeDetails;
  let hoursOfOperation;
  let addressLineDetail;

  // Sometimes addressLine is returned as an array
  // Sometimes addressLine is returned as an object with numerical properties (WHY???)
  // If addressLine is object, convert to array
  if (addressLine && typeof addressLine === 'object' && !Array.isArray(addressLine)) {
    addressLineDetail = Object.keys(addressLine).map(key => addressLine[key]);
  }

  // Sometimes storeType is explicitly defined
  // Sometimes storeType needs to be determined using address
  const storeTypeDetail =
    storeType ||
    (addressLineDetail && addressLineDetail[addressLineDetail.length - 1]) ||
    address3 ||
    '';

  // Backend's API structure for stores are never the same, so i am checking a few differant places for storeDetails hours
  if (storehours) {
    hoursOfOperation = storehours.storehours;
  }
  if (Attribute && Attribute[0]) {
    hoursOfOperation = JSON.parse(Attribute[0].displayValue || '{}').storehours;
  }
  if (storeDetails.attribute) {
    hoursOfOperation = JSON.parse(attribute.displayValue || '{}').storehours;
  }

  // Parse Store Info
  const storeFilteredInfo = {
    // Boss storeDetails info
    storeBossInfo: {
      isBossEligible: isStoreBOSSEligible,
      startDate: bossMinDate,
      endDate: bossMaxDate,
    },
    /** added storeType | also checking if the flag is undefined than the value should be true
     * for default searching without any restriction
     */
    pickupType: {
      isStoreBossSelected: isStoreBossSelected !== undefined ? isStoreBossSelected : true,
      isStoreBopisSelected: isStoreBopisSelected !== undefined ? isStoreBopisSelected : true,
    },
    distance: getDistance(storeDetails),
    basicInfo: getBasicInfo(storeDetails),
    hours: {
      regularHours: [],
      holidayHours: [],
      regularAndHolidayHours: [],
    },
    features: {
      storeType:
        STORE_TYPES[storeTypeDetail] || (storeTypeDetail === 'PLACE' && STORE_TYPES.RETAIL) || '',
      mallType: storeDetails.x_mallType,
      entranceType: storeDetails.x_entranceType,
    },
    productAvailability:
      itemAvailability && itemAvailability[0]
        ? {
            skuId: itemAvailability[0].itemId,
            status: getStoreStatus(storeDetails, requestedQuantity),
            quantity: itemAvailability[0].qty,
          }
        : {},
  };

  // Parse Store Hours
  if (hoursOfOperation && hoursOfOperation.length) {
    storeFilteredInfo.hours.regularHours = parseStoreHours(hoursOfOperation);
  }
  return storeFilteredInfo;
};

/**
   * @function getFavoriteStore
   * @summary This will get a users favorite store that is saved on their account,
   *  if the user's favorite store doesn't exist then
   *  default store on the basis of lat long of user is fetched.
   * @return empty object if you do not have a default store else you will get back
   * {
        id: 123456789,
        storeName: 'Jersey Garden Mall',
        address: {
          addressLine1: '123 ,
          city: 'Jersey City',
          state: 'NJ,
          zipCode: 07047
        },
        phone: '2012336989',
        coordinates: {
          lat: 40.0583,
          long: -74.4057
        }
      }

  */
export const getFavoriteStore = ({
  skuId = null,
  geoLatLang: { lat, long } = {},
  variantId,
  quantity,
}) => {
  const payloadData = {
    header: {
      action: 'get',
      latitude: lat,
      longitude: long,
      catEntryId: skuId,
      itemPartNumber: variantId,
    },
    body: {
      latitude: lat,
      longitude: long,
      catEntryId: skuId,
      itemPartNumber: variantId,
    },
    webService: endpoints.getFavoriteStore,
  };
  return executeStatefulAPICall(payloadData)
    .then(res => {
      if (res.body && res.body.displayValue) {
        const storeDetailsResponse = {
          ...res.body,
          storehours: JSON.parse(res.body.displayValue),
        };
        return storeResponseParser(storeDetailsResponse, {
          requestedQuantity: quantity,
        });
      }
      return null;
    })
    .catch(errorHandler);
};

/**
 * @function getLocationStores
 * @summary given a lat and lng, and an optional radius, this will get all stores in the given area
 */
export const getLocationStores = ({
  coordinates: { lat, lng },
  maxItems,
  radius = DEFAULT_RADIUS,
}) => {
  const payload = {
    header: {
      latitude: lat,
      longitude: lng,
      radius,
      maxItems,
    },
    body: {},
    webService: endpoints.findStoresbyLatitudeandLongitude,
  };
  return executeStatefulAPICall(payload)
    .then(res => {
      // unknown structure of response may be nested arrays, may not be nested arrays. all depends on how backend is feeling today.
      const fetchedStores =
        res.body.PhysicalStore &&
        res.body.PhysicalStore[0] &&
        (res.body.PhysicalStore[0].uniqueId || res.body.PhysicalStore[0].uniqueID)
          ? res.body.PhysicalStore
          : (res.body.PhysicalStore && res.body.PhysicalStore[0]) || [];

      if (!fetchedStores.length) {
        errorHandler({ errorCode: 'NO_STORES_FOUND' });
      }
      return fetchedStores.map(storeResponseParser);
    })
    .catch(errorHandler);
};

export const setFavoriteStore = (storeId, state) => {
  const personalDataState = getPersonalDataState(state);
  const userId = personalDataState.get('userId');

  const suggestedStore = getSuggestedStoreById(state, storeId);
  const favStore = suggestedStore && {
    ...suggestedStore,
    timeStamp: new Date().getTime(),
    basicInfo: {
      ...suggestedStore.basicInfo,
      isDefault: 1,
    },
  };

  const payloadData = {
    header: {
      action: 'add',
      fromPage: 'StoreLocator',
      userId,
      storeLocId: storeId,
    },
    body: {},
    webService: endpoints.setFavoriteStore,
  };

  return executeStatefulAPICall(payloadData)
    .then(() => {
      return favStore;
    })
    .catch(errorHandler);
};
