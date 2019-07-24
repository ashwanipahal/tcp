export const HEADER_REDUCER_KEY = 'Header';
export const FOOTER_REDUCER_KEY = 'Footer';
export const LABEL_REDUCER_KEY = 'Labels';
export const LAYOUT_REDUCER_KEY = 'Layouts';
export const MODULES_REDUCER_KEY = 'Modules';
export const HOMEPAGE_REDUCER_KEY = 'HomePage';

// Don't Add "Reducer" in the Key - it should be LoginPage, not LoginPageReducer

// Login Page Reducer
export const LOGINPAGE_REDUCER_KEY = 'LoginPageReducer';
export const ADDRESSBOOK_REDUCER_KEY = 'AddressBookReducer';
export const ADDRESSBOOK_ACTION_PATTERN = '@@AddressBook-';
export const PAYMENT_REDUCER_KEY = 'PaymentReducer';
export const ADDED_TO_BAG_REDUCER_KEY = 'AddedToBagReducer';
export const ADD_GIFT_CARD_REDUCER_KEY = 'AddGiftCardReducer';
export const PAYMENT_ACTION_PATTERN = '@@payment-';
export const ADD_GIFT_CARD_ACTION_PATTERN = '@@AddGiftCard-';
export const LOGINPAGE_ACTION_PATTERN = '@@Login-';

// Create Account Reducer
export const CREATE_ACCOUNT_REDUCER_KEY = 'CreateAccountReducer';
export const CREATE_ACCOUNT_ACTION_PATTERN = '@@CreateAccount-';

// Add address page reducer
export const ADDEDITADDRESS_REDUCER_KEY = 'AddEditAddressReducer';
export const ADDEDITADDRESS_ACTION_PATTERN = '@@Address-';

// ProductListing Page Reducer
export const PRODUCTLISTINGPAGE_REDUCER_KEY = 'ProductListingPage';
export const PRODUCTLISTINGPAGE_ACTION_PATTERN = '@@PLP-';

// Email signup reducer
export const EMAIL_SIGNUP_REDUCER_KEY = 'EmailSignUp';
export const SMS_SIGNUP_REDUCER_KEY = 'SmsSignUp';

export const REDUCER_ACTION_MAPPING = {
  [LOGINPAGE_REDUCER_KEY]: LOGINPAGE_ACTION_PATTERN,
  [PRODUCTLISTINGPAGE_REDUCER_KEY]: PRODUCTLISTINGPAGE_ACTION_PATTERN,
  [ADDRESSBOOK_REDUCER_KEY]: ADDRESSBOOK_ACTION_PATTERN,
  [PAYMENT_REDUCER_KEY]: PAYMENT_ACTION_PATTERN,
  [ADD_GIFT_CARD_REDUCER_KEY]: ADD_GIFT_CARD_ACTION_PATTERN,
  [CREATE_ACCOUNT_REDUCER_KEY]: CREATE_ACCOUNT_ACTION_PATTERN,
};

export const ADDRESS_VERIFICATION_REDUCER_KEY = 'addressVerification';
