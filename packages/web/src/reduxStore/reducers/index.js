import { combineReducers } from 'redux';
import { reducer as reduxFormReducer } from 'redux-form';
import { ProductListingPageReducer } from '@tcp/core/src/components/features/browse/ProductListingPage/container/ProductListingPage.reducer';
import LoginPageReducer from '@tcp/core/src/components/features/account/LoginPage/container/LoginPage.reducer';
import AddressBookReducer from '@tcp/core/src/components/features/account/AddressBook/container/AddressBook.reducer';
import AddAddressReducer from '@tcp/core/src/components/features/account/AddressBook/container/AddAddress/AddAddress.reducer';
import { createFilteredReducer } from '@tcp/core/src/utils/redux.util';
import {
  HEADER_REDUCER_KEY,
  FOOTER_REDUCER_KEY,
  LABEL_REDUCER_KEY,
  LAYOUT_REDUCER_KEY,
  HOMEPAGE_REDUCER_KEY,
  LOGINPAGE_REDUCER_KEY,
  PRODUCTLISTINGPAGE_REDUCER_KEY,
  ADDRESSBOOK_REDUCER_KEY,
  ADDADDRESS_REDUCER_KEY,
  MODULES_REDUCER_KEY,
} from '@tcp/core/src/constants/reducer.constants';
import HeaderReducer from '../../components/common/organisms/Header/container/Header.reducer';
import FooterReducer from '../../components/common/organisms/Footer/container/Footer.reducer';
import LabelReducer from './labels';
import LayoutReducer from './layout';
import ModulesReducer from './modules';
import HomePageReducer from '../../components/features/content/HomePage/container/HomePage.reducer';

// A higher order reducer to filter out actions not matching a certain action name pattern.
const filteredProductListingPageReducer = createFilteredReducer(
  ProductListingPageReducer,
  PRODUCTLISTINGPAGE_REDUCER_KEY
);

export default combineReducers({
  [HEADER_REDUCER_KEY]: HeaderReducer,
  [FOOTER_REDUCER_KEY]: FooterReducer,
  [LABEL_REDUCER_KEY]: LabelReducer,
  [LAYOUT_REDUCER_KEY]: LayoutReducer,
  [MODULES_REDUCER_KEY]: ModulesReducer,
  [HOMEPAGE_REDUCER_KEY]: HomePageReducer,
  [PRODUCTLISTINGPAGE_REDUCER_KEY]: filteredProductListingPageReducer,
  [LOGINPAGE_REDUCER_KEY]: LoginPageReducer,
  [ADDRESSBOOK_REDUCER_KEY]: AddressBookReducer,
  [ADDADDRESS_REDUCER_KEY]: AddAddressReducer,
  form: reduxFormReducer,
});
