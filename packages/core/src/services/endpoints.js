import { API_METHODS } from './api.constants';

const endpoints = {
  graphQL: {
    int: 'https://niebw6f7lfeorgk6adlvicfnca.appsync-api.us-east-2.amazonaws.com/graphql',
    uat: 'https://vftt2fuvm5eu5jat3ounglwv3a.appsync-api.us-east-2.amazonaws.com/graphql',
    perf: 'https://563k2dzbojbsvnaaljusrz4y44.appsync-api.us-east-2.amazonaws.com/graphql',
    sandbox: 'https://lwmlzhk7g5grdgtbzozpgsb3lm.appsync-api.us-east-2.amazonaws.com/graphql',
  },
  getAddressList: {
    method: API_METHODS.GET,
    URI: 'v2/account/getAddressFromBook',
  },
  verifyAddress: {
    method: API_METHODS.GET,
    // TODO - Use MELISSA_KEY from config file
    URI: 'https://personator.melissadata.net/v3/WEB/ContactVerify/doContactVerify',
  },
  emailVerification: {
    method: API_METHODS.GET,
    URI: 'https://bpi.briteverify.com/emails.json',
    JSONP: true,
    reqTimeout: 2000,
  },
  getOrderDetails: {
    method: API_METHODS.GET,
    URI: 'v2/checkout/getOrderDetails',
  },
  addCreditCard: {
    method: API_METHODS.POST,
    URI: 'v2/account/addCreditCardDetails',
  },
  updateCreditCard: {
    method: API_METHODS.POST,
    URI: 'v2/account/modifyCreditCardDetails',
  },
  updateMultiSelectItemsToRemove: {
    method: 'PUT',
    URI: 'v2/cart/deleteMultipleOrderItems',
  },
  updateOrderItem: {
    method: 'PUT',
    URI: 'v2/cart/updateOrderItem',
  },
  createAccount: {
    method: API_METHODS.POST,
    URI: 'v2/wallet/addCustomerRegistration',
  },
  logon: {
    method: API_METHODS.POST,
    URI: 'v2/account/logon',
  },
  getRegisteredUserDetailsInfo: {
    method: API_METHODS.GET,
    URI: 'v2/account/getRegisteredUserInfo',
  },
  getPlpProducts: {
    method: API_METHODS.GET,
    baseURI: 'https://search.unbxd.io',
    relURI:
      '/8eb8cb308b493ec0a6d92bff22ef8df3/qa1-childrensplace-com702771542012808/category?start=0&rows=20&variants=true&variants.count=100&version=V2&facet.multiselect=true&selectedfacet=true&fields=alt_img,style_partno,giftcard,TCPProductIndUSStore,TCPWebOnlyFlagUSStore,TCPWebOnlyFlagCanadaStore,TCPFitMessageUSSstore,TCPFit,product_name,TCPColor,top_rated,imagename,productid,uniqueId,favoritedcount,TCPBazaarVoiceReviewCount,categoryPath3_catMap,categoryPath2_catMap,product_short_description,style_long_description,min_list_price,min_offer_price,TCPBazaarVoiceRating,product_long_description,seo_token,variantCount,prodpartno,variants,v_tcpfit,v_qty,v_tcpsize,style_name,v_item_catentry_id,v_listprice,v_offerprice,v_qty,variantId,auxdescription,list_of_attributes,additional_styles,TCPLoyaltyPromotionTextUSStore,TCPLoyaltyPLCCPromotionTextUSStore,v_variant, low_offer_price, high_offer_price, low_list_price, high_list_price&pagetype=boolean&p-id=categoryPathId:%2247503%3E420029%3E420030%22&facet=false&uid=uid-1563870141566-31054',
  },
};
export default endpoints;
