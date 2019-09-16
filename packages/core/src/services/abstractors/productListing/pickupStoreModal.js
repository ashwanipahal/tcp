/* eslint-disable */
import { executeStatefulAPICall } from '../../handler';
import endpoints from '../../endpoints';
import { sanitizeEntity, formatPhone, parseStoreHours } from '../../../utils';

export const BOPIS_ITEM_AVAILABILITY = {
  AVAILABLE: 'OK',
  LIMITED: 'LIMITED',
  UNAVAILABLE: 'UNAVAILABLE',
};

export const STORE_TYPES = {
  RETAIL: 'Retail Store',
  OUTLET: 'Outlet',
};

/** @function storeAPIParser
 *   @summary This is the main function that should be used when trying to parse backends apis that return store information
 *   @param {Object} store - The store object exactly how backend sends it in their API
 *   @param {Object} configs - options to apply, somtimes we want some conditionaly set values
 *   @param {Number} configs.requestedQuantity - if passed this will affect a store's product status flag if not passed we will take the as its status from the API, (itemAvailability.qty < requestedQuantity) ? AVAILABILITY.UNAVAILABLE : AVAILABILITY.OK
 */

// eslint-disable-next-line
function storeAPIParser(store, configs = { requestedQuantity: 0 }) {
  const { requestedQuantity } = configs;
  let hoursOfOperation;
  let addressLine;

  // Sometimes addressLine is returned as an array
  // Sometimes addressLine is returned as an object with numerical properties (WHY???)
  // If addressLine is object, convert to array
  if (
    store.addressLine &&
    typeof store.addressLine === 'object' &&
    !Array.isArray(store.addressLine)
  ) {
    addressLine = Object.keys(store.addressLine).map(key => store.addressLine[key]);
  }

  // Sometimes storeType is explicitly defined
  // Sometimes storeType needs to be determined using address
  const storeType =
    store.storeType || (addressLine && addressLine[addressLine.length - 1]) || store.address3 || '';

  // Backend's API structure for stores are never the same, so i am checking a few differant places for store hours
  if (store.storehours) {
    hoursOfOperation = store.storehours.storehours;
  } else if (store.Attribute && store.Attribute[0]) {
    hoursOfOperation = JSON.parse(store.Attribute[0].displayValue || '{}').storehours;
  } else if (store.attribute) {
    hoursOfOperation = JSON.parse(store.attribute.displayValue || '{}').storehours;
  }

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
    distance: store.distance
      ? parseFloat(store.distance).toFixed(2)
      : store.distanceFromUserToStore
      ? parseFloat(store.distanceFromUserToStore).toFixed(2)
      : null,
    basicInfo: {
      id: (
        store.uniqueID ||
        store.uniqueId ||
        store.storeLocId ||
        store.storeUniqueID ||
        store.stLocId
      ).toString(),
      storeName: sanitizeEntity(
        (store.description && store.description.displayStoreName) ||
          (store.Description && store.Description[0] && store.Description[0].displayStoreName) ||
          store.storeName ||
          store.name ||
          ''
      ),
      isDefault: store.preferredStore || false,
      address: {
        addressLine1: sanitizeEntity(
          store.address1 || store.streetLine1 || (store.addressLine && store.addressLine[0])
        ),
        city: store.city,
        state: store.stateOrProvinceName || store.state,
        country: store.country,
        zipCode: (store.zipCode || store.postalCode || store.postalcode || store.zipcode).trim(),
      },
      phone: formatPhone(store.telephone1 || store.phone || store.phone1) || '',
      coordinates: {
        lat: parseFloat(store.latitude),
        long: parseFloat(store.longitude),
      },
    },
    hours: {
      regularHours: [],
      holidayHours: [],
      regularAndHolidayHours: [],
    },
    features: {
      storeType: STORE_TYPES[storeType] || (storeType === 'PLACE' && STORE_TYPES.RETAIL) || '',
      mallType: store.x_mallType,
      entranceType: store.x_entranceType,
    },
    productAvailability:
      store.itemAvailability && store.itemAvailability[0]
        ? {
            skuId: store.itemAvailability[0].itemId,
            status:
              store.itemAvailability[0].qty < requestedQuantity
                ? BOPIS_ITEM_AVAILABILITY.UNAVAILABLE
                : store.itemAvailability[0].itemStatus === 'AVAILABLE'
                ? BOPIS_ITEM_AVAILABILITY.AVAILABLE
                : store.itemAvailability[0].itemStatus === 'UNAVAILABLE'
                ? BOPIS_ITEM_AVAILABILITY.UNAVAILABLE
                : BOPIS_ITEM_AVAILABILITY.LIMITED,
            quantity: store.itemAvailability[0].qty,
          }
        : {},
  };

  // Parse Store Hours
  if (hoursOfOperation && hoursOfOperation.length) {
    storeFilteredInfo.hours.regularHours = parseStoreHours(hoursOfOperation);
  }

  return storeFilteredInfo;
}

