export function parseBoolean(bool) {
  return bool === true || bool === '1' || (bool || '').toUpperCase() === 'TRUE';
}

/*
 * @method numericStringToBool
 * @description this method returns the bool value of string numeric passed
 * @param {string} str the  string numeric value
 */
const numericStringToBool = str => !!+str;

/**
 *
 * @param {object} bossDisabledFlags carries the boss disability flags -
 * bossCategoryDisabled,
 * bossProductDisabled
 * @returns the disability boolean value
 */
export const isBossProduct = bossDisabledFlags => {
  const { bossCategoryDisabled, bossProductDisabled } = bossDisabledFlags;
  return !(numericStringToBool(bossCategoryDisabled) || numericStringToBool(bossProductDisabled));
};

/**
 * @function isBopisProduct
 * @summary This BOPIS logic is to validate if product/color variant is eligible for BOPIS
 * product is a color variant object of a product.
 **/
export const isBopisProduct = (isUSStore, product) => {
  let isOnlineOnly;
  if (isUSStore) {
    isOnlineOnly =
      (product.TCPWebOnlyFlagUSStore && parseBoolean(product.TCPWebOnlyFlagUSStore)) || false; //validate if product is online only so it is not BOPIS eligible
  } else {
    isOnlineOnly =
      (product.TCPWebOnlyFlagCanadaStore && parseBoolean(product.TCPWebOnlyFlagCanadaStore)) ||
      false;
  }
  return !isOnlineOnly;
};

export const getSwatchImgPath = (id, excludeExtension) => {
  const imgHostDomain = ''; //routingInfoStoreView.getOriginImgHostSetting(this.store.getState());
  return `${imgHostDomain}/wcsstore/GlobalSAS/images/tcp/products/swatches/${id}${
    excludeExtension ? '' : '.jpg'
  }`;
};

export const getProductImgPath = (id, excludeExtension) => {
  const imgHostDomain = ''; //routingInfoStoreView.getOriginImgHostSetting(this.store.getState());

  return {
    125: `${imgHostDomain}/wcsstore/GlobalSAS/images/tcp/products/125/${id}${
      excludeExtension ? '' : '.jpg'
    }`,
    380: `${imgHostDomain}/wcsstore/GlobalSAS/images/tcp/products/380/${id}${
      excludeExtension ? '' : '.jpg'
    }`,
    500: `${imgHostDomain}/wcsstore/GlobalSAS/images/tcp/products/500/${id}${
      excludeExtension ? '' : '.jpg'
    }`,
    900: `${imgHostDomain}/wcsstore/GlobalSAS/images/tcp/products/900/${id}${
      excludeExtension ? '' : '.jpg'
    }`,
  };
};

export const getImgPath = (id, excludeExtension) => {
  return {
    colorSwatch: getSwatchImgPath(id, excludeExtension),
    productImages: getProductImgPath(id, excludeExtension),
  };
};

/**
 * @return the first element in the colorFitsSizesMap array that corresponds to the given colorName.
 */
export function getMapSliceForColor(colorFitsSizesMap, colorName) {
  return colorFitsSizesMap.find(entry => entry.color.name === colorName);
}

/**
 * @return the first element in the getMapSliceForColor(colorFitsSizesMap, colorName).fits array that corresponds to the given fit.
 * If there are no fits associated with the given color, then the first element in the array is returned.
 */
export function getMapSliceForFit(colorFitsSizesMap, colorName, fitName) {
  const currentColorEntry = getMapSliceForColor(colorFitsSizesMap, colorName);
  if (!currentColorEntry) {
    return;
  }
  if (currentColorEntry.hasFits) {
    return currentColorEntry.fits.find(entry => entry.fitName === fitName);
  } else {
    return currentColorEntry.fits[0];
  }
}

export function getMapSliceForSize(colorFitsSizesMap, colorName, fitName, sizeName) {
  const currentFitEntry = getMapSliceForFit(colorFitsSizesMap, colorName, fitName);
  if (!currentFitEntry) return;
  return currentFitEntry.sizes.find(entry => entry.sizeName === sizeName);
}

export function getSkuId(colorFitsSizesMap, color, fit, size) {
  const currentSizeEntry = getMapSliceForSize(colorFitsSizesMap, color, fit, size);
  return currentSizeEntry && currentSizeEntry.skuId;
}

/**
 * @return the variant id selected by the user.
 */
export function getVariantId(colorFitsSizesMap, color, fit, size) {
  const currentSizeEntry = getMapSliceForSize(colorFitsSizesMap, color, fit, size);
  return currentSizeEntry && currentSizeEntry.variantId;
}
