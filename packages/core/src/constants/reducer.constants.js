export const HEADER_REDUCER_KEY = 'HeaderReducer';
export const FOOTER_REDUCER_KEY = 'FooterReducer';
export const MODULED_REDUCER_KEY = 'ModuleDReducer';
export const GLOBAL_REDUCER_KEY = 'GlobalReducers';
export const HOMEPAGE_REDUCER_KEY = 'HomePageReducer';

// Don't Add "Reducer" in the Key - it should be LoginPage, not LoginPageReducer

// Login Page Reducer
export const LOGINPAGE_REDUCER_KEY = 'LoginPageReducer';
export const ADDRESSBOOK_REDUCER_KEY = 'AddressBookReducer';
export const LOGINPAGE_ACTION_PATTERN = '@@Login-';

// ProductListing Page Reducer
export const PRODUCTLISTINGPAGE_REDUCER_KEY = 'ProductListingPage';
export const PRODUCTLISTINGPAGE_ACTION_PATTERN = '@@PLP-';

export const REDUCER_ACTION_MAPPING = {
  [LOGINPAGE_REDUCER_KEY]: LOGINPAGE_ACTION_PATTERN,
  [PRODUCTLISTINGPAGE_REDUCER_KEY]: PRODUCTLISTINGPAGE_ACTION_PATTERN,
};
