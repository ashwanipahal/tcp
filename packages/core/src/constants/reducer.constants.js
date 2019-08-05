export const HEADER_REDUCER_KEY = 'Header';
export const FOOTER_REDUCER_KEY = 'Footer';
export const LABEL_REDUCER_KEY = 'Labels';
export const LAYOUT_REDUCER_KEY = 'Layouts';
export const MODULES_REDUCER_KEY = 'Modules';
export const HOMEPAGE_REDUCER_KEY = 'HomePage';
export const NAVIGATION_REDUCER_KEY = 'Navigation';
export const FORM_REDUCER_KEY = 'form';

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
export const CARTPAGE_REDUCER_KEY = 'CartPageReducer';
export const OVERLAY_MODAL_REDUCER_KEY = 'OverlayModalReducer';
export const OVERLAY_MODAL_ACTION_PATTERN = '@@Overlay-';

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
// Add/Update Credit Card reducer
export const ADDEDITCREDITCARD_REDUCER_KEY = 'AddEditCreditCardReducer';

// ProductListing Page Reducer
export const PRODUCTLISTINGPAGE_REDUCER_KEY = 'ProductListingPage';
export const PRODUCTLISTINGPAGE_ACTION_PATTERN = '@@PLP-';

// Email signup reducer
export const EMAIL_SIGNUP_REDUCER_KEY = 'EmailSignUp';
export const SMS_SIGNUP_REDUCER_KEY = 'SmsSignUp';

// logout reducer
export const LOGOUT_REDUCER_KEY = 'logoutReducer';
export const LOGOUT_ACTION_PATTERN = '@@logout-';

// Coupon reducer
export const COUPON_REDUCER_KEY = 'CouponsAndPromos';
export const COUPON_ACTION_PATTERN = '@@CouponsAndPromos-';

export const REDUCER_ACTION_MAPPING = {
  [APICONFIG_REDUCER_KEY]: APICONFIG_ACTION_PATTERN,
  [LOGINPAGE_REDUCER_KEY]: LOGINPAGE_ACTION_PATTERN,
  [FORGOTPASSWORD_REDUCER_KEY]: FORGOTPASSWORD_ACTION_PATTERN,
  [PRODUCTLISTINGPAGE_REDUCER_KEY]: PRODUCTLISTINGPAGE_ACTION_PATTERN,
  [ADDRESSBOOK_REDUCER_KEY]: ADDRESSBOOK_ACTION_PATTERN,
  [PAYMENT_REDUCER_KEY]: PAYMENT_ACTION_PATTERN,
  [ADD_GIFT_CARD_REDUCER_KEY]: ADD_GIFT_CARD_ACTION_PATTERN,
  [CREATE_ACCOUNT_REDUCER_KEY]: CREATE_ACCOUNT_ACTION_PATTERN,
  [LOGOUT_REDUCER_KEY]: LOGOUT_ACTION_PATTERN,
};

export const ADDRESS_VERIFICATION_REDUCER_KEY = 'addressVerification';
