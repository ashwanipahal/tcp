import layoutAbstractor from '@tcp/core/src/services/abstractors/bootstrap/layout';
import { getAPIConfig } from '@tcp/core/src/utils';
import logger from '@tcp/core/src/utils/loggerInstance';
import handler, { executeExternalAPICall } from '@tcp/core/src/services/handler/handler';
import { executeUnbxdAPICall } from '../../handler';
import endpoints from '../../endpoints';
import processHelpers from './processHelpers';
import { getNavTree } from '../../../components/features/browse/ProductDetail/container/ProductDetail.selectors';
import processResponse from './processPdpResponse';
import processHelperUtil from './ProductDetail.util';

export const parseProductFromAPI = (
  product,
  colorIdOrSeoKeyword,
  dontFetchExtraImages,
  breadCrumbs,
  excludeBage,
  isBundleProduct,
  getImgPath
  // eslint-disable-next-line
) => {
  const baseProduct = processHelperUtil.getBaseProduct(product); // Getting multiple products as color variants
  const productVariants = processHelperUtil.getProductVariants(product);
  const isGiftCard = processHelpers.isGiftCard(baseProduct); // TBD: backend to confirm whether partNumber will always be giftCardBundle for gift cards.
  const productAttributes = processHelpers.getProductAttributes();
  let hasFit = false;
  let hasInventory = false;
  let alternateSizes;
  let defaultColorAlternateSizes;
  let otherColorAlternateSizes;

  let hasAdditionalStyles = false;
  let imagesByColor = {};
  // const imagesByColor = extractExtraImages(rawColors, baseProduct.alt_img, getImgPath);

  // This color map is used as an intermediary step to help consolidate all sizes under fits
  const colorsFitsMap = {};
  // eslint-disable-next-line
  for (let colorVariant of productVariants) {
    const color = processHelperUtil.getProductColorName(isGiftCard, colorVariant);
    const currentColorFitsSizesMap = {};

    let fitName = '';
    if (processHelperUtil.isColorVariant(colorVariant)) {
      // eslint-disable-next-line
      for (let sizeVariant of colorVariant.variants) {
        fitName = processHelperUtil.getFitName(sizeVariant);
        if (!currentColorFitsSizesMap[fitName]) {
          currentColorFitsSizesMap[fitName] = [];
        }
        if (!hasInventory) {
          hasInventory = processHelperUtil.getInventoryStatus(sizeVariant);
        }
        currentColorFitsSizesMap[fitName].push({
          sizeName: processHelperUtil.getSizeName(sizeVariant),
          skuId: sizeVariant.v_item_catentry_id,
          listPrice: processHelperUtil.getListPriceProduct(sizeVariant),
          offerPrice: processHelperUtil.getOfferPriceProduct(sizeVariant),
          maxAvailable: sizeVariant.v_qty,
          maxAvailableBoss: sizeVariant.v_qty_boss,
          variantId: sizeVariant.variantId,
          variantNo: sizeVariant.v_variant,
        });
      }
    }

    hasFit = !!fitName;

    let hasDefaultFit = false;
    const sortOptions = {
      regular: 1,
      slim: 2,
      plus: 3,
      husky: 4,
      other: 5,
    };
    const sortedKeys = processHelperUtil.getSortedKeys(currentColorFitsSizesMap, sortOptions);
    // eslint-disable-next-line
    colorsFitsMap[color] = sortedKeys.map(fitNameVal => {
      const isDefaultFit = fitNameVal.toLowerCase() === 'regular';
      hasDefaultFit = processHelperUtil.getHasDefaultFit(hasDefaultFit, isDefaultFit);

      return {
        fitName: fitNameVal,
        isDefault: isDefaultFit,
        maxAvailable: processHelperUtil.validateQuantityAvailable(
          currentColorFitsSizesMap[fitNameVal]
        ),
        sizes: processHelperUtil.convertMultipleSizeSkusToAlternatives(
          currentColorFitsSizesMap[fitNameVal]
        ),
      };
    });

    if (processHelperUtil.setDefault(hasDefaultFit, colorsFitsMap, color)) {
      colorsFitsMap[color][0].isDefault = true;
    }

    if (processHelperUtil.getDefaultColorAlternateSizes(colorVariant, colorIdOrSeoKeyword)) {
      defaultColorAlternateSizes = colorVariant.additional_styles;
    }
    if (processHelperUtil.getIsAdditionalStyles(hasAdditionalStyles, colorVariant)) {
      otherColorAlternateSizes = colorVariant.additional_styles;
      hasAdditionalStyles = true;
    }
  }

  try {
    alternateSizes = processHelperUtil.getAlternateSizes(
      defaultColorAlternateSizes,
      otherColorAlternateSizes
    );
  } catch (err) {
    alternateSizes = {};
    console.error('API response coming for additional_styles key JSON format is incorrect', err);
  }
  // Generate the colorFitsSizeMap needed for mapping colors to fits/sizes

  const colorObj = processHelperUtil.getColorfitsSizesMap({
    productVariants,
    isGiftCard,
    breadCrumbs,
    getImgPath,
    imagesByColor,
    hasFit,
    isBundleProduct,
    colorsFitsMap,
    excludeBage,
    productAttributes,
  });

  const { itemColorMap: colorFitsSizesMap, imagesByColor: imagesByColorRes } = colorObj;
  imagesByColor = imagesByColorRes;

  const reviewsCount = processHelperUtil.getReviewsCountProduct(baseProduct);
  const categoryPathMap = processHelperUtil.getCategoryPathMap(baseProduct);
  const categoryPath = processHelperUtil.getCategory(baseProduct);
  const categoryId = processHelperUtil.getCategoryId(breadCrumbs, baseProduct, categoryPath);
  const category = processHelperUtil.getCategoryValue(baseProduct);

  return processResponse({
    baseProduct,
    categoryPathMap,
    colorIdOrSeoKeyword,
    colorFitsSizesMap,
    categoryId,
    isGiftCard,
    isBundleProduct,
    imagesByColor,
    reviewsCount,
    alternateSizes,
    breadCrumbs,
    category,
  });
};

