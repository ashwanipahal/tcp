export const HEADER_REDUCER_KEY = 'HeaderReducer';
export const FOOTER_REDUCER_KEY = 'FooterReducer';
export const LABEL_REDUCER_KEY = 'labels';
export const LAYOUT_REDUCER_KEY = 'layouts';
export const HOMEPAGE_REDUCER_KEY = 'HomePageReducer';

// Don't Add "Reducer" in the Key - it should be LoginPage, not LoginPageReducer

// Login Page Reducer
export const LOGINPAGE_REDUCER_KEY = 'LoginPageReducer';
export const ADDRESSBOOK_REDUCER_KEY = 'AddressBookReducer';
export const PAYMENT_REDUCER_KEY = 'PaymentReducer';
export const LOGINPAGE_ACTION_PATTERN = '@@Login-';

// Add address page reducer
export const ADDADDRESS_REDUCER_KEY = 'AddAddressReducer';
export const ADDADDRESS_ACTION_PATTERN = '@@Address-';

// ProductListing Page Reducer
export const PRODUCTLISTINGPAGE_REDUCER_KEY = 'ProductListingPage';
export const PRODUCTLISTINGPAGE_ACTION_PATTERN = '@@PLP-';

// Account Reducer
export const ACCOUNT_MODAL_REDUCER_KEY = 'AccountModalReducer';

export const REDUCER_ACTION_MAPPING = {
  [LOGINPAGE_REDUCER_KEY]: LOGINPAGE_ACTION_PATTERN,
  [PRODUCTLISTINGPAGE_REDUCER_KEY]: PRODUCTLISTINGPAGE_ACTION_PATTERN,
};
