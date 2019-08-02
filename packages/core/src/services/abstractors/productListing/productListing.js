/* eslint-disable sonarjs/no-duplicate-string */
import mock from './mock';
import { executeUnbxdAPICall } from '../../handler';
import endpoints from '../../endpoints';

/**
 * Abstractor layer for loading data from API for Navigation
 */
const Abstractor = {
  getProducts: () => {
    console.log('get products');
    const payload = {
      webService: endpoints.getPlpProducts,
      url: '/8eb8cb308b493ec0a6d92bff22ef8df3/qa1-childrensplace-com702771542012808/category',
      queryString:
        'start=0&rows=20&variants=true&variants.count=100&version=V2&facet.multiselect=true&selectedfacet=true&fields=alt_img,style_partno,giftcard,TCPProductIndUSStore,TCPWebOnlyFlagUSStore,TCPWebOnlyFlagCanadaStore,TCPFitMessageUSSstore,TCPFit,product_name,TCPColor,top_rated,imagename,productid,uniqueId,favoritedcount,TCPBazaarVoiceReviewCount,categoryPath3_catMap,categoryPath2_catMap,product_short_description,style_long_description,min_list_price,min_offer_price,TCPBazaarVoiceRating,product_long_description,seo_token,variantCount,prodpartno,variants,v_tcpfit,v_qty,v_tcpsize,style_name,v_item_catentry_id,v_listprice,v_offerprice,v_qty,variantId,auxdescription,list_of_attributes,additional_styles,TCPLoyaltyPromotionTextUSStore,TCPLoyaltyPLCCPromotionTextUSStore,v_variant, low_offer_price, high_offer_price, low_list_price, high_list_price&pagetype=boolean&p-id=categoryPathId:%2247503%3E420029%3E420030%22&facet=false&uid=uid-1563870141566-31054',
    };
    return executeUnbxdAPICall(payload)
      .then(Abstractor.processData)
      .catch(Abstractor.handleValidationError);
  },
  getMock: () => {
    return Abstractor.processData(mock);
  },
  processData: res => {
    return res.body.response.products;
  },
};

export default Abstractor;
