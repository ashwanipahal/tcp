/* -------------------- UNBXD will not send Attributes back as an array of objects now we are tasked with making the transformation on the front end */

export function parseBoolean(bool) {
  return bool === true || bool === '1' || (bool || '').toUpperCase() === 'TRUE';
}

/* Below functions are used to check whether to show/hide clearance/New Arrivals/Online Only badges in both en and translated sites.
Doing this as motion point is translating the categories in the redux store */
export const LANG_STRINGS = {
  PRODUCTS: {
    ATTRIBUTES: {
      CLEARANCE: {
        en: 'Clearance',
        fr: 'Liquidation',
        es: 'Liquidación',
      },
      ONLINE_ONLY: {
        en: 'Online Only',
        fr: 'Online Only', // Added english word as we dont have online only for ca-fr
        es: 'Solo en línea',
      },
      NEW_ARRIVALS: {
        en: 'New Arrivals',
        fr: 'Nouveautés',
        es: 'Novedades',
      },
    },
  },
};

// function
function getAllLangConsts(categoryType) {
  return Object.keys(categoryType).map(key => categoryType[key]);
}

// function to select the corresponding category
export function getClearanceString(categoryType) {
  return getAllLangConsts(LANG_STRINGS.PRODUCTS.ATTRIBUTES[categoryType]);
}
/* End of show/hide badge methods */

export function attributeListMaker(attributes) {
  return attributes.split(`;`).map(attribute => {
    const regexUrl = /((http|https):\/\/)?(([\w.-]*)\.([\w])).*/g;
    const isUrl = regexUrl.test(attribute);
    const match = attribute.match(regexUrl);
    const url = match && match[0].split('|');
    const attAndValue = attribute.split(`:`);
    return { identifier: attAndValue[0], value: isUrl ? url : attAndValue[1] };
  });
}

export function extractAttributeValue(item, attribute) {
  try {
    if (item.list_of_attributes) {
      const currItm = item.list_of_attributes;
      /* item.list_of_attributes comes as Array on PLP but on PDP it comes as a string when this function is called. On PLP we have a wrapper funtion where
      we do the modifcation and pass the data to this function but on PDP we do not have a wrapper function in this module hence handeling the PDP at this
      place only. */
      const itm = Array.isArray(currItm) ? currItm : attributeListMaker(currItm);
      return itm.find(att => att.identifier === attribute).value;
    }
    if (item[attribute]) {
      return item[attribute];
    }
    return null;
  } catch (ex) {
    return '';
  }
}

// DT-708
// eslint-disable-next-line complexity
export function extractPrioritizedBadge(product, siteAttributes, categoryType, excludeBadge) {
  const matchingCategory = extractAttributeValue(product, siteAttributes.matchingCategory);
  const matchingFamily = extractAttributeValue(product, siteAttributes.matchingFamily);
  const isGlowInTheDark = !!extractAttributeValue(product, siteAttributes.glowInTheDark);
  const isLimitedQuantity =
    extractAttributeValue(product, siteAttributes.limitedQuantity) === 'limited quantities';
  const isOnlineOnly = !!extractAttributeValue(product, siteAttributes.onlineOnly);
  const clearanceOrNewArrival = extractAttributeValue(product, siteAttributes.clearance);
  const badges = {};

  if (matchingFamily && excludeBadge !== siteAttributes.matchingFamily) {
    badges.matchBadge = matchingFamily;
  }

  if (matchingCategory) {
    badges.defaultBadge = matchingCategory;
  } else if (isGlowInTheDark) {
    badges.defaultBadge = 'GLOW-IN-THE-DARK';
  } else if (isLimitedQuantity) {
    badges.defaultBadge = 'JUST A FEW LEFT!';
  } else if (isOnlineOnly && !getClearanceString('ONLINE_ONLY').includes(categoryType)) {
    // TDB: node missing in service response, need to check it's possible values
    badges.defaultBadge = 'ONLINE EXCLUSIVE';
  } else if (
    clearanceOrNewArrival === 'Clearance' &&
    !getClearanceString('CLEARANCE').includes(categoryType)
  ) {
    // TDB: node missing in service response, need to check it's possible values
    badges.defaultBadge = 'CLEARANCE';
  } else if (
    clearanceOrNewArrival === 'New Arrivals' &&
    !getClearanceString('NEW_ARRIVALS').includes(categoryType)
  ) {
    // TDB: node missing in service response, need to check it's possible values
    badges.defaultBadge = 'NEW!';
  }
  return badges;
}

/* get the category name corresponding to least breadcrumb category id to pass to adobe */
export function getCategoryId(categoryPath, breadcrumb) {
  let categoryName;
  if (categoryPath && categoryPath.length) {
    categoryPath.some(values => {
      const value = values.split('|');
      const id = value[0].split('>').indexOf(breadcrumb);

      categoryName = value[1].split('>')[id];
      if (categoryName) {
        return true;
      }
      return false;
    });
  }
  return categoryName;
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
 */
export const isBopisProduct = (isUSStore, product) => {
  let isOnlineOnly;
  if (isUSStore) {
    isOnlineOnly =
      (product.TCPWebOnlyFlagUSStore && parseBoolean(product.TCPWebOnlyFlagUSStore)) || false; // validate if product is online only so it is not BOPIS eligible
  } else {
    isOnlineOnly =
      (product.TCPWebOnlyFlagCanadaStore && parseBoolean(product.TCPWebOnlyFlagCanadaStore)) ||
      false;
  }
  return !isOnlineOnly;
};
