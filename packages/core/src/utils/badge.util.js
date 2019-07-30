// Attributes for PLP/PDP and Cart apis are different hence there was a need to create this.
export const parseBoolean = bool => {
  return bool === true || bool === '1' || (bool || '').toUpperCase() === 'TRUE';
};

const labels = {
  WEEK_DAYS: ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'],
  MONTHS: ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'],
  MONTHS_SMALL: [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ],
  WEEK_DAYS_SMALL: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
};

/**
 * @method getDateInformation
 * @desc returns day, month and day of the respective date provided
 * @param {string} date date which is to be mutated
 * @param {upperCase} date determines case
 */

export const getDateInformation = (date, upperCase) => {
  const currentDate = date ? new Date(date) : new Date();
  return {
    // added a case for upper and lower case values
    day: upperCase
      ? labels.WEEK_DAYS[currentDate.getDay()]
      : labels.WEEK_DAYS_SMALL[currentDate.getDay()],
    month: upperCase
      ? labels.MONTHS[currentDate.getMonth()]
      : labels.MONTHS_SMALL[currentDate.getMonth()],
    date: currentDate.getDate(),
  };
};

export const getProductAttributes = () => {
  const isUSStore = true;
  return isUSStore
    ? {
        onlineOnly: 'webOnlyFlagUSStore',
        clearance: 'itemTCPProductIndUSStore',
        glowInTheDark: 'itemTCPGlowInDarkUSStore',
        limitedQuantity: 'inventoryMessageUSStore',
      }
    : {
        onlineOnly: 'webOnlyFlagCanadaStore',
        clearance: 'itemTCPProductIndCanadaStore',
        glowInTheDark: 'itemTCPGlowInDarkCanadaStore',
        limitedQuantity: 'inventoryMessageCanadaStore',
      };
};

// export const getProductAttributes = () => {
//   const  isUSStore = true;
//   return isUSStore
//     ? {
//         merchant: 'TCPMerchantTagUSStore',
//         sizes: 'TCPSizeUSStore',
//         swatches: 'TCPSwatchesUSStore',
//         onlineOnly: 'TCPWebOnlyFlagUSStore',
//         clearance: 'TCPProductIndUSStore',
//         inventory: 'TCPInventoryFlagUSStore',
//         glowInTheDark: 'TCPGlowInDarkUSStore',
//         limitedQuantity: 'TCPInventoryMessageUSStore',
//         extendedSize: 'TCPFitMessageUSStore',
//         onModelAltImages: 'TCPMarketingText1USStore',
//         bossProductDisabled: 'TcpBossProductDisabled',
//         bossCategoryDisabled: 'TcpBossCategoryDisabled',
//         videoUrl: 'TCPMarketingText2USStore',
//         matchingCategory: 'TCPProductFlagUSStore',
//         matchingFamily: 'TCPMatchingFamilyUSStore',
//       }
//     : {
//         merchant: 'TCPMerchantTagCanadaStore',
//         sizes: 'TCPSizeCanadaStore',
//         swatches: 'TCPSwatchesCanadaStore',
//         onlineOnly: 'TCPWebOnlyFlagCanadaStore',
//         clearance: 'TCPProductIndCanadaStore',
//         inventory: 'TCPInventoryFlagCanadaStore',
//         glowInTheDark: 'TCPGlowInDarkUCanadaStore',
//         limitedQuantity: 'TCPInventoryMessageCanadaStore',
//         extendedSize: 'TCPFitMessageCanadaStore',
//         onModelAltImages: 'TCPMarketingText1CanadaStore',
//         videoUrl: 'TCPMarketingText2CanadaStore',
//         matchingCategory: 'TCPProductFlagCAStore',
//         matchingFamily: 'TCPMatchingFamilyCAStore',
//       };
// };

export const attributeListMaker = attributes => {
  return attributes.split(`;`).map(attribute => {
    const regexUrl = /((http|https):\/\/)?(([\w.-]*)\.([\w])).*/g;
    const isUrl = regexUrl.test(attribute);
    const match = attribute.match(regexUrl);
    const url = match && match[0].split('|');
    const attAndValue = attribute.split(`:`);
    return { identifier: attAndValue[0], value: isUrl ? url : attAndValue[1] };
  });
};

export const extractAttributeValue = (item, attribute) => {
  let obj = '';
  try {
    if (item.list_of_attributes) {
      const currItm = item.list_of_attributes;
      /* item.list_of_attributes comes as Array on PLP but on PDP it comes as a string when this function is called. On PLP we have a wrapper funtion where
      we do the modifcation and pass the data to this function but on PDP we do not have a wrapper function in this module hence handeling the PDP at this
      place only. */
      const itm = Array.isArray(currItm) ? currItm : attributeListMaker(currItm);
      obj = itm.find(att => att.identifier === attribute).value;
    } else if (item[attribute]) {
      obj = item[attribute];
    }
  } catch (error) {
    console.log('error', error);
  }
  return obj;
};

export const checkMatchingFamily = (matchingFamily, excludeBadge, siteAttributes) => {
  if (matchingFamily && excludeBadge !== siteAttributes.matchingFamily) {
    return matchingFamily;
  }
  return false;
};

export const extractPrioritizedBadge = (product, siteAttributes, categoryType, excludeBadge) => {
  const matchingCategory = extractAttributeValue(product, siteAttributes.matchingCategory);
  const matchingFamily = extractAttributeValue(product, siteAttributes.matchingFamily);
  const isGlowInTheDark = parseBoolean(
    extractAttributeValue(product, siteAttributes.glowInTheDark)
  );
  const isLimitedQuantity =
    extractAttributeValue(product, siteAttributes.limitedQuantity) === 'limited quantities';
  const isOnlineOnly = parseBoolean(extractAttributeValue(product, siteAttributes.onlineOnly));
  const clearanceOrNewArrival = extractAttributeValue(product, siteAttributes.clearance);
  const badges = {
    matchBadge: false,
    defaultBadge: '',
  };

  badges.matchBadge = checkMatchingFamily(matchingFamily, excludeBadge, siteAttributes);

  if (matchingCategory) {
    badges.defaultBadge = matchingCategory;
  } else if (isGlowInTheDark) {
    badges.defaultBadge = 'GLOW-IN-THE-DARK';
  } else if (isLimitedQuantity) {
    badges.defaultBadge = 'JUST A FEW LEFT!';
  } else if (isOnlineOnly && categoryType !== 'Online Only') {
    // TDB: node missing in service response, need to check it's possible values
    badges.defaultBadge = 'ONLINE EXCLUSIVE';
  } else if (clearanceOrNewArrival === 'Clearance' && categoryType !== 'Clearance') {
    // TDB: node missing in service response, need to check it's possible values
    badges.defaultBadge = 'CLEARANCE';
  } else if (clearanceOrNewArrival === 'New Arrivals' && categoryType !== 'New Arrivals') {
    // TDB: node missing in service response, need to check it's possible values
    badges.defaultBadge = 'NEW!';
  }
  return badges;
};
