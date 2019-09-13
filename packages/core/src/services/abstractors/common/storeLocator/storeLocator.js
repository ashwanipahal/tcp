import { executeStatefulAPICall } from '../../../handler';
import { formatPhoneNumber } from '../../../../utils/formValidation/phoneNumber';
import { parseStoreHours } from '../../../../utils/parseStoreHours';
import { sanitizeEntity } from '../../../../utils';
import endpoints from '../../../endpoints';

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
  return null;
};

export const storeResponseParser = (storeDetails, configs = { requestedQuantity: 0 }) => {
  let { requestedQuantity } = configs;
  let hoursOfOperation;
  let addressLine;
  let storeType;

  // Sometimes addressLine is returned as an array
  // Sometimes addressLine is returned as an object with numerical properties (WHY???)
  // If addressLine is object, convert to array
  if (
    storeDetails.addressLine &&
    typeof storeDetails.addressLine === 'object' &&
    !Array.isArray(storeDetails.addressLine)
  ) {
    addressLine = Object.keys(storeDetails.addressLine).map(key => storeDetails.addressLine[key]);
  }

  // Sometimes storeType is explicitly defined
  // Sometimes storeType needs to be determined using address
  storeType =
    storeDetails.storeType ||
    (addressLine && addressLine[addressLine.length - 1]) ||
    storeDetails.address3 ||
    '';

  // Backend's API structure for stores are never the same, so i am checking a few differant places for storeDetails hours
  if (storeDetails.storehours) {
    hoursOfOperation = storeDetails.storehours.storehours;
  } else if (storeDetails.Attribute && storeDetails.Attribute[0]) {
    hoursOfOperation = JSON.parse(storeDetails.Attribute[0].displayValue || '{}').storehours;
  } else if (storeDetails.attribute) {
    hoursOfOperation = JSON.parse(storeDetails.attribute.displayValue || '{}').storehours;
  }

  // Parse Store Info
  let storeFilteredInfo = {
    // Boss storeDetails info
    storeBossInfo: {
      isBossEligible: storeDetails.isStoreBOSSEligible,
      startDate: storeDetails.bossMinDate,
      endDate: storeDetails.bossMaxDate,
    },
    /** added storeType | also checking if the flag is undefined than the value should be true
     * for default searching without any restriction
     */
    pickupType: {
      isStoreBossSelected:
        storeDetails.isStoreBossSelected !== undefined ? storeDetails.isStoreBossSelected : true,
      isStoreBopisSelected:
        storeDetails.isStoreBopisSelected !== undefined ? storeDetails.isStoreBopisSelected : true,
    },
    distance: storeDetails.distance
      ? parseFloat(storeDetails.distance).toFixed(2)
      : storeDetails.distanceFromUserToStore
      ? parseFloat(storeDetails.distanceFromUserToStore).toFixed(2)
      : null,
    basicInfo: {
      id: (
        storeDetails.uniqueID ||
        storeDetails.uniqueId ||
        storeDetails.storeLocId ||
        storeDetails.storeUniqueID ||
        storeDetails.stLocId
      ).toString(),
      storeName: sanitizeEntity(
        (storeDetails.description && storeDetails.description.displayStoreName) ||
          (storeDetails.Description &&
            storeDetails.Description[0] &&
            storeDetails.Description[0].displayStoreName) ||
          storeDetails.storeName ||
          storeDetails.name ||
          ''
      ),
      isDefault: storeDetails.preferredStore || false,
      address: {
        addressLine1: sanitizeEntity(
          storeDetails.address1 ||
            storeDetails.streetLine1 ||
            (storeDetails.addressLine && storeDetails.addressLine[0])
        ),
        city: storeDetails.city,
        state: storeDetails.stateOrProvinceName || storeDetails.state,
        country: storeDetails.country,
        zipCode: (
          storeDetails.zipCode ||
          storeDetails.postalCode ||
          storeDetails.postalcode ||
          storeDetails.zipcode
        ).trim(),
      },
      phone:
        formatPhoneNumber(storeDetails.telephone1 || storeDetails.phone || storeDetails.phone1) ||
        '',
      coordinates: {
        lat: parseFloat(storeDetails.latitude),
        long: parseFloat(storeDetails.longitude),
      },
    },
    hours: {
      regularHours: [],
      holidayHours: [],
      regularAndHolidayHours: [],
    },
    features: {
      storeType: STORE_TYPES[storeType] || (storeType === 'PLACE' && STORE_TYPES.RETAIL) || '',
      mallType: storeDetails.x_mallType,
      entranceType: storeDetails.x_entranceType,
    },
    productAvailability:
      storeDetails.itemAvailability && storeDetails.itemAvailability[0]
        ? {
            skuId: storeDetails.itemAvailability[0].itemId,
            status:
              storeDetails.itemAvailability[0].qty < requestedQuantity
                ? BOPIS_ITEM_AVAILABILITY.UNAVAILABLE
                : storeDetails.itemAvailability[0].itemStatus === 'AVAILABLE'
                ? BOPIS_ITEM_AVAILABILITY.AVAILABLE
                : storeDetails.itemAvailability[0].itemStatus === 'UNAVAILABLE'
                ? BOPIS_ITEM_AVAILABILITY.UNAVAILABLE
                : BOPIS_ITEM_AVAILABILITY.LIMITED,
            quantity: storeDetails.itemAvailability[0].qty,
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
export const getFavoriteStore = (skuId = null, { lat, long } = {}, variantId, quantity) => {
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
        const favoriteStore = storeResponseParser(storeDetailsResponse, {
          requestedQuantity: quantity,
        });
        return favoriteStore;
      }
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
