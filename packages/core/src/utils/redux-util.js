import { filterActions } from 'redux-ignore';

export const HeaderReducer = 'HeaderReducer';
export const FooterReducer = 'FooterReducer';
export const ModuleDReducer = 'ModuleDReducer';
export const GlobalReducers = 'GlobalReducers';
export const HomePageReducer = 'HomePageReducer';

// Login Page Reducer
export const LoginPageReducer = 'LoginPageReducer';
export const LoginPageActionPattern = '@@Login-';

// ProductListing Page Reducer
export const ProductListingPageReducer = 'ProductListingPageReducer';
export const ProductListingPageActionPattern = '@@PLP-';

const REDUCER_CONFIG = [
  {
    reducerKey: LoginPageReducer,
    actionPattern: LoginPageActionPattern,
  },
  {
    reducerKey: ProductListingPageReducer,
    actionPattern: ProductListingPageActionPattern,
  },
];

export const getReducerKeyByAction = actionName => {
  const reducer = REDUCER_CONFIG.find(({ actionPattern }) => !!actionName.match(actionPattern));
  return (reducer && reducer.reducerKey) || '';
};

export const getActionPatternByReducerKey = reducerName => {
  return REDUCER_CONFIG.find(({ reducerKey }) => reducerKey === reducerName).actionPattern;
};

export const createFilteredReducer = (reducer, reducerKey) => {
  const pattern = getActionPatternByReducerKey(reducerKey);
  const filterReducerByAction = action => action.type.match(pattern);
  return filterActions(reducer, filterReducerByAction);
};
