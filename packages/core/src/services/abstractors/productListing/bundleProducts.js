import { executeUnbxdAPICall } from '../../handler';
import endpoints from '../../endpoints';
import { parseProductFromAPI } from './productDetail';
import logger from '../../../utils/loggerInstance';
import { attributeListMaker, extractAttributeValue } from './productParser';
import processHelpers from './processHelpers';

const getProductId = product => {
  const productIdAlternate =
    product.prodpartno.indexOf('_') > -1 ? product.prodpartno.split('_')[0] : product.prodpartno;
  return product.prodpartno.indexOf('-') > -1
    ? product.prodpartno.split('-')[0]
    : productIdAlternate;
};
/**
 * @function getBundleProductsDetails
 * @summary This API is used for bundles.
 */
const getBundleProductsDetails = ({ bundleProducts, getImgPath, breadCrumbs, navigationTree }) => {
  const fields =
    'alt_img,style_partno,giftcard,TCPProductIndUSStore,TCPWebOnlyFlagUSStore,TCPWebOnlyFlagCanadaStore,TCPFitMessageUSSstore,TCPFit,product_name,TCPColor,top_rated,imagename,productid,uniqueId,favoritedcount,TCPBazaarVoiceReviewCount,categoryPath3_catMap,categoryPath2_catMap,product_short_description,style_long_description,min_list_price,min_offer_price,TCPBazaarVoiceRating,product_long_description,seo_token,variantCount,prodpartno,variants,v_tcpfit,v_qty,v_tcpsize,style_name,v_item_catentry_id,v_listprice,v_offerprice,v_qty,variantId,auxdescription,list_of_attributes,additional_styles,TCPLoyaltyPromotionTextUSStore,TCPLoyaltyPLCCPromotionTextUSStore,v_variant, low_offer_price, high_offer_price, low_list_price, high_list_price,long_product_title,TCPOutOfStockFlagUSStore,TCPOutOfStockFlagCanadaStore,product_type,v_unbxd_added_variant';

  const payload = {
    body: {
      variants: true,
      'variants.count': 100,
      version: 'V2',
      rows: bundleProducts.length,
      pagetype: 'boolean',
      id: bundleProducts.join(','),
      promotion: false,
      fields,
    },
    webService: endpoints.getProductDetails,
  };

  // DTN-11836 Add filter only for test and stage unbxd keys
  // const unbxdKeys = this.apiHelper._configOptions.apiKeys[`UNBXD_SITE_KEY_${(this.apiHelper._configOptions.siteId || '').toUpperCase()}`];
  // if (unbxdKeys && (unbxdKeys.includes('test-') || unbxdKeys.includes('stage-'))) {
  // TODO - check if this is required - payload.body.filter = '-unbxd_oos_uFilter:"true"';
  // }

  return executeUnbxdAPICall(payload)
    .then(res => {
      // if (this.apiHelper.responseContainsErrors(res)) {
      // TODO - handle error - throw new ServiceResponseError(res);
      // }
      const groupedResponse = {};
      const productIds = [];

      res.body.response.products.forEach(productItem => {
        const product = productItem;
        const productId = getProductId(product);
        product.list_of_attributes = product.list_of_attributes
          ? attributeListMaker(product.list_of_attributes)
          : {};
        const groupingVal =
          extractAttributeValue(
            product,
            processHelpers.getProductAttributes().bundleGrouping
          ).toLowerCase() || productId;
        if (groupedResponse[groupingVal]) {
          groupedResponse[groupingVal].push(product);
        } else {
          groupedResponse[groupingVal] = [product];
          productIds.push(groupingVal);
        }
      });
      const formattedBundleProducts = productIds.map(bundleProduct => {
        return parseProductFromAPI(
          groupedResponse[bundleProduct],
          groupedResponse[bundleProduct][0].prodpartno,
          getImgPath,
          breadCrumbs,
          false,
          true,
          navigationTree
        ).product;
      });

      return formattedBundleProducts.map(bundleProduct => {
        const availableFilter = [];
        const setFilters = filter => {
          if (filter && !availableFilter.includes(filter)) {
            availableFilter.push(filter.toLowerCase());
          }
        };

        bundleProduct.colorFitsSizesMap.forEach(product => {
          if (product.familyType && product.familyType.includes('|')) {
            product.familyType.split('|').forEach(filter => {
              setFilters(filter);
            });
          } else setFilters(product.familyType);
        });
        return {
          products: bundleProduct,
          availableFilters: availableFilter,
        };
      });
    })
    .catch(err => {
      logger.error('error: ', err);
    });
};

export default getBundleProductsDetails;
