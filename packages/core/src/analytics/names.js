/**
 * Names of basic tracking events.
 * @see https://bitbucket.org/TCP_BitBucket_Admin/tcp_omniture_-_marketing/src/master/src/global/data/constants/event-names.js
 */
export const TRACK_LINK_CLICK = 'trackLinkEvent';
export const TRACK_PAGE_VIEW = 'trackPageView';

/**
 * Names of service events.
 * @see https://bitbucket.org/TCP_BitBucket_Admin/tcp_omniture_-_marketing/src/master/src/global/data/constants/endpoints.js
 */
export const ACCEPT_OR_DECLINE_WIC = 'acceptOrDeclineWIC';
export const ADD_ADDRESS = 'addAddress';
export const ADD_CHECKOUT = 'addCheckout';
export const ADD_CHILD = 'addChild';
export const ADD_COUPONS = 'addCoupons';
export const ADD_CREDIT_CARD_DETAILS = 'addCreditCardDetails';
export const ADD_CUSTOMER_REGISTRATION = 'addCustomerRegistration';
export const ADD_GIFT_CARD_TO_ACCOUNT = 'addGiftCardToAccount';
export const ADD_GIFT_OPTIONS = 'addGiftOptions';
export const ADD_OR_UPDATE_WISHLIST = 'addOrUpdateWishlist';
export const ADD_ORDER_BOPIS_ITEM = 'addOrderBopisItem';
export const ADD_ORDER_ITEM = 'addOrderItem';
export const ADD_PAYMENT_INSTRUCTION = 'addPaymentInstruction';
export const ADD_PRODUCT_TO_CART = 'addProductToCart';
export const ADD_SHIP_TO_STORE = 'addShipToStore';
export const ADD_SIGN_UP_EMAIL = 'addSignUpEmail';
export const ADD_WISH_LIST_ITEM = 'addWishListItem';
export const APPLICATION_KILL_SWITCHES = 'applicationKillSwitches';
export const AUTH_TOKEN = 'authToken';
export const CHECKOUT = 'checkout';
export const CLAIM_POINTS = 'claimPoints';
export const CREATE_WISHLIST = 'createWishList';
export const CREATE_WISHLIST_FOR_USER = 'createWishListForUser';
export const DELETE_ADDRESS_DETAILS = 'deleteAddressDetails';
export const DELETE_ADDRESS_ON_ACCOUNT = 'deleteAddressOnAccount';
export const DELETE_ALL_ITEMS_IN_CART = 'deleteAllItemsInCart';
export const DELETE_CHILD = 'deleteChild';
export const DELETE_CREDIT_CARD_DETAILS = 'deleteCreditCardDetails';
export const DELETE_CREDIT_CARD_ON_ACCOUNT = 'deleteCreditCardOnAccount';
export const DELETE_FAVORITE_STORE = 'deleteFavoriteStore';
export const DELETE_GIFT_CARD_ON_ACCOUNT = 'deleteGiftCardOnAccount';
export const DELETE_PAYMENT_INSTRUCTION = 'deletePaymentInstruction';
export const DELETE_WISHLIST_FOR_USER = 'deleteWishListForUser';
export const DELETE_WISHLIST_ITEM_FOR_USER = 'deleteWishListItemForUser';
export const EDIT_WISHLIST = 'editWishList';
export const FIND_STORES_BY_LATITUDE_AND_LONGITUDE = 'findStoresbyLatitudeandLongitude';
export const GET_ADDRESS_FROM_BOOK = 'getAddressFromBook';
export const GET_ADDRESS_VERIFICATION = 'getAddressVerification';
export const GET_ALL_AVAILABLE_COUPONS_AND_PROMOS = 'getAllAvailableCouponsAndPromos';
export const GET_ALL_SFL = 'getAllSfl';
export const GET_ASSIGNED_PROMOTION_CODE_INFO = 'getAssignedPromotioncodeInfo';
export const GET_AUTO_SUGGESTIONS = 'getAutoSuggestions';
export const GET_AUTO_SUGGESTIONS_UNBXD = 'getAutoSuggestionsUnbxd';
export const GET_BOPIS_INVENTORY_DETAILS = 'getBOPISInventoryDetails';
export const GET_CART_INFO = 'getCartInfo';
export const GET_CHILDREN = 'getChildren';
export const GET_COUNTRY_HANDLER = 'getCountryHandler';
export const GET_COUNTRY_LIST = 'getCountryList';
export const GET_COUPON = 'getCoupon';
export const GET_CREDIT_CARD_DETAILS = 'getCreditCardDetails';
export const GET_DETAILED_ORDER_HISTORY = 'getDetailedOrderHistory';
export const GET_ESPOT = 'getESpot';
export const GET_FAVORITE_STORE = 'getFavoriteStore';
export const GET_GIFT_CARD_BALANCE = 'getGifCardBalance'; // TODO: fix typo on production
export const GET_HEADER_SERVICE = 'getHeaderService';
export const GET_INVENTORY_FOR_OUTFITS = 'getInventoryForOutfits';
export const GET_LIST_OF_DEFAULT_WISHLIST = 'getListofDefaultWishlist';
export const GET_LIST_OF_WISHLIST = 'getListofWishList';
export const GET_MY_POINT_HISTORY = 'getMyPointHistory';
export const GET_ORDER_AND_COUPON_DETAILS = 'getOrdersAndCouponDetails';
export const GET_ORDER_CONFIRMATION = 'getOrderConfirmation';
export const GET_ORDER_DETAILS = 'getOrderDetails';
export const GET_ORDER_HISTORY = 'getOrderHistory';
export const GET_ORDER_REVIEW = 'getOrderReview';
export const GET_ORDER_SUMMARY = 'getOrderSummary';
export const GET_PAYMENT_INFO = 'getPaymentInfo';
export const GET_POINTS_HISTORY = 'getPointsHistory';
export const GET_POINTS_SERVICE = 'getPointsService';
export const GET_PRODUCT_DETAILS = 'getProductDetails';
export const GET_PRODUCT_INFO_BY_ID = 'getProductInfoById';
export const GET_PRODUCT_VIEW_BY_CATEGORY = 'getProductviewbyCategory';
export const GET_PRODUCTS_BY_OUTFITS = 'getProductsByOutfits';
export const GET_PRODUCTS_BY_SEARCH_TERM = 'getProductsBySearchTerm';
export const GET_REGISTERED_USER_DETAILS_INFO = 'getRegisteredUserDetailsInfo';
export const GET_RESERVATION_HISTORY = 'getReservationHistory';
export const GET_SHIPMENT_METHODS = 'getShipmentMethods';
export const GET_SITE_PROMOTIONS = 'getSitePromotions';
export const GET_SKU_DETAILS = 'getSKUDetails';
export const GET_SKU_INVENTORY_AND_PRODUCT_COUNTER_DETAILS =
  'getSKUInventoryandProductCounterDetails';
