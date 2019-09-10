export const HEADER_REDUCER_KEY = 'Header';
export const FOOTER_REDUCER_KEY = 'Footer';
export const LABEL_REDUCER_KEY = 'Labels';
export const LAYOUT_REDUCER_KEY = 'Layouts';
export const MODULES_REDUCER_KEY = 'Modules';
export const HOMEPAGE_REDUCER_KEY = 'HomePage';
export const NAVIGATION_REDUCER_KEY = 'Navigation';
export const PRODUCT_LISTING_REDUCER_KEY = 'ProductListing';
export const FORM_REDUCER_KEY = 'form';
export const LOADER_REDUCER_KEY = 'PageLoader';
export const TOAST_REDUCER_KEY = 'Toast';
export const RECOMMENDATIONS_REDUCER_KEY = 'Recommendations';
export const SEARCH_REDUCER_KEY = 'Search';

// Don't Add "Reducer" in the Key - it should be LoginPage, not LoginPageReducer

// Login Page Reducer
export const LOGINPAGE_REDUCER_KEY = 'LoginPageReducer';
export const ADDRESSBOOK_REDUCER_KEY = 'AddressBookReducer';
export const ADDRESSBOOK_ACTION_PATTERN = '@@AddressBook-';
export const PAYMENT_REDUCER_KEY = 'PaymentReducer';
export const FORGOTPASSWORD_ACTION_PATTERN = '@@ForgotPassword-';
export const FORGOTPASSWORD_REDUCER_KEY = 'ForgotPasswordReducer';
export const ADDED_TO_BAG_REDUCER_KEY = 'AddedToBagReducer';
export const ADD_GIFT_CARD_REDUCER_KEY = 'AddGiftCardReducer';
export const PAYMENT_ACTION_PATTERN = '@@payment-';
export const ADD_GIFT_CARD_ACTION_PATTERN = '@@AddGiftCard-';
export const LOGINPAGE_ACTION_PATTERN = '@@Login-';
export const ACCOUNTHEADER_ACTION_PATTERN = '@@AccountHeader-';
export const ACCOUNTHEADER_REDUCER_KEY = 'AccountHeader';
export const CARTITEMTILE_REDUCER_KEY = 'CartItemTileReducer';
export const CARTPAGE_REDUCER_KEY = 'CartPageReducer';
export const CHECKOUT_REDUCER_KEY = 'Checkout';
export const OVERLAY_MODAL_REDUCER_KEY = 'OverlayModalReducer';
export const OVERLAY_MODAL_ACTION_PATTERN = '@@Overlay-';
export const BONUS_POINTS_DAYS = '@@Bonus-';
export const BONUS_POINTS_DAYS_REDUCER_KEY = 'BonusPointsDaysReducer';
export const USER_ACTION_PATTERN = '@@User-';
export const USER_REDUCER_KEY = 'User';
export const BIRTHDAY_SAVINGS_ACTION_PATTERN = '@@BirthdaySavings';
export const NAVIGATION_ACTION_PATTERN = '@@Navigation-';
export const RECOMMENDATIONS_ACTION_PATTERN = '@@Recommendations-';

// acconut page reducer
export const ACCOUNT_REDUCER_KEY = 'AccountReducer';
export const ACCOUNT_ACTION_PATTERN = '@@Account-';

// feature/acconut page reducer
export const CREATE_ACCOUNT_REDUCER_KEY = 'CreateAccountReducer';
export const CREATE_ACCOUNT_ACTION_PATTERN = '@@CreateAccount-';

// Add address page reducer
export const ADDEDITADDRESS_REDUCER_KEY = 'AddEditAddressReducer';
export const ADDEDITADDRESS_ACTION_PATTERN = '@@Address-';

// set api config reducer
export const APICONFIG_REDUCER_KEY = 'APIConfig';
export const APICONFIG_ACTION_PATTERN = '@@APICONFIG-';

// set api config reducer
export const SESSIONCONFIG_REDUCER_KEY = 'Session';
export const SESSIONCONFIG_ACTION_PATTERN = '@@SessionConfig-';

// Add/Update Credit Card reducer
export const ADDEDITCREDITCARD_REDUCER_KEY = 'AddEditCreditCardReducer';

// ProductListing Page Reducer
export const PRODUCTLISTINGPAGE_REDUCER_KEY = 'ProductListingPage';
export const PRODUCTLISTINGPAGE_ACTION_PATTERN = '@@PLP-';

// Product Detail Page Reducer
export const PRODUCT_DETAIL_REDUCER_KEY = 'ProductDetail';
export const PRODUCT_DETAIL_ACTION_PATTERN = '@@PDP-';

// Email signup reducer
export const EMAIL_SIGNUP_REDUCER_KEY = 'EmailSignUp';
export const SMS_SIGNUP_REDUCER_KEY = 'SmsSignUp';

// Country Selector reducer
export const COUNTRY_SELECTOR_REDUCER_KEY = 'CountrySelector';
export const COUNTRY_SELECTOR_ACTION_PATTERN = '@@CountrySelector-';

// Get Candid reducer
export const GET_CANDID_REDUCER_KEY = 'GetCandid';
export const GET_CANDID_ACTION_PATTERN = '@@GetCandid-';

// Coupon reducer
export const COUPON_REDUCER_KEY = 'CouponsAndPromos';
export const COUPON_ACTION_PATTERN = '@@CouponsAndPromos-';

