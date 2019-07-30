/* eslint-disable */
const endpoints = {
  getPlpProducts: {
    method: 'get',
    baseURI: 'https://search.unbxd.io',
    //relURI: '/8870d5f30d9bebafac29a18cd12b801d/childrensplace-com702771523455856/category?start=0&rows=20&variants=true&variants.count=100&version=V2&facet.multiselect=true&selectedfacet=true&fields=alt_img,style_partno,giftcard,TCPProductIndUSStore,TCPWebOnlyFlagUSStore,TCPWebOnlyFlagCanadaStore,TCPFitMessageUSSstore,TCPFit,product_name,TCPColor,top_rated,imagename,productid,uniqueId,favoritedcount,TCPBazaarVoiceReviewCount,categoryPath3_catMap,categoryPath2_catMap,product_short_description,style_long_description,min_list_price,min_offer_price,TCPBazaarVoiceRating,product_long_description,seo_token,variantCount,prodpartno,variants,v_tcpfit,v_qty,v_tcpsize,style_name,v_item_catentry_id,v_listprice,v_offerprice,v_qty,variantId,auxdescription,list_of_attributes,additional_styles,TCPLoyaltyPromotionTextUSStore,TCPLoyaltyPLCCPromotionTextUSStore,v_variant, low_offer_price, high_offer_price, low_list_price, high_list_price&pagetype=boolean&p-id=categoryPathId:%2247511%3E49007%22&sort=sort_49007%20asc,pop_score%20desc',
    //relURI: '/8c1bc6cc0fa47076d417690a1e5e1120/test-childrensplace-com702771523873394/category?start=0&rows=20&variants=true&variants.count=100&version=V2&facet.multiselect=true&selectedfacet=true&fields=alt_img,style_partno,giftcard,TCPProductIndUSStore,TCPWebOnlyFlagUSStore,TCPWebOnlyFlagCanadaStore,TCPFitMessageUSSstore,TCPFit,product_name,TCPColor,top_rated,imagename,productid,uniqueId,favoritedcount,TCPBazaarVoiceReviewCount,categoryPath3_catMap,categoryPath2_catMap,product_short_description,style_long_description,min_list_price,min_offer_price,TCPBazaarVoiceRating,product_long_description,seo_token,variantCount,prodpartno,variants,v_tcpfit,v_qty,v_tcpsize,style_name,v_item_catentry_id,v_listprice,v_offerprice,v_qty,variantId,auxdescription,list_of_attributes,additional_styles,TCPLoyaltyPromotionTextUSStore,TCPLoyaltyPLCCPromotionTextUSStore,v_variant, low_offer_price, high_offer_price, low_list_price, high_list_price&pagetype=boolean&p-id=categoryPathId:%2247511%3E49012%22&sort=sort_49012%20asc,pop_score%20desc',
    //relURI: '/eca739af82cb68a25894f91327293118/qa2-childrensplace-com702771542012894/category?start=0&rows=100&variants=true&variants.count=100&version=V2&facet.multiselect=true&selectedfacet=true&fields=alt_img,style_partno,giftcard,TCPProductIndUSStore,TCPWebOnlyFlagUSStore,TCPWebOnlyFlagCanadaStore,TCPFitMessageUSSstore,TCPFit,product_name,TCPColor,top_rated,imagename,productid,uniqueId,favoritedcount,TCPBazaarVoiceReviewCount,categoryPath3_catMap,categoryPath2_catMap,product_short_description,style_long_description,min_list_price,min_offer_price,TCPBazaarVoiceRating,product_long_description,seo_token,variantCount,prodpartno,variants,v_tcpfit,v_qty,v_tcpsize,style_name,v_item_catentry_id,v_listprice,v_offerprice,v_qty,variantId,auxdescription,list_of_attributes,additional_styles,TCPLoyaltyPromotionTextUSStore,TCPLoyaltyPLCCPromotionTextUSStore,v_variant, low_offer_price, high_offer_price, low_list_price, high_list_price&pagetype=boolean&p-id=categoryPathId:%2247503%3E489021%3E489058%22&facet=false&uid=uid-1563870141566-31054',
    //relURI:'/8eb8cb308b493ec0a6d92bff22ef8df3/qa1-childrensplace-com702771542012808/category?start=0&rows=20&variants=true&variants.count=100&version=V2&facet.multiselect=true&selectedfacet=true&fields=alt_img,style_partno,giftcard,TCPProductIndUSStore,TCPFitMessageUSSstore,TCPFit,TCPWebOnlyFlagUSStore,TCPWebOnlyFlagCanadaStore,TCPSwatchesUSStore,top_rated,TCPSwatchesCanadaStore,product_name,TCPColor,imagename,productid,uniqueId,favoritedcount,TCPBazaarVoiceReviewCount,categoryPath3_fq,categoryPath3,categoryPath3_catMap,categoryPath2_catMap,product_short_description,min_list_price,min_offer_price,TCPBazaarVoiceRating,seo_token,prodpartno,banner,facets,auxdescription,list_of_attributes,numberOfProducts,redirect,searchMetaData,didYouMean,TCPLoyaltyPromotionTextUSStore,TCPLoyaltyPLCCPromotionTextUSStore,TcpBossCategoryDisabled,TcpBossProductDisabled,long_product_title&pagetype=boolean&p-id=categoryPathId:%2247511%3E420015%3E420016%22&facet=false&uid=uid-1563870141566-31054',
    relURI:
      '/8eb8cb308b493ec0a6d92bff22ef8df3/qa1-childrensplace-com702771542012808/category?start=0&rows=20&variants=true&variants.count=100&version=V2&facet.multiselect=true&selectedfacet=true&fields=alt_img,style_partno,giftcard,TCPProductIndUSStore,TCPWebOnlyFlagUSStore,TCPWebOnlyFlagCanadaStore,TCPFitMessageUSSstore,TCPFit,product_name,TCPColor,top_rated,imagename,productid,uniqueId,favoritedcount,TCPBazaarVoiceReviewCount,categoryPath3_catMap,categoryPath2_catMap,product_short_description,style_long_description,min_list_price,min_offer_price,TCPBazaarVoiceRating,product_long_description,seo_token,variantCount,prodpartno,variants,v_tcpfit,v_qty,v_tcpsize,style_name,v_item_catentry_id,v_listprice,v_offerprice,v_qty,variantId,auxdescription,list_of_attributes,additional_styles,TCPLoyaltyPromotionTextUSStore,TCPLoyaltyPLCCPromotionTextUSStore,v_variant, low_offer_price, high_offer_price, low_list_price, high_list_price&pagetype=boolean&p-id=categoryPathId:%2247503%3E420029%3E420030%22&facet=false&uid=uid-1563870141566-31054',
  },
  getGiftCardProducts: {
    method: 'get',
    baseURI: 'https://search.unbxd.io',
    relURI:
      '/8eb8cb308b493ec0a6d92bff22ef8df3/qa1-childrensplace-com702771542012808/search?start=0&rows=20&variants=true&variants.count=100&version=V2&facet.multiselect=true&selectedfacet=true&fields=alt_img,style_partno,giftcard,TCPProductIndUSStore,TCPWebOnlyFlagUSStore,TCPWebOnlyFlagCanadaStore,TCPFitMessageUSSstore,TCPFit,product_name,TCPColor,top_rated,imagename,productid,uniqueId,favoritedcount,TCPBazaarVoiceReviewCount,categoryPath3_catMap,categoryPath2_catMap,product_short_description,style_long_description,min_list_price,min_offer_price,TCPBazaarVoiceRating,product_long_description,seo_token,variantCount,prodpartno,variants,v_tcpfit,v_qty,v_tcpsize,style_name,v_item_catentry_id,v_listprice,v_offerprice,v_qty,variantId,auxdescription,list_of_attributes,additional_styles,TCPLoyaltyPromotionTextUSStore,TCPLoyaltyPLCCPromotionTextUSStore,v_variant, low_offer_price, high_offer_price, low_list_price, high_list_price&q=gift%20card&uid=uid-1563870141566-31054',
  },
  getTaxonomy: {
    method: 'get',
    baseURI: 'https://search.unbxd.io',
    relURI: '/sites/test-childrensplace-com702771523873394/taxonomy?depth=3',
  },
  getEspots: {
    method: 'get',
    baseURI: 'https://test1.childrensplace.com',
    relURI: '/api/getESpot',
  },
  addProductToCart: {
    method: 'post',
    relURI: '/api/v2/cart/addProductToCart',
  },
  addOrderBopisItem: {
    method: 'post',
    relURI: '/api/v2/bopis/createBopisOrder',
  },
  addAddress: {
    method: 'post',
    relURI: '/api/v2/account/addAddress',
  },
  updateAddress: {
    method: 'put',
    relURI: '/api/v2/wallet/updateAddress',
  },
  login: {
    method: 'post',
    relURI: '/api/v2/account/logon',
  },
  registeredUserInfo: {
    method: 'get',
    relURI: '/api/v2/account/getRegisteredUserInfo',
  },
  getAddressList: {
    method: 'get',
    relURI: '/api/v2/account/getAddressFromBook',
  },
  getCardList: {
    method: 'get',
    relURI: '/api/v2/account/getCreditCardDetails',
  },
  deleteAddress: {
    method: 'delete',
    relURI: '/api/v2/account/deleteAddressDetails',
  },
  deleteCreditCardOnAccount: {
    method: 'post',
    relURI: '/api/v2/account/deleteCreditCardDetails',
  },
  verifyAddress: {
    method: 'get',
    relURI:
      '/v3/WEB/ContactVerify/doContactVerify?id=63987687&format=json&act=Check&cols=Plus4%2CDeliveryIndicator&',
    baseURI: 'https://personator.melissadata.net',
  },
  global: {
    baseURI: 'https://test4.childrensplace.com',
  },
  setDefaultShippingAddress: {
    method: 'put',
    relURI: '/api/v2/wallet/updateAddress',
  },
  getGifCardBalance: {
    method: 'post',
    relURI: '/api/v2/wallet/getGiftCardBalance',
  },
  getOrderDetails: {
    method: 'get',
    baseURI: 'https://test1.gymboree.com',
    relURI: '/api/v2/checkout/getOrderDetails',
  },
  registeredUserInfoPOC: {
    method: 'get',
    baseURI: 'https://test1.gymboree.com',
    relURI: '/api/v2/account/getRegisteredUserInfo',
  },
  setDefaultPayment: {
    method: 'post',
    relURI: '/api/v2/account/modifyCreditCardDetails',
  },
  emailVerification: {
    method: 'get',
    baseURI: '',
    relURI: 'https://bpi.briteverify.com/emails.json',
  },
  addEmailSignup: {
    method: 'post',
    baseURI: 'https://test4.childrensplace.com',
    relURI: '/api/v2/store/addSignUpEmail',
  },
  addSmsSignup: {
    method: 'post',
    baseURI: 'https://test4.childrensplace.com',
    relURI: '/api/v2/vibes/smsSignUp',
  },
  addGiftCard: {
    baseURI: 'https://test4.childrensplace.com',
    method: 'post',
    relURI: '/api/v2/account/addCreditCardDetails',
  },
  createAccount: {
    method: 'post',
    relURI: '/api/v2/wallet/addCustomerRegistration',
  },
};
export default endpoints;
