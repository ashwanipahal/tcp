import { combineReducers } from 'redux';
import { ProductListingPageReducer } from '@tcp/core/src/components/features/browse/ProductListingPage/container/ProductListingPage.reducer';
import AddressBookReducer from '@tcp/core/src/components/features/myAccount/AddressBook/container/AddressBook.reducer';
import LoginPageReducer from '@tcp/core/src/components/features/myAccount/LoginPage/container/LoginPage.reducer';
import HeaderReducer from '../../components/common/organisms/Header/container/Header.reducer';
import FooterReducer from '../../components/common/organisms/Footer/container/Footer.reducer';
import ModuleDReducer from '../../components/common/organisms/ModuleD/container/ModuleD.reducer';
import GlobalReducers from './global';
import HomePageReducer from '../../components/features/content/HomePage/container/HomePage.reducer';

export default combineReducers({
  HeaderReducer,
  FooterReducer,
  ModuleDReducer,
  GlobalReducers,
  HomePageReducer,
  ProductListingPageReducer,
  AddressBookReducer,
  LoginPageReducer,
});