/**
 * @function moduleResolver
 * @param {object} moduleObjects -  module data to make module graphQL call
 * @summary This will get the modules of the layout from CMS based on categoryId
 */
const moduleResolver = async moduleObjects => {
  const response = await layoutAbstractor.getModulesData(moduleObjects);
  return layoutAbstractor.processModuleData(response.data);
};

/**
 * @function formatSlotData
 * @param {array} slotItems -  list of slots
 * @param {string} language -  selected language
 * @summary Formats the slot as per the requirement of graphQL queryBuilder
 */
const formatSlotData = (slotItems, language) => {
  return slotItems.map((slot, index) => {
    return {
      name: slot.moduleName,
      data: {
        contentId: slot.contentId,
        slot: slot.name || `slot_${index + 1}`, // TODO: Remove Temporary Check for slot, as not supported from CMS yet
        lang: language !== 'en' ? language : '', // TODO: Remove Temporary Check for en support, as not supported from CMS yet
      },
    };
  });
};

/**
 * @function layoutResolver
 * @param {object} layoutConfig -  contains categoryId and pageName
 * @summary This will get the layout of the page from CMS based on categoryId
 */
export const layoutResolver = async ({ category, pageName }) => {
  let modules = {};
  const layout = {};
  try {
    const { channelId, siteIdCMS, brandIdCMS, language } = getAPIConfig();
    const moduleConfig = {
      name: 'promoContent',
      data: {
        brand: brandIdCMS,
        country: siteIdCMS,
        channel: channelId || 'Mobile',
        lang: language === 'en' ? '' : language,
        path: pageName,
        category,
      },
    };
    const {
      data: { contentLayout },
    } = await handler.fetchModuleDataFromGraphQL({ ...moduleConfig });
    const moduleObjects = [];
    contentLayout.forEach(data => {
      const dataItems = data.items;
      layout[data.key] = dataItems;
      Object.keys(dataItems).forEach(item => {
        const slotItems = !!dataItems[item] && dataItems[item].slots;
        if (typeof slotItems === 'object') {
          moduleObjects.push(...slotItems);
        }
      });
    });
    modules = await moduleResolver(formatSlotData(moduleObjects, language));
  } catch (err) {
    logger.error(err);
  }
  return {
    layout,
    modules,
  };
};