// Airmiles Banner reducer
export const AIRMILES_BANNER_REDUCER_KEY = 'AirmilesBanner';
export const AIRMILES_BANNER_ACTION_PATTERN = '@@AirmilesBanner-';
// logout reducer
export const LOGOUT_REDUCER_KEY = 'logoutReducer';
export const LOGOUT_ACTION_PATTERN = '@@logout-';

// Ponit History reducer
export const POINTS_HISTORY_REDUCER_KEY = 'pointHistoryReducer';
export const POINTS_HISTORY_ACTION_PATTERN = '@@pointHistory-';

export const RESET_PASSWORD_REDUCER_KEY = 'ResetPassword';
export const RESET_PASSWORD_ACTION_PATTERN = '@@ResetPassword-';
export const TRACK_ORDER_REDUCER_KEY = 'TrackOrderReducer';
export const TRACK_ORDER_ACTION_PATTERN = '@@TrackOrder-';

// change password reducer
export const CHANGE_PASSWORD_REDUCER_KEY = 'ChangePassword';
export const CHANGE_PASSWORD_ACTION_PATTERN = '@@ChangePassword-';

// Update Profile reducer
export const UPDATE_PROFILE_REDUCER_KEY = 'UpdateProfile';
export const UPDATE_PROFILE_ACTION_PATTERN = '@@UpdateProfile-';

// My Profile reducer
export const MY_PROFILE_REDUCER_KEY = 'MyProfile';
export const MY_PROFILE_ACTION_PATTERN = '@@MyProfile-';

// device type detection
export const DEVICE_INFO_REDUCER_KEY = 'DeviceInfo';

// plcc card Page Reducer
export const APPLY_PLCC_REDUCER_KEY = 'ApplyCardPage';
export const APPLY_PLCC_ACTION_PATTERN = '@@ApplyCardPage-';
// optimizely features reducer
export const OPTIMIZELY_FEATURES_REDUCER = 'OptimizelyFeatures';

// ProductTabList reducer
export const PRODUCT_TAB_LIST_REDUCER_KEY = 'ProductTabList';
export const PRODUCT_TAB_LIST_ACTION_PATTERN = '@@ProductTabList-';
export const MAILING_ADDRESS_REDUCER_KEY = 'AddMailingAddressReducer';
export const BIRTHDAY_SAVING_LIST_REDUCER_KEY = 'BirthdaySavingsList';

// apply now modal for trigger the plcc application flow in modal.
export const APPLY_NOW_MODAL_REDUCER_KEY = 'ApplyNowModal';
export const APPLY_NOW_MODAL_REDUCER_PATTERN = '@@ApplyNowModal-';

export const REDUCER_ACTION_MAPPING = {
  [APPLY_PLCC_REDUCER_KEY]: APPLY_PLCC_ACTION_PATTERN,
  [APICONFIG_REDUCER_KEY]: APICONFIG_ACTION_PATTERN,
  [SESSIONCONFIG_REDUCER_KEY]: SESSIONCONFIG_ACTION_PATTERN,
  [LOGINPAGE_REDUCER_KEY]: LOGINPAGE_ACTION_PATTERN,
  [FORGOTPASSWORD_REDUCER_KEY]: FORGOTPASSWORD_ACTION_PATTERN,
  [PRODUCTLISTINGPAGE_REDUCER_KEY]: PRODUCTLISTINGPAGE_ACTION_PATTERN,
  [ADDRESSBOOK_REDUCER_KEY]: ADDRESSBOOK_ACTION_PATTERN,
  [PAYMENT_REDUCER_KEY]: PAYMENT_ACTION_PATTERN,
  [ADD_GIFT_CARD_REDUCER_KEY]: ADD_GIFT_CARD_ACTION_PATTERN,
  [CREATE_ACCOUNT_REDUCER_KEY]: CREATE_ACCOUNT_ACTION_PATTERN,
  [LOGOUT_REDUCER_KEY]: LOGOUT_ACTION_PATTERN,
  [POINTS_HISTORY_REDUCER_KEY]: POINTS_HISTORY_ACTION_PATTERN,
  [RESET_PASSWORD_REDUCER_KEY]: RESET_PASSWORD_ACTION_PATTERN,
  [COUNTRY_SELECTOR_REDUCER_KEY]: COUNTRY_SELECTOR_ACTION_PATTERN,
  [TRACK_ORDER_REDUCER_KEY]: TRACK_ORDER_ACTION_PATTERN,
  [CHANGE_PASSWORD_REDUCER_KEY]: CHANGE_PASSWORD_ACTION_PATTERN,
  [UPDATE_PROFILE_REDUCER_KEY]: UPDATE_PROFILE_ACTION_PATTERN,
  [PRODUCT_DETAIL_REDUCER_KEY]: PRODUCT_DETAIL_ACTION_PATTERN,
  [GET_CANDID_REDUCER_KEY]: GET_CANDID_ACTION_PATTERN,
  [MY_PROFILE_REDUCER_KEY]: MY_PROFILE_ACTION_PATTERN,
  [PRODUCT_TAB_LIST_REDUCER_KEY]: PRODUCT_TAB_LIST_ACTION_PATTERN,
  [NAVIGATION_REDUCER_KEY]: NAVIGATION_ACTION_PATTERN,
  [APPLY_NOW_MODAL_REDUCER_KEY]: APPLY_NOW_MODAL_REDUCER_PATTERN,
  [RECOMMENDATIONS_REDUCER_KEY]: RECOMMENDATIONS_ACTION_PATTERN,
};

export const ADDRESS_VERIFICATION_REDUCER_KEY = 'addressVerification';
