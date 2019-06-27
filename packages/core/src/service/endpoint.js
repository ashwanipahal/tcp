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
    method: 'get',
    baseURI: 'https://personator.melissadata.net/v3/WEB/ContactVerify/doContactVerify',
    relURI:
      '?id=63987687&format=json&act=Check&cols=Plus4%2CDeliveryIndicator&a1=2303%20Morgan%20Street&city=Irving&state=TX&postal=75062&ctry=US',
  },
  login: {
    method: 'post',
    relURI: '/api/v2/account/logon',
  },
  registeredUserInfo: {
    method: 'get',
    relURI: '/api/v2/account/getRegisteredUserInfo',
  },
  global: {
    baseURI: 'https://test4.childrensplace.com',
  },
};
export default endpoints;