const getFieldsValue = () => {
  return typeof window === 'undefined'
    ? 'productimage,alt_img,style_partno,giftcard,TCPProductIndUSStore,TCPWebOnlyFlagUSStore,TCPWebOnlyFlagCanadaStore,TCPFitMessageUSSstore,product_name,top_rated,imagename,productid,uniqueId,favoritedcount,TCPBazaarVoiceReviewCount,categoryPath3_catMap,categoryPath2_catMap,product_short_description,style_long_description,TCPBazaarVoiceRating,product_long_description,seo_token,variantCount,prodpartno,variants,style_name,v_item_catentry_id,v_qty,variantId,auxdescription,list_of_attributes,additional_styles,TCPLoyaltyPromotionTextUSStore,TCPLoyaltyPLCCPromotionTextUSStore,v_variant,long_product_title,TCPOutOfStockFlagUSStore,TCPOutOfStockFlagCanadaStore,v_qty_boss'
    : 'productimage,alt_img,style_partno,swatchimage,giftcard,TCPProductIndUSStore,TCPWebOnlyFlagUSStore,TCPWebOnlyFlagCanadaStore,TCPFitMessageUSSstore,TCPFit,product_name,TCPColor,top_rated,imagename,productid,uniqueId,favoritedcount,TCPBazaarVoiceReviewCount,categoryPath3_catMap,categoryPath2_catMap,product_short_description,style_long_description,min_list_price,min_offer_price,TCPBazaarVoiceRating,product_long_description,seo_token,variantCount,prodpartno,variants,v_tcpfit,v_qty,v_tcpsize,style_name,v_item_catentry_id,v_listprice,v_offerprice,v_qty,variantId,auxdescription,list_of_attributes,additional_styles,TCPLoyaltyPromotionTextUSStore,TCPLoyaltyPLCCPromotionTextUSStore,v_variant, low_offer_price, high_offer_price,low_list_price,high_list_price,long_product_title,TCPOutOfStockFlagUSStore,TCPOutOfStockFlagCanadaStore';
};

/**
 * @function getProductInfoById
 * @summary This will get product info and all color/sizes for that product
 */
