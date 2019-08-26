/** @module productsCommonUtils
 * @summary product related utility functions.
 *
 * @author Ben
 */
import { isEmpty } from 'lodash';
// import { getClearanceString } from 'service/WebAPIServiceAbstractors/parsers/productsParser';

/* Below functions are used to check whether to show/hide clearance/New Arrivals/Online Only badges in both en and translated sites.
Doing this as motion point is translating the categories in the redux store */
/* End of show/hide badge methods */

/**
 * @return the first element in the getMapSliceForColor(colorFitsSizesMap, colorName).fits array that corresponds to the given fit.
 * If there are no fits associated with the given color, then the first element in the array is returned.
 */
export function getMapSliceForFit(colorFitsSizesMap, colorName, fitName) {
  // eslint-disable-next-line
  const currentColorEntry = getMapSliceForColor(colorFitsSizesMap, colorName);
  if (!currentColorEntry) {
    return;
  }
  if (currentColorEntry.hasFits) {
    // eslint-disable-next-line
    return currentColorEntry.fits.find(entry => entry.fitName === fitName);
  }
  // eslint-disable-next-line
  return currentColorEntry.fits[0];
}

export function getMapSliceForSize(colorFitsSizesMap, colorName, fitName, sizeName) {
  const currentFitEntry = getMapSliceForFit(colorFitsSizesMap, colorName, fitName);
  if (!currentFitEntry) return;
  // eslint-disable-next-line
  return currentFitEntry.sizes.find(entry => entry.sizeName === sizeName);
}

/**
 * @return the first element in the colorFitsSizesMap array that corresponds to the given colorName.
 */
export function getMapSliceForColor(colorFitsSizesMap, colorName) {
  return colorFitsSizesMap.find(entry => entry.color.name === colorName);
}

