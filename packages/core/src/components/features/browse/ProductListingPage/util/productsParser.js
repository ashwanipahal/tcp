/* eslint-disable */
import { parseBoolean } from './utility';
// import {matchPath} from 'react-router';
// import {PAGES} from '../../../routing/routes/pages.js';
// import {findCategoryIdandName} from 'routing/routingHelper';
// import {seoTokenExtactorFromPathName, seoURLExtactor, UrlParamExtractor, homeBreadCrumbFactory} from 'util/commonUtil.js';

// /* -------------------- UNBXD will not send Attributes back as an array of objects now we are tasked with making the transformation on the front end */

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
    } else if (item[attribute]) {
      return item[attribute];
    }
  } catch (ex) {
    return '';
  }
}

// DT-708
export function extractPrioritizedBadge(product, siteAttributes, categoryType, excludeBadge) {
  const matchingCategory = extractAttributeValue(product, siteAttributes.matchingCategory);
  const matchingFamily = extractAttributeValue(product, siteAttributes.matchingFamily);
  const isGlowInTheDark = parseBoolean(
    extractAttributeValue(product, siteAttributes.glowInTheDark)
  );
  const isLimitedQuantity =
    extractAttributeValue(product, siteAttributes.limitedQuantity) === 'limited quantities';
  const isOnlineOnly = parseBoolean(extractAttributeValue(product, siteAttributes.onlineOnly));
  const clearanceOrNewArrival = extractAttributeValue(product, siteAttributes.clearance);
  let badges = {};

  if (matchingFamily) {
    if (matchingFamily && excludeBadge !== siteAttributes.matchingFamily) {
      badges.matchBadge = matchingFamily;
    }
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

// /**
//  * @function breadCrumbFactory -- create breadcrumb for PDP page
//  * @param {Object} storeState --> contain all redux store data
//  * @return {array} breadCrumbs --> number of obect item in array cotain breadcrumb info
//  */
// export function breadCrumbFactory (storeState) {
//   const navList = storeState.globalComponents.header.navigationTree;
//   const previousPageUrl = document && document.referrer;
//   const previousPagePathName = seoURLExtactor(previousPageUrl);
//   let breadCrumbsArray = [];
//   let breadCrumbs = [];

//   if (matchPath(previousPagePathName, { path: PAGES.productListing.pathPattern })) {
//     /** user can navigate to PDP from PLP then breadcrumb hierarchy need to show but if
//       user search a product and click on product in typeahead results then Home breadcrumb need
//       to show on PDP so document.referrer will not able to distinguish if user search a  product from
//        PLP  and land on PDP , to distinguish this scenario URL param   navigateType=search is used */
//     let urlParams = UrlParamExtractor();
//     if (urlParams && urlParams.navigateType === 'search') {
//       return homeBreadCrumbFactory();
//     }

//     breadCrumbsArray = findCategoryIdandName(navList, previousPagePathName);
//     if (breadCrumbsArray) breadCrumbsArray.reverse();

//     breadCrumbs = breadCrumbsArray && breadCrumbsArray.map((item) => {
//       return {
//         pathSuffix: seoTokenExtactorFromPathName(item.url, storeState),
//         displayName: item.title,
//         destination: PAGES.productListing,
//         categoryId: item.categoryId

//       };
//     });
//   }

//   if (breadCrumbs && breadCrumbs.length === 0) {
//     breadCrumbs = homeBreadCrumbFactory();
//   }

//   return breadCrumbs;
// }

// function getExistingImagesNames (imageSuffixesArray, baseUrl, imagePrefix) {
//   /*
//     Since the backend won't to return existing images associated with a product as part of the web service response,
//     we've been forced to create a matrix by requesting ALL permuatation through a head request (to each image),
//     should the target (icon) exist, we store it in the result array of suffixes.
//     */
//   const NOP = () => null;
//   let request = require('superagent');
//   let pendingPromises = [];
//   let foundImagesMap = {};
//   imageSuffixesArray.forEach((suffix) => {
//     pendingPromises.push(
//       /** we're going for the icons, and assuming: if the icon exists the images should be available in all other sizes as well  */
//       request.head(baseUrl.replace(imagePrefix, `${imagePrefix}${suffix}`))
//         .timeout({
//           response: 10000,  // Wait 10 seconds for the server to start sending,
//           deadline: 30000 // but allow 30 seconds for the file to finish loading.
//         })
//         .then((res) => {
//           if (res.ok) {
//             foundImagesMap[suffix] = true; // changed from push() to keep the same order as it came in imageSuffixesArray
//           }
//         }).catch(NOP)        // ignore any failures (we simply do not increment foundImagesCount)
//     );
//   });
//   return Promise.all(pendingPromises).then(() => imageSuffixesArray.filter((suffix) => foundImagesMap[suffix]));
// }

// export function getExtraImages (partNumber, extraSizes, imageGenerator) {

//   let { productImages } = imageGenerator(partNumber);

//   // If this is not on server then no other suffixed images will be there
//   let baseImage = productImages[125];

//   return getExistingImagesNames(extraSizes || ['', '-1', '-2', '-3', '-4', '-5'], baseImage, partNumber)
//     .then(existingSuffixes => existingSuffixes.map(suffix => ({
//       iconSizeImageUrl: productImages[125].replace(partNumber, `${partNumber}${suffix}`),
//       listingSizeImageUrl: productImages[380].replace(partNumber, `${partNumber}${suffix}`),
//       regularSizeImageUrl: productImages[500].replace(partNumber, `${partNumber}${suffix}`),
//       bigSizeImageUrl: productImages[900].replace(partNumber, `${partNumber}${suffix}`),
//       superSizeImageUrl: productImages[900].replace(partNumber, `${partNumber}${suffix}`)
//     })));
// }

// /* get the category name corresponding to least breadcrumb category id to pass to adobe */
// export function getCategoryId(categoryPath, breadcrumb) {
//   let categoryName;
//   if (categoryPath && categoryPath.length) {
//     categoryPath.some((values) => {
//       const value = values.split('|');
//       const id = value[0].split('>').indexOf(breadcrumb);

//       categoryName = value[1].split('>')[id];
//       if (categoryName) {
//         return true;
//       }
//       return false;
//     });
//   }
//   return categoryName;
// }

// /* Below functions are used to check whether to show/hide clearance/New Arrivals/Online Only badges in both en and translated sites.
// Doing this as motion point is translating the categories in the redux store*/
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

// // function
function getAllLangConsts(categoryType) {
  return Object.keys(categoryType).map(key => categoryType[key]);
}

// // function to select the corresponding category
export function getClearanceString(categoryType) {
  return getAllLangConsts(LANG_STRINGS.PRODUCTS.ATTRIBUTES[categoryType]);
}
// /* End of show/hide badge methods*/