const getProductInfoById = (productColorId, state, brand, isBundleProduct) => {
  // const isRadialInvEnabled = generalStoreView.getIsRadialInventoryEnabled(this.store.getState());
  // const location = routingInfoStoreView.getHistory(this.store.getState()).location;
  // const isBundleProduct = matchPath(location.pathname, { path: PAGES.productBundle.pathPattern });
  const isRadialInvEnabled = true;

  const breadCrumb = processHelperUtil.breadCrumbFactory(state);
  // eslint-disable-next-line
  const categoryId =
    breadCrumb[breadCrumb.length - 1] && breadCrumb[breadCrumb.length - 1].categoryId;
  const navigationTree = getNavTree(state);
  const excludeBage = categoryId
    ? processHelperUtil.getNavAttributes(navigationTree, categoryId, 'excludeAttribute')
    : '';
  const alternateProdId =
    productColorId.indexOf('_') > -1 ? productColorId.split('_')[0] : productColorId;

  const productId =
    productColorId.indexOf('-') > -1 ? productColorId.split('-')[0] : alternateProdId;
  // eslint-disable-next-line no-param-reassign
  productColorId =
    productColorId.indexOf('-') > -1 ? productColorId.replace('-', '_') : productColorId; // As ProductColorId response has always _ rather than hyphen(-)
  let fields = getFieldsValue();
  let count = 100;
  if (!isBundleProduct) {
    if (isRadialInvEnabled) {
      fields = fields.concat(',v_qty_boss');
    }
  } else {
    fields =
      'productimage,alt_img,style_partno,swatchimage,TCPProductIndUSStore,TCPWebOnlyFlagUSStore,TCPWebOnlyFlagCanadaStore,TCPFitMessageUSSstore,product_name,TCPColor,imagename,productid,uniqueId,categoryPath3_catMap,categoryPath2_catMap,product_short_description,style_long_description,min_list_price,min_offer_price,product_long_description,seo_token,prodpartno,auxdescription,list_of_attributes,additional_styles,TCPLoyaltyPromotionTextUSStore,TCPLoyaltyPLCCPromotionTextUSStore,low_offer_price,high_offer_price,low_list_price,high_list_price,long_product_title,TCPOutOfStockFlagUSStore,TCPOutOfStockFlagCanadaStore,product_type,products';
    count = 0;
  }

  const payload = {
    body: {
      variants: true,
      'variants.count': count,
      version: 'V2',
      rows: 20,
      pagetype: 'boolean',
      q: productId,
      promotion: false,
      fields,
    },
    webService: endpoints.getProductInfoById,
    brand,
  };

  if (productId === 'gift') {
    payload.body.filter = 'giftcard:1';
    payload.body.sort = 'style_sequence asc';
  }

  if (isBundleProduct) {
    payload.body.filter = `prodpartno:"${productId}"`;
  }

  return executeUnbxdAPICall(payload)
    .then(res => {
      return parseProductFromAPI(
        res.body.response.products,
        productColorId,
        false,
        breadCrumb,
        excludeBage,
        isBundleProduct,
        processHelperUtil.getImgPath
      );
    })
    .catch(err => {
      // if (err && ((err.status >= 400 && err.status <= 404) || err.status === 500) && isClient()) {
      // TODO - handle it - window.location.href = getErrorPagePath(this.apiHelper._configOptions.siteId);
      // }
      console.log(err);
      // TODO - handle it - throw this.apiHelper.getFormattedError(err);
    });
};

const hashValuesReplace = (str, utilArr) => {
  let finalString = str;
  utilArr.map(obj => {
    finalString = finalString && finalString.replace(obj.key, !obj.value ? '' : obj.value);
    return finalString;
  });
  return finalString;
};

const getReviewContent = (reviewStats, productId) => {
  const stats = {
    avgRating: 0,
    totalReviewCount: 0,
  };
  try {
    const rating = reviewStats.Includes.Products[productId].ReviewStatistics;
    stats.avgRating = rating.AverageOverallRating;
    stats.totalReviewCount = rating.TotalReviewCount;
    return stats;
  } catch {
    return stats;
  }
};

/**
 * @function getProductBVRatings
 * @param {object} productId -  productId of product to fetch its review
 * @summary This will get the review stats from bazar voice
 */
export const getProductBVReviewStats = async productId => {
  const apiConfig = getAPIConfig();
  const serviceConfig = endpoints.getBazaarVoiceRatings;
  const utilArrayHeader = ({ pId, passKey, limit }) => {
    return [
      {
        key: '#product-id#',
        value: pId,
      },
      {
        key: '#pass-key#',
        value: passKey,
      },
      {
        key: '#limit#',
        value: limit,
      },
    ];
  };
  const fetchReviewURL = hashValuesReplace(
    serviceConfig.URI,
    utilArrayHeader({
      pId: productId,
      passKey: apiConfig.BV_API_KEY,
      limit: 1,
    })
  );

  const formattedBvApiURL = `${apiConfig.BV_API_URL}/${fetchReviewURL}`;

  const payload = {
    webService: {
      URI: formattedBvApiURL,
      method: serviceConfig.method,
    },
  };

  return executeExternalAPICall(payload)
    .then(res => {
      return getReviewContent(res.body, productId);
    })
    .catch(err => {
      console.log(err);
    });
};

export default getProductInfoById;