const submitGetBopisSearchByLatLng = ({ locationPromise }) => {
  // this.store.dispatch(getSetSuggestedStoresActn(EMPTY_ARRAY));     // clear previous search results
  console.log('in the submitGetBopisSearchByLatLng', locationPromise);
  return locationPromise.then(location => {
    return location;
    // const isCanada = sitesAndCountriesStoreView.getIsCanada(this.store.getState());
    // //Validation to check if search is for same country, else show error message.
    //   if (location && location.country.toLowerCase() === 'us' && isCanada) {
    //     throw new SubmissionError(ERRORS_MAP.ERROR_MESSAGES_BOPIS.caPostalCode);
    //   } else if (location && location.country.toLowerCase() === 'ca' && !isCanada) {
    //     throw new SubmissionError(ERRORS_MAP.ERROR_MESSAGES_BOPIS.usZipCode);
    //   }
    // return location;
  });
  // .then((location) => this.tcpStoresAbstractor.getStoresPlusInventorybyLatLng(skuId, quantity, distance, location.lat(), location.lng(), location.country, variantId))
  // .then((searchResults) => {
  //   this.store.dispatch(getSetSuggestedStoresActn(searchResults));
  //   if (!searchResults.length) {
  //     throw new SubmissionError(ERRORS_MAP.ERROR_MESSAGES_BOPIS.noAddressFound);
  //   }
  //   /** distance calculated based of user input, not user location
  //   calculateLocationDistances(this.vendorAbstractors.calcDistanceByLatLng, searchResults).then((distances) => {
  //     this.store.dispatch(getSetSuggestedStoresActn(searchResults.map((location, index) => ({...location, distance: distances[index]}))));
  //   });
  //   */
  // }).catch((err) => {
  //   if (err && err === ERRORS_MAP.ERROR_MESSAGES_BOPIS.zeroResults) { //If google geo location is not able to find locations related to address search then responds with ZERO_RESULTS message
  //     throw new SubmissionError({
  //       _error: ERRORS_MAP.ERROR_MESSAGES_BOPIS.noAddressFound
  //     });
  //   } else if (err && err.errors) {
  //     throw new SubmissionError({
  //       _error: err.errors
  //     });
  //   }
  //   throw getSubmissionError(this.store, 'submitGetBopisSearchByLatLng', err);
  // });
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

  return executeStatefulAPICall(payload)
    .then(res => {
      // if (this.apiHelper.responseContainsErrors(res)) {
      //   // throw new ServiceResponseError(res);
      //   console.log('error');
      // }
      const stores = res.body.result;
      if (stores && stores.length) {
        return stores.map(store => storeAPIParser(store, { requestedQuantity: quantity }));
      }
      return [];
    })
    .catch(err => {
      console.log(err);
    });
};

export default submitGetBopisSearchByLatLng;
