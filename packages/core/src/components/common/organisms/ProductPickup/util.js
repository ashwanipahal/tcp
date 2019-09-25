import {
  getMapSliceForFit,
  getMapSliceForColor,
} from '../../../features/browse/ProductListing/molecules/ProductList/utils/productsCommonUtils';

const config = {
  SKU_DETAILS: {
    color: 'color',
    fit: 'fit',
    size: 'size',
    quantity: 'quantity',
    distance: 'distance',
  },
};

/**
 * @method showFitsForProduct
 * @description this method returns the bool value, to show product
 * fits properties
 */
const showFitsForProduct = (productInfo, initialValues) => {
  const currentColorEntry = getMapSliceForColor(productInfo.colorFitsSizesMap, initialValues.color);
  return currentColorEntry && currentColorEntry.hasFits;
};

/**
 * @method validateSkuDetails
 * @description Validate SKU detils if SKU is resolved or not
 */
const validateSkuDetails = (productInfo, initialValues) => {
  // eslint-disable-next-line
  for (let key in initialValues) {
    if (
      !initialValues[key] &&
      (key.toLowerCase() !== config.SKU_DETAILS.fit ||
        (key.toLowerCase() === config.SKU_DETAILS.fit &&
          showFitsForProduct(productInfo, initialValues)))
    ) {
      return false;
    }
  }
  return true;
};

/**
 * @method validateBossEligibility
 * @description checks the bopis product flags for returning the boolean
 * value
 * @param {bool} isBossClearanceProductEnabled this flag is derived through the kill
 * Switch API. If a product is of Clearance then we need to check this kill switch
 * @param {bool} isBossEnabled this flag is a global bopss Enability flag, which is
 * derived from the UserRegisteredInfo API. Backend sends this flag along with
 * validating country and state bopis availability
 * @param {object} miscInfo object data with pickup eligibility of product
 */

function validateBossEligibility({ isBossClearanceProductEnabled, isBossEnabled, miscInfo }) {
  const bossEligibility = isBossEnabled && miscInfo.isBossEligible;
  // adding this check as productDynamicAbstractor and cartDynamicAbstractor return
  // different keys for clearance item identification
  return miscInfo.isClearance || miscInfo.clearanceItem
    ? isBossClearanceProductEnabled && bossEligibility
    : bossEligibility;
}

/**
 * @method validateBopisEligibility
 * @description checks the bopis product flags for returning the boolean
 * value
 * @param {bool} isBopisClearanceProductEnabled this flag is derived through the kill
 * Switch API. If a product is of Clearance then we need to check this kill switch
 * @param {bool} isBopisEnabled this flag is a global bopis Enability flag, which is
 * derived from the UserRegisteredInfo API. Backend sends this flag along with
 * validating country and state bopis availability
 * @param {object} miscInfo object data with pickup eligibility of product
 */
function validateBopisEligibility({ isBopisClearanceProductEnabled, isBopisEnabled, miscInfo }) {
  const bopisEligibility = isBopisEnabled && miscInfo.isBopisEligible;
  // productDynamicAbstractor and cartDynamicAbstractor return different keys for clearance item
  return miscInfo.isClearance || miscInfo.clearanceItem
    ? isBopisClearanceProductEnabled && bopisEligibility
    : bopisEligibility;
}

/**
 * @method isProductOOS
 * @description checks if the selected size variant is having available
 * quantity
 */
function isProductOOS(colorFitsSizesMap, selectedSKu) {
  const currentFitEntry = getMapSliceForFit(colorFitsSizesMap, selectedSKu.color, selectedSKu.Fit);
  if (currentFitEntry && currentFitEntry.sizes) {
    const selectedSKuProductInfo = currentFitEntry.sizes.find(
      size => size.sizeName === selectedSKu.Size
    );
    const maxAvailableProducts = selectedSKuProductInfo ? selectedSKuProductInfo.maxAvailable : 0;

    return maxAvailableProducts < 1;
  }
  return true;
}

/**
 * @method isBOSSProductOOS
 * @description checks if the selected size variant is having available
 * quantity
 */
function isBOSSProductOOS(colorFitsSizesMap, selectedSKu) {
  const currentFitEntry = getMapSliceForFit(colorFitsSizesMap, selectedSKu.color, selectedSKu.Fit);
  if (currentFitEntry && currentFitEntry.sizes) {
    const selectedSKuProductInfo = currentFitEntry.sizes.find(
      size => size.sizeName === selectedSKu.Size
    );
    const maxAvailableBossProducts = selectedSKuProductInfo
      ? selectedSKuProductInfo.maxAvailableBoss
      : 0;

    return maxAvailableBossProducts < 1;
  }
  return true;
}

/*
 * @method numericStringToBool
 * @description this method returns the bool value of string numeric passed
 * @param {string} str the  string numeric value
 */
const numericStringToBool = str => !!+str;

/**
 *
 * @param {object} event the HTML element's element
 * @param {number} key key for which the event needs to be triggered
 * @param {function} method method passed which is to be invoked.
 * @description this method invokes the parameter method received when respective
 * keybord key is triggered
 */

function handleGenericKeyDown(event, key, method) {
  if (event.keyCode === key) {
    method();
  }
  return null;
}

export {
  numericStringToBool,
  validateSkuDetails,
  validateBossEligibility,
  validateBopisEligibility,
  isProductOOS,
  isBOSSProductOOS,
  handleGenericKeyDown,
};
