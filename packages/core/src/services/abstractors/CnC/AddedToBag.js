import { executeUnbxdAPICall, executeStatefulAPICall } from '../../handler';
import endpoints from '../../endpoints';

import {
  responseContainsErrors,
  ServiceResponseError,
  getFormattedError,
} from '../../../utils/errorMessage.util';

export const getUnboxResult = (endPoint, query) =>
  executeUnbxdAPICall({
    body: {
      rows: 20,
      variants: true,
      'variants.count': 100,
      version: 'V2',
      'facet.multiselect': true,
      selectedfacet: true,
      q: query,
      promotion: false,
      pagetype: 'boolean',
      fields:
        'alt_img,style_partno,giftcard,TCPProductIndUSStore,TCPWebOnlyFlagUSStore,TCPWebOnlyFlagCanadaStore,TCPFitMessageUSSstore,TCPFit,product_name,TCPColor,top_rated,imagename,productid,uniqueId,favoritedcount,TCPBazaarVoiceReviewCount,categoryPath3_catMap,categoryPath2_catMap,product_short_description,style_long_description,min_list_price,min_offer_price,TCPBazaarVoiceRating,product_long_description,seo_token,variantCount,prodpartno,variants,v_tcpfit,v_qty,v_tcpsize,style_name,v_item_catentry_id,v_listprice,v_offerprice,v_qty,variantId,auxdescription,list_of_attributes,additional_styles,TCPLoyaltyPromotionTextUSStore,TCPLoyaltyPLCCPromotionTextUSStore,v_variant,low_offer_price,high_offer_price,low_list_price,high_list_price,long_product_title',
    },
    webService: endPoint,
  }).then(res => res.body.response.products);

export const getPlpProducts = () => getUnboxResult(endpoints.getProductsBySearchTerm, 'denim');
export const getGiftCardProducts = () =>
  getUnboxResult(endpoints.getProductsBySearchTerm, 'gift card');

export const addMultipleProductsInEcom = paramsArray => {
  const atbSuccessProducts = [];
  return paramsArray.reduce((initialSynchPromise, params) => {
    return initialSynchPromise.then(() => {
      return executeStatefulAPICall({ body: params, webService: endpoints.addProductToCart })
        .then(res => {
          if (responseContainsErrors(res)) {
            throw new ServiceResponseError(res);
          }
          atbSuccessProducts.push({
            orderId: res.body.orderId && res.body.orderId[0],
            orderItemId: res.body.orderItemId && res.body.orderItemId[0],
          });
          return atbSuccessProducts;
        })
        .catch(err => {
          // eslint-disable-next-line no-throw-literal
          throw {
            error: getFormattedError(err),
            errorProductId: params.productId,
            atbSuccessProducts,
          };
        });
    });
  }, Promise.resolve());
};

export const addCartEcomItem = params =>
  executeStatefulAPICall({ body: params, webService: endpoints.addProductToCart })
    .then(res => {
      if (responseContainsErrors(res)) {
        throw new ServiceResponseError(res);
      }
      return {
        orderId: res.body.orderId && res.body.orderId[0],
        orderItemId: res.body.orderItemId && res.body.orderItemId[0],
      };
    })
    .catch(err => {
      throw getFormattedError(err);
    });

export const addCartBopisItem = (params, errorMapping) =>
  executeStatefulAPICall({ body: params, webService: endpoints.addOrderBopisItem })
    .then(res => {
      if (responseContainsErrors(res)) {
        throw new ServiceResponseError(res);
      }
      return {
        orderItemId: res.body.orderItemId,
      };
    })
    .catch(err => {
      throw getFormattedError(err, errorMapping);
    });

export default {
  getPlpProducts,
  getGiftCardProducts,
  addCartEcomItem,
  addCartBopisItem,
  addMultipleProductsInEcom,
};
