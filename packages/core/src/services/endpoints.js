import { API_METHODS, PRODUCTS_URI, SAVE_FOR_LATER } from './api.constants';

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
  addSmsSignup: {
    method: 'post',
    URI: 'v2/vibes/smsSignUp',
  },
  addEmailSignup: {
    method: 'post',
    URI: 'v2/store/addSignUpEmail',
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
  instantCreditApplication: {
    method: 'POST',
    URI: 'v2/ads_dms/processWIC',
  },
  updateCreditCard: {
    method: API_METHODS.POST,
    URI: 'v2/account/modifyCreditCardDetails',
  },
  addAddress: {
    method: API_METHODS.POST,
    URI: 'v2/account/addAddress',
  },
  addPaymentInstruction: {
    method: 'POST',
    URI: 'v2/checkout/addPaymentInstruction',
  },
  deletePaymentInstruction: {
    method: 'POST',
    URI: 'v2/checkout/deletePaymentInstruction',
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
  addAirmilesBanner: {
    method: 'post',
    URI: 'v2/wallet/updateAirMilesInfo',
  },
  requestPassword: {
    method: 'put',
    URI: 'v2/account/resetPassword',
  },
  updateProfileInfo: {
    method: 'put',
    URI: 'v2/account/updatesAccountDataForRegisteredUser',
  },
  getExtraPoints: {
    method: 'GET',
    URI: 'v2/account/points/waysToEarn',
  },
  getEarnedPointsNotication: {
    method: 'GET',
    URI: 'v2/wallet/points/nontransactional/current',
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
  addShipToStore: {
    method: API_METHODS.POST,
    URI: 'v2/cart/addShipToStore',
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
  getProductInfoForTranslationByPartNumber: {
    method: 'GET',
    URI: PRODUCTS_URI.PRODUCTS,
    unbxd: true,
    unbxdCustom: true,
  },
  deleteCreditCardOnAccount: {
    method: API_METHODS.POST,
    URI: 'v2/account/deleteCreditCardDetails',
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
  giftOptionsCmd: {
    method: API_METHODS.GET,
    URI: 'v2/checkout/giftOptionsCmd',
  },
  orderLookUp: {
    method: API_METHODS.GET,
    URI: 'v2/account/orderLookUp',
  },
  getUnqualifiedItems: {
    method: 'GET',
    URI: 'v2/cart/getUnqualifiedItems',
  },
  getShipmentMethods: {
    method: 'GET',
    URI: 'v2/checkout/getShipmentMethods',
  },
  updateShippingMethodSelection: {
    method: 'PUT',
    URI: 'v2/checkout/updateShippingMethodSelection',
  },
  getChildren: {
    method: API_METHODS.GET,
    URI: 'v2/account/getBirthdaySavings',
  },
  updateUserSurvey: {
    method: 'PUT',
    URI: 'v2/account/saveUserSurvey',
  },
  updatePaymentInstruction: {
    method: 'PUT',
    URI: 'v2/checkout/updatePaymentInstruction',
  },
  deleteChild: {
    method: 'POST',
    URI: 'v2/account/deleteBirthdaySavings',
  },
  addChild: {
    method: 'POST',
    URI: 'v2/account/addBirthdaySavings',
  },
  addGiftOptions: {
    method: 'POST',
    URI: 'v2/checkout/addGiftOptions',
  },
  internationalCheckoutSettings: {
    method: 'POST',
    URI: 'v2/checkout/internationalCheckout',
  },
  paypalLookUp: {
    method: 'GET',
    URI: 'v2/checkout/TCPPayPalCCLookUpRESTCmd',
  },
  paypalAuth: {
    method: 'GET',
    URI: 'v2/checkout/TCPPayPalCCAuthenticationRESTCmd',
  },
  searchBarApi: {
    method: 'GET',
    URI: PRODUCTS_URI.PRODUCTS_AUTOSUGGEST,
    unbxd: true,
  },
  // STORE LOCATORS
  getFavoriteStore: {
    method: 'GET',
    URI: 'v2/store/getFavouriteStoreLocation',
  },
  findStoresByCoordinates: {
    method: 'GET',
    URI: 'v2/store/findStoresbyLatitudeandLongitude',
  },
  setFavoriteStore: {
    method: 'POST',
    URI: 'v2/store/addFavouriteStoreLocation',
  },

  getSocialAccountsInfo: {
    method: 'GET',
    URI: 'v2/account/preferences/socialNew',
  },

  saveSocialAccountsInfo: {
    method: 'PUT',
    URI: 'v2/account/preferences/socialNew',
  },
  getVenmoClientToken: {
    method: 'GET',
    URI: 'v2/venmo/getVenmoClientToken',
  },
  getAllSfl: {
    method: 'GET',
    URI: SAVE_FOR_LATER,
  },
  updateSflItem: {
    method: 'PUT',
    URI: SAVE_FOR_LATER,
  },
  deleteSflItem: {
    method: 'DELETE',
    URI: SAVE_FOR_LATER,
  },
  addSflItem: {
    method: 'POST',
    URI: SAVE_FOR_LATER,
  },
  getMyFavoriteStore: {
    method: API_METHODS.GET,
    URI: 'v2/store/getFavouriteStoreLocation?latitude&longitude&catEntryId&itemPartNumber',
  },
  getStoreandProductInventoryInfo: {
    method: 'GET',
    URI: 'v2/vendor/getStoreAndProductInventoryInfo',
  },
  checkout: {
    method: 'POST',
    URI: 'v2/checkout/addCheckout',
  },
  personalizedCoupons: {
    method: 'POST',
    URI: 'v2/coupons/getOffers',
  },
  getStoreInfo: {
    method: 'GET',
    URI: 'v2/store/info',
  },
  getNearByStore: {
    method: 'GET',
    URI: 'v2/store/nearBy',
  },
  getBOPISInventoryDetails: {
    method: 'POST',
    URI: 'v2/vendor/getBOPISInvetoryDetails',
  },
  getUserCartStoresAndInventory: {
    method: 'GET',
    URI: 'v2/bopis/getUserBopisStores',
  },
  claimPoints: {
    method: 'POST',
    URI: 'v2/account/points/claim',
  },
  navigateXHR: {
    method: 'POST',
    URI: 'v2/appconfig/navigateXHR',
  },
  getStyliticsProductViewById: {
    method: API_METHODS.GET,
    URI: 'https://widget-api.stylitics.com/api/outfits',
  },
  getDetailedOrderHistory: {
    method: 'GET',
    URI: 'v2/wallet/getPointsAndOrderHistory',
  },
  addOrUpdateWishlist: {
    method: 'PUT',
    URI: 'v2/wishlist/addOrUpdateWishlist',
  },
  getListofWishList: {
    method: 'GET',
    URI: 'v2/wishlist/getListOfWishlist',
  },
  getWishListbyId: {
    method: 'GET',
    URI: 'v2/wishlist/getWishListbyId',
  },
  createWishListForUser: {
    method: 'POST',
    URI: 'v2/wishlist/createWishListForUser',
  },
  moveWishListItem: {
    method: 'PUT',
    URI: 'v2/wishlist/moveItemToWishList',
  },
  deleteWishListForUser: {
    method: 'DELETE',
    URI: 'v2/wishlist/deleteWishListForUser',
  },
  editWishList: {
    method: 'PUT',
    URI: 'v2/wishlist/updateWishListForUser',
  },
  deleteWishListItemForUser: {
    method: 'DELETE',
    URI: 'v2/wishlist/deleteItemFromWishList',
  },
  shareWishListForUser: {
    method: 'POST',
    URI: 'v2/wishlist/shareWishListForUser',
  },
  getStoreLocationByCountry: {
    method: 'GET',
    URI: 'v2/store/getStoreLocationByCountry',
  },
};
export default endpoints;