export function getIconImageForColor(productInfo, colorId) {
  if (!productInfo.imagesByColor) return null;

  const imagesByColorEntry =
    productInfo.imagesByColor[colorId] ||
    productInfo.imagesByColor[Object.keys(productInfo.imagesByColor)[0]];
  return imagesByColorEntry.extraImages && imagesByColorEntry.extraImages[0]
    ? imagesByColorEntry.extraImages[0].iconSizeImageUrl
    : imagesByColorEntry.basicImageUrl;
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

/**
 * Returns the list and offer prices corresponding to the sku with the given color, fit and size.
 */
export function getPrices(productInfo, color, fit, size) {
  const currentSizeEntry = getMapSliceForSize(productInfo.colorFitsSizesMap, color, fit, size);
  if (currentSizeEntry && currentSizeEntry.listPrice) {
    return { listPrice: currentSizeEntry.listPrice, offerPrice: currentSizeEntry.offerPrice };
  }

  const currentColorEntry = getMapSliceForColor(productInfo.colorFitsSizesMap, color);
  if (currentColorEntry && currentColorEntry.listPrice) {
    return { listPrice: currentColorEntry.listPrice, offerPrice: currentColorEntry.offerPrice };
  }

  return { listPrice: productInfo.listPrice, offerPrice: productInfo.offerPrice };
}

/**
 * Returns the list and offer prices corresponding to the sku with the given color, fit and size.
 */
export function getPricesWithRange(productInfo, color, fit, size, isSelectedSizeDisabled) {
  const currentSizeEntry = getMapSliceForSize(productInfo.colorFitsSizesMap, color, fit, size);
  if (currentSizeEntry && currentSizeEntry.listPrice && !isSelectedSizeDisabled) {
    return { listPrice: currentSizeEntry.listPrice, offerPrice: currentSizeEntry.offerPrice };
  }

  return {
    listPrice: productInfo.lowListPrice,
    offerPrice: productInfo.lowOfferPrice,
    highListPrice: productInfo.highListPrice || null,
    highOfferPrice: productInfo.highOfferPrice || null,
  };
}

/**
 * @return the first element in the colorFitsSizesMap array that corresponds to the given colorProductId.
 */
export function getMapSliceForColorProductId(colorFitsSizesMap, colorProductId) {
  const selectedProduct = colorFitsSizesMap.find(
    entry => entry.colorProductId === colorProductId || entry.colorDisplayId === colorProductId
  );
  return selectedProduct || (colorFitsSizesMap.length > 0 ? colorFitsSizesMap[0] : null);
}

/**
 * @return the element flagged as default (or the first one) on the fits array
 */
export function getDefaultFitForColorSlice(colorFitsSizesMapEntry, ignoreQtyCheck = false) {
  return (
    colorFitsSizesMapEntry.fits.find(
      fit => !ignoreQtyCheck && fit.isDefault && fit.maxAvailable > 0
    ) ||
    colorFitsSizesMapEntry.fits.find(fit => !ignoreQtyCheck && fit.maxAvailable > 0) ||
    colorFitsSizesMapEntry.fits[0]
  );
}

/**
 * @return if the product has a single fit with a single size common to all colors then return that common sizeName;
 * otherwise return the empty string.
 */
export function getDefaultSizeForProduct(colorFitsSizesMap) {
  const firstSizeName = colorFitsSizesMap[0].fits[0].sizes[0].sizeName;
  // eslint-disable-next-line
  for (let colorEnrtry of colorFitsSizesMap) {
    if (
      colorEnrtry.fits.length > 1 ||
      colorEnrtry.fits[0].sizes.length > 1 ||
      colorEnrtry.fits[0].sizes[0].sizeName !== firstSizeName
    ) {
      return '';
    }
  }
  return firstSizeName;
}

/**
 * @summary This function will return an array of image paths to display
 * @param {Object} args
 * @param {Object} args.imagesByColor - the maping object holding all color's images
 * @param {Object} args.curentColorEntry - Object holding info of the currently selected Color
 * @param {Object} args.isAbTestActive - AB test flag to know if we should display
 * @param {Object} args.isFullSet - If true it will return all data from imagesByColor for given selection
 */
export const getImagesToDisplay = args => {
  const { imagesByColor, curentColorEntry, isAbTestActive, isFullSet } = args;
  let images = [];

  try {
    // See DTN-155 for image suffex value definitions
    const mainAndAltImages = isEmpty(imagesByColor)
      ? null
      : imagesByColor[curentColorEntry.color.name].extraImages;
    const isColorOnModelLegible = curentColorEntry.miscInfo.hasOnModelAltImages;
    const regularAltImages = mainAndAltImages
      ? mainAndAltImages.filter(imgs => !imgs.isOnModalImage)
      : null;
    const onModelAltImages = mainAndAltImages
      ? mainAndAltImages.filter(imgs => imgs.isOnModalImage)
      : null;

    const imagesToDisplay =
      isAbTestActive && isColorOnModelLegible ? onModelAltImages : regularAltImages;
    // eslint-disable-next-line
    images = isFullSet
      ? imagesToDisplay
      : imagesToDisplay
      ? imagesToDisplay.map(imgData => imgData.regularSizeImageUrl)
      : [];
  } catch (error) {
    console.error(
      'ProductsGridItem: Backend sent us a bad color name so we dont know what image set to map to, see auxdescription in API call'
    );
  }
  return images;
};

export const checkIsSelectedSizeDisabled = (productInfo, formData) => {
  if (formData.color && formData.size) {
    const currentFitInfo = getMapSliceForFit(
      productInfo.colorFitsSizesMap,
      formData.color,
      formData.fit
    );
    const sizesArray = currentFitInfo ? currentFitInfo.sizes : [];
    const currentSizeObj = sizesArray.filter(sizeObj => sizeObj.sizeName === formData.size);
    return currentSizeObj.length ? currentSizeObj[0].maxAvailable <= 0 : true;
  }
  return false;
};

export const checkAndGetDefaultFitName = (fitName, colorName, colorFitsSizesMap) => {
  let defaultFitName = '';
  if (!fitName) {
    const currentColorInfo = getMapSliceForColor(colorFitsSizesMap, colorName);
    if (currentColorInfo && currentColorInfo.hasFits) {
      defaultFitName = getDefaultFitForColorSlice(currentColorInfo).fitName;
    }
  } else {
    return fitName;
  }
  return defaultFitName;
};
