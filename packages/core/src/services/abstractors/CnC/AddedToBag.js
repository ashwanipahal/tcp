import { executeUnbxdAPICall, executeStatefulAPICall } from '../../handler';
import endpoints from '../../endpoints';

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

export const getPlpProducts = () => getUnboxResult(endpoints.getProductsBySearchTerm, '2092425');
export const getGiftCardProducts = () =>
  getUnboxResult(endpoints.getProductsBySearchTerm, 'gift card');

export const addCartEcomItem = params =>
  executeStatefulAPICall({ body: params, webService: endpoints.addProductToCart })
    .then(res => ({
      orderId: res.body.orderId && res.body.orderId[0],
      orderItemId: res.body.orderItemId && res.body.orderItemId[0],
    }))
    .catch(res => {
      throw res.error || res.body.error;
    });

export const addCartBopisItem = params =>
  executeStatefulAPICall({ body: params, webService: endpoints.addOrderBopisItem })
    .then(res => ({
      orderItemId: res.body.orderItemId,
    }))
    .catch(res => {
      throw res.error || res.body.error;
    });

export default {
  getPlpProducts,
  getGiftCardProducts,
  addCartEcomItem,
  addCartBopisItem,
};
