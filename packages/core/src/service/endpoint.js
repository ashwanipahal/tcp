/* eslint-disable */
const endpoints = {
  getProductSkuInfo: {
    method: 'get',
    baseURI: 'https://search.unbxd.io',
    //  relURI:'/8870d5f30d9bebafac29a18cd12b801d/qa1-childrensplace-com702771542012808/search?variants=true&variants.count=100&version=V2&rows=20&pagetype=boolean&q=2092425&promotion=false&fields=alt_img,style_partno,giftcard,TCPProductIndUSStore,TCPWebOnlyFlagUSStore,TCPWebOnlyFlagCanadaStore,TCPFitMessageUSSstore,TCPFit,product_name,TCPColor,top_rated,imagename,productid,uniqueId,favoritedcount,TCPBazaarVoiceReviewCount,categoryPath3_catMap,categoryPath2_catMap,product_short_description,style_long_description,min_list_price,min_offer_price,TCPBazaarVoiceRating,product_long_description,seo_token,variantCount,prodpartno,variants,v_tcpfit,v_qty,v_tcpsize,style_name,v_item_catentry_id,v_listprice,v_offerprice,v_qty,variantId,auxdescription,list_of_attributes,additional_styles,TCPLoyaltyPromotionTextUSStore,TCPLoyaltyPLCCPromotionTextUSStore,v_variant,%20low_offer_price,%20high_offer_price,%20low_list_price,%20high_list_price,long_product_title&uid=uid-1562746344280-64813',
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

  requestPassword: {
    method: 'put',
    relURI: '/api/v2/account/resetPassword',
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
  logout: {
    method: 'delete',
    relURI: '/api/v2/account/logout',
  },
};
export default endpoints;
