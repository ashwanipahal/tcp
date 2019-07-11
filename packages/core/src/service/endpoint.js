const endpoints = {
  getPlpProducts: {
    method: 'get',
    baseURI: 'https://search.unbxd.io',
    relURI:
      '/8870d5f30d9bebafac29a18cd12b801d/childrensplace-com702771523455856/category?start=0&rows=20&variants=true&variants.count=0&version=V2&facet.multiselect=true&selectedfacet=true&fields=alt_img,style_partno,giftcard,TCPProductIndUSStore,TCPFitMessageUSSstore,TCPFit,TCPWebOnlyFlagUSStore,TCPWebOnlyFlagCanadaStore,TCPSwatchesUSStore,top_rated,TCPSwatchesCanadaStore,product_name,TCPColor,imagename,productid,uniqueId,favoritedcount,TCPBazaarVoiceReviewCount,categoryPath3_fq,categoryPath3,categoryPath3_catMap,categoryPath2_catMap,product_short_description,min_list_price,min_offer_price,TCPBazaarVoiceRating,seo_token,prodpartno,banner,facets,auxdescription,list_of_attributes,numberOfProducts,redirect,searchMetaData,didYouMean,TCPLoyaltyPromotionTextUSStore,TCPLoyaltyPLCCPromotionTextUSStore,TcpBossCategoryDisabled,TcpBossProductDisabled&pagetype=boolean&p-id=categoryPathId:%2247511%3E49005%22&sort=sort_49005%20asc,pop_score%20desc',
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
    baseURI: 'https://test1.childrensplace.com',
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
  getOrderDetails: {
    method: 'get',
    baseURI: 'http://test1.gymboree.com',
    relURI: '/api/v2/checkout/getOrderDetails',
  },
  registeredUserInfoPOC: {
    method: 'get',
    baseURI: 'http://test1.gymboree.com',
    relURI: '/api/v2/account/getRegisteredUserInfo',
  },
  setDefaultPayment: {
    method: 'post',
    relURI: '/api/v2/account/modifyCreditCardDetails',
  },
};
export default endpoints;
