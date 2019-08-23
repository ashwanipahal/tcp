import { API_METHODS, PRODUCTS_URI } from './api.constants';

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
  fullDetails: {
    method: API_METHODS.GET,
    URI: 'v2/checkout/cart',
  },
  addCreditCard: {
    method: API_METHODS.POST,
    URI: 'v2/account/addCreditCardDetails',
  },
  updateCreditCard: {
    method: API_METHODS.POST,
    URI: 'v2/account/modifyCreditCardDetails',
  },
  addAddress: {
    method: API_METHODS.POST,
    URI: 'v2/account/addAddress',
  },
  updateAddress: {
    method: 'put',
    URI: 'v2/wallet/updateAddress',
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
  getListofDefaultWishlist: {
    method: API_METHODS.GET,
    URI: 'v2/wishlist/getListOfDefaultWishlist',
  },
  getCouponList: {
    method: API_METHODS.GET,
    URI: 'v2/account/getAddressFromBook',
  },
  logout: {
    method: API_METHODS.DELETE,
    URI: 'v2/account/logout',
  },

  getPointsHistory: {
    method: API_METHODS.GET,
    URI: 'v2/wallet/getMyPointHistory',
  },
  bonusPoints: {
    method: API_METHODS.GET,
    URI: 'v2/account/bonusDay',
  },
  applyBonusPoints: {
    method: API_METHODS.POST,
    URI: 'v2/account/bonusDay',
  },
  addCoupons: {
    method: 'post',
    URI: 'v2/checkout/coupons',
  },
  requestPassword: {
    method: 'put',
    URI: 'v2/account/resetPassword',
  },
  updateProfileInfo: {
    method: 'put',
    URI: 'v2/account/updatesAccountDataForRegisteredUser',
  },
  getGifCardBalance: {
    method: API_METHODS.POST,
    URI: 'v2/wallet/getGiftCardBalance',
  },
  setDefaultPayment: {
    method: API_METHODS.POST,
    URI: 'v2/account/modifyCreditCardDetails',
  },
  getCardList: {
    method: API_METHODS.GET,
    URI: 'v2/account/getCreditCardDetails',
  },
  addGiftCard: {
    method: API_METHODS.POST,
    URI: 'v2/account/addCreditCardDetails',
  },
  setDefaultShippingAddress: {
    method: API_METHODS.PUT,
    URI: 'v2/wallet/updateAddress',
  },
  deleteAddress: {
    method: API_METHODS.DELETE,
    URI: 'v2/account/deleteAddressDetails',
  },
  getProductDetails: {
    method: 'GET',
    URI: PRODUCTS_URI.PRODUCTS,
    unbxd: true,
    unbxdCustom: true,
  },
  getProductsByOutfits: {
    method: 'GET',
    URI: PRODUCTS_URI.PRODUCTS_BY_OUTFITS,
  },
  getProductviewbyCategory: {
    method: 'GET',
    URI: PRODUCTS_URI.PRODUCTS_VIEW_BY_CATEGORY,
  },
  getProductsBySearchTerm: {
    method: 'GET',
    URI: PRODUCTS_URI.PRODUCTS_BY_SEARCH,
    unbxd: true,
  },
  getProductInfoById: {
    method: 'GET',
    URI: PRODUCTS_URI.PRODUCTS_BY_SEARCH,
    unbxd: true,
  },
  deleteCreditCardOnAccount: {
    method: API_METHODS.POST,
    URI: 'v2/account/deleteCreditCardDetails',
  },
  getPlpProducts: {
    method: 'get',
    domain: '://search.unbxd.io',
    // URI:
    //   '/8870d5f30d9bebafac29a18cd12b801d/childrensplace-com702771523455856/category?start=0&rows=20&variants=true&variants.count=100&version=V2&facet.multiselect=true&selectedfacet=true&fields=alt_img,style_partno,giftcard,TCPProductIndUSStore,TCPWebOnlyFlagUSStore,TCPWebOnlyFlagCanadaStore,TCPFitMessageUSSstore,TCPFit,product_name,TCPColor,top_rated,imagename,productid,uniqueId,favoritedcount,TCPBazaarVoiceReviewCount,categoryPath3_catMap,categoryPath2_catMap,product_short_description,style_long_description,min_list_price,min_offer_price,TCPBazaarVoiceRating,product_long_description,seo_token,variantCount,prodpartno,variants,v_tcpfit,v_qty,v_tcpsize,style_name,v_item_catentry_id,v_listprice,v_offerprice,v_qty,variantId,auxdescription,list_of_attributes,additional_styles,TCPLoyaltyPromotionTextUSStore,TCPLoyaltyPLCCPromotionTextUSStore,v_variant,%20low_offer_price,%20high_offer_price,%20low_list_price,%20high_list_price, TcpBossProductDisabled, TcpBossCategoryDisabled&pagetype=boolean&p-id=categoryPathId:%2247511%3E49005%22&sort=sort_49005%20asc,pop_score%20desc%27',
    URI:
      '/8870d5f30d9bebafac29a18cd12b801d/qa1-childrensplace-com702771542012808/search?variants=true&variants.count=100&version=V2&rows=20&pagetype=boolean&q=2092425&promotion=false&fields=alt_img,style_partno,giftcard,TCPProductIndUSStore,TCPWebOnlyFlagUSStore,TCPWebOnlyFlagCanadaStore,TCPFitMessageUSSstore,TCPFit,product_name,TCPColor,top_rated,imagename,productid,uniqueId,favoritedcount,TCPBazaarVoiceReviewCount,categoryPath3_catMap,categoryPath2_catMap,product_short_description,style_long_description,min_list_price,min_offer_price,TCPBazaarVoiceRating,product_long_description,seo_token,variantCount,prodpartno,variants,v_tcpfit,v_qty,v_tcpsize,style_name,v_item_catentry_id,v_listprice,v_offerprice,v_qty,variantId,auxdescription,list_of_attributes,additional_styles,TCPLoyaltyPromotionTextUSStore,TCPLoyaltyPLCCPromotionTextUSStore,v_variant,%20low_offer_price,%20high_offer_price,%20low_list_price,%20high_list_price,long_product_title&uid=uid-1562746344280-64813',
  },
  getGiftCardProducts: {
    method: 'get',
    domain: '://search.unbxd.io',
    URI:
      '/8870d5f30d9bebafac29a18cd12b801d/qa1-childrensplace-com702771542012808/search?start=0&rows=20&variants=true&variants.count=100&version=V2&facet.multiselect=true&selectedfacet=true&fields=alt_img,style_partno,giftcard,TCPProductIndUSStore,TCPWebOnlyFlagUSStore,TCPWebOnlyFlagCanadaStore,TCPFitMessageUSSstore,TCPFit,product_name,TCPColor,top_rated,imagename,productid,uniqueId,favoritedcount,TCPBazaarVoiceReviewCount,categoryPath3_catMap,categoryPath2_catMap,product_short_description,style_long_description,min_list_price,min_offer_price,TCPBazaarVoiceRating,product_long_description,seo_token,variantCount,prodpartno,variants,v_tcpfit,v_qty,v_tcpsize,style_name,v_item_catentry_id,v_listprice,v_offerprice,v_qty,variantId,auxdescription,list_of_attributes,additional_styles,TCPLoyaltyPromotionTextUSStore,TCPLoyaltyPLCCPromotionTextUSStore,v_variant, low_offer_price, high_offer_price, low_list_price, high_list_price&q=gift%20card&uid=uid-1563870141566-31054',
  },
  addProductToCart: {
    method: API_METHODS.POST,
    URI: 'v2/cart/addProductToCart',
  },
  addOrderBopisItem: {
    method: API_METHODS.POST,
    URI: 'v2/bopis/createBopisOrder',
  },
  removeCouponOrPromo: {
    method: 'POST',
    URI: 'v2/checkout/removePromotionCode',
  },
  getAllOffers: {
    method: API_METHODS.GET,
    URI: 'v2/wallet/getAllCoupons',
  },
  orderLookUp: {
    method: API_METHODS.GET,
    URI: 'v2/account/orderLookUp',
  },
  getUnqualifiedItems: {
    method: 'GET',
    URI: 'v2/cart/getUnqualifiedItems',
  },
};
export default endpoints;
