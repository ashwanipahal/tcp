function altImageArray(imagename, altImg) {
  try {
    const altImges = JSON.parse(altImg);
    return altImges[imagename].split(',').filter(img => img);
  } catch (error) {
    return [];
  }
}

// inner function
function parseAltImagesForColor(imageBasePath, hasShortImage, altImgs, getImgPath) {
  try {
    const altImages = altImageArray(imageBasePath, altImgs);
    const shortImage = [];
    const normalImage = [];
    let availableImages;

    altImages.forEach(image => {
      if (image.indexOf('-s') < 0) {
        normalImage.push(image);
      } else {
        shortImage.push(image);
      }
    });

    if (hasShortImage && shortImage.length) {
      availableImages = [...shortImage, ...normalImage];
    } else {
      availableImages = [imageBasePath, ...normalImage];
    }

    return availableImages.map(img => {
      const hasExtension = img.indexOf('.jpg') !== -1; // we currently only support .jpg but we can make this a regex in the future if needed
      const { productImages } = getImgPath(img, hasExtension);

      // See DTN-155 for image suffex value definitions
      const isOnModalImage = parseInt(img.split('-')[1], 10) > 5; // this is assumming a structure of <alpahnumeric>-<numeric><other (optional)>

      return {
        isOnModalImage,
        iconSizeImageUrl: productImages[125],
        listingSizeImageUrl: productImages[380],
        regularSizeImageUrl: productImages[500],
        bigSizeImageUrl: productImages[900],
        superSizeImageUrl: productImages[900],
      };
    });
  } catch (error) {
    return [];
  }
}

// We seem to be itterating over all colors and added alt images in this location
export function extractExtraImages(
  rawColors,
  altImgs,
  getImgPath,
  uniqueId,
  defaultColor,
  isGiftCard,
  hasShortImage
) {
  const colorsImageMap = {};
  // backend send the colors in a very weird format
  try {
    if (rawColors && rawColors !== '') {
      // DTN-6314 Gift card pdp page broken
      // handle senario if gift card product_name contains '|' character in it.
      let colors = [];
      if (isGiftCard) {
        colors.push(rawColors);
      } else {
        colors = rawColors.split('|');
      }
      // eslint-disable-next-line
      for (let color of colors) {
        let colorName = color.split('#')[1];
        let imageBasePath = color.split('#')[0];
        if (!colorName) {
          colorName = defaultColor;
          imageBasePath = uniqueId;
        }
        const { productImages } = getImgPath(imageBasePath);

        colorsImageMap[colorName] = {
          basicImageUrl: productImages[500],
          extraImages: parseAltImagesForColor(imageBasePath, hasShortImage, altImgs, getImgPath),
        };
      }
    } else {
      const { productImages } = getImgPath(uniqueId);
      colorsImageMap[defaultColor] = {
        basicImageUrl: productImages[500],
        extraImages: parseAltImagesForColor(uniqueId, hasShortImage, altImgs, getImgPath),
      };
    }
  } catch (error) {
    console.log(error);
  }
  return colorsImageMap;
}

export const FACETS_FIELD_KEY = {
  color: 'tcpcolor_ufilter',
  size: 'v_tcpsize_ufilter',
  age: 'age_group_ufilter',
  price: 'unbxd_price_range_ufilter',
  sort: 'sort',
  unbxdDisplayName: 'unbxddisplayname',
  aux_color: 'auxdescription_ufilter',
  aux_color_unbxd: 'auxdescription_uFilter',
  l1category: 'l1category',
};

export const FACETS_OPTIONS = {
  lowPriceProducts: '$10 and under',
};