export const GET_STATIC_ESPOT = 'getStaticESpot';
export const GET_STORE_AND_PRODUCT_INVENTORY_INFO = 'getStoreandProductInventoryInfo';
export const GET_STORE_INFO_BY_LOCATION_ID = 'getStoreInfoByLocationId';
export const GET_STORE_LOCATION_BY_COUNTRY = 'getStoreLocationByCountry';
export const GET_SWATCHES_AND_SIZE_INFO = 'getSwatchesAndSizeInfo';
export const GET_UNQUALIFIED_ITEMS = 'getUnqualifiedItems';
export const GET_USER_BOPIS_STORES = 'getUserBopisStores';
export const GET_USER_PAYMENT_INFORMATION = 'getUserPaymentInformation';
export const GET_USER_WISHLISTS = 'getUserWishlists';
export const GET_WISHLIST_BY_ID = 'getWishListbyId';
export const GIFT_OPTIONS_CMD = 'giftOptionsCmd';
export const INSTANT_CREDIT_APPLICATION = 'instantCreditApplication';
export const INTERNATIONAL_CHECKOUT_SETTINGS = 'internationalCheckoutSettings';
export const LOGON = 'logon';
export const LOGOUT = 'logout';
export const MAKE_WISHLIST_AS_DEFAULT = 'makeWishListasDefault';
export const MODIFY_CREDIT_CARD_DETAILS = 'modifyCreditCardDetails';
export const MOVE_WISHLIST_ITEM = 'moveWishListItem';
export const NEW_RESERVATION_LOOKUP = 'newReservationLookUp';
export const ORDER_LOOKUP = 'orderLookUp';
export const PAYPAL_AUTH = 'paypalAuth';
export const PAYPAL_LOOKUP = 'paypalLookUp';
export const PERSONALIZED_COUPONS = 'persoanlizedCoupons'; // TODO: fix typo on production
export const PRE_CHECKOUT = 'preCheckout';
export const PRE_SCREEN_APPLICATION = 'prescreenApplication';
export const PROCESS_PRESCREEN_CODE_VALIDATION = 'processPreScreenCodeValidation';
export const PROCESS_PRESCREEN_OFFER = 'processPreScreenOffer';
export const REMOVE_COUPON_OR_PROMO = 'removeCouponOrPromo';
export const REQUEST_PASSWORD = 'requestPassword';
export const RESERVATION_LOOKUP = 'reservationLookUp';
export const SEND_EMAIL_FOR_CONTACT_US = 'sendEmailForContactUs';
export const SET_DEFAULT_SHIPPING_ADDRESS = 'setDefaultShippingAddress';
export const SET_FAVORITE_STORE = 'setFavoriteStore';
export const SET_SHIP_TO_HOME = 'setShipToHome';
export const SHARE_WISHLIST_FOR_USER = 'shareWishListForUser';
export const SMS_MARKETING_SIGNUP = 'smsMarketingSignup';
export const SORTING_WISHLIST = 'sortingWishList';
export const START_EXPRESS_CHECKOUT = 'startExpressCheckout';
export const UPDATE_ACCOUNT_DATA_FOR_REGISTERED_USER = 'updatesAccountDataForRegisteredUser';
export const UPDATE_ADDRESS = 'updateAddress';
export const UPDATE_AIR_MILES_INFO = 'updateAirMilesInfo';
export const UPDATE_CHECKOUT = 'updateCheckout';
export const UPDATE_CHILD = 'updateChild';
export const UPDATE_DELETE_ITEM = 'updateDeleteItem';
export const UPDATE_DESCRIPTION_OF_WISH_LIST = 'updateDescriptionofWishList';
export const UPDATE_FAVORITE_STORE = 'updateFavoriteStore';
export const UPDATE_MULTI_SELECT_ITEMS_TO_REMOVE = 'updateMultiSelectItemsToRemove';
export const UPDATE_ORDER_BOPIS_ITEM = 'updateOrderBopisItem';
export const UPDATE_ORDER_ITEM = 'updateOrderItem';
export const UPDATE_PAYMENT_INSTRUCTION = 'updatePaymentInstruction';
export const UPDATE_PROFILE_INFO = 'updateProfileInfo';
export const UPDATE_SHIPPING_INFO = 'updateShippingInfo';
export const UPDATE_SHIPPING_METHOD_SELECTION = 'updateShippingMethodSelection';
export const UPDATE_USER_SHIPPING_ADDRESS = 'updateUserShippingAddress';
export const UPDATE_WISHLIST_ITEM = 'updateWishListItem';