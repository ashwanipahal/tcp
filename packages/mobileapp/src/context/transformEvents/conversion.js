import get from 'lodash/get';
import getProducts from './clickEvents/eventsUtility';

/**
 * This object will contain mapping of constants variables
 */
const staticConversion = {
  prop27: 'D=mid',
  prop28: '2.10.0',
  eVar10: 'D=pageName',
  eVar33: 'D=pageName',
  eVar29: 'D=c6',
  eVar50: 'D=c11',
  eVar51: 'D=c24',
};

/**
 * This object will contain mapping for standard variables other than
 * eVar and props
 */
const standardConversion = {
  pageName: 'pageName',
  pageType: 'pageType',
  currencyCode: 'currencyCode',
  events: 'eventData.customEvents',
  products: 'eventData.products',
};

const varConversion = {
  eVar1: 'siteType',
  eVar7: 'pageLocale',
  eVar3: 'orderId',
  eVar4: 'paymentMethod',
  eVar8: 'storeId',
  eVar13: 'customerType',
  eVar28: 'pageShortName',
  eVar31: 'userEmailAddress',
  eVar32: 'currencyCode',
  eVar65: 'pageShortName',
  eVar68: 'billingZip',
  eVar73: 'orderSubtotal',
  eVar74: 'pageDate',
  eVar86: 'cartType',
  eVar93: 'customerId',
  eVar98: 'checkoutType',
};

const propConversion = {
  prop2: 'pageType',
  prop4: 'pageSection',
  prop5: 'pageSubSubSection',
  prop6: 'countryId',
  prop21: 'pageNavigationText',
  prop29: 'storeId',
};

/**
 * This function will return dataLayer key corresponding to event key
 */
const getConversionKey = key => {
  if (/eVar/.test(key)) {
    return varConversion[key];
  }

  if (/prop/.test(key)) {
    return propConversion[key];
  }

  return standardConversion[key];
};

/**
 * This function will return value of the event key
 */
const getConversionValue = key => {
  /* eslint-disable */
  if (staticConversion[key]) {
    return staticConversion[key];
  }
  const dataLayer = global._dataLayer;
  const dataLayerKey = getConversionKey(key);
  let convertedData = get(dataLayer, dataLayerKey, '');
  if (staticConversion[key]) {
    convertedData = staticConversion[key];
  }

  if (key === 'products') {
    return getProducts(convertedData);
  }
  return convertedData;
};

export default getConversionValue;
