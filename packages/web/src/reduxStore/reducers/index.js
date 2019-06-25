import { combineReducers } from 'redux';
import { ProductListingPageReducer } from '@tcp/core/src/components/features/browse/ProductListingPage/container/ProductListingPage.reducer';
import LoginPageReducer from '@tcp/core/src/components/features/account/LoginPage/container/LoginPage.reducer';
import * as ReducerUtil from '@tcp/core/src/utils/redux-util';
import HeaderReducer from '../../components/common/organisms/Header/container/Header.reducer';
import FooterReducer from '../../components/common/organisms/Footer/container/Footer.reducer';
import ModuleDReducer from '../../components/common/organisms/ModuleD/container/ModuleD.reducer';
import GlobalReducers from './global';
import HomePageReducer from '../../components/features/content/HomePage/container/HomePage.reducer';

const filteredProductListingPageReducer = ReducerUtil.createFilteredReducer(
  ProductListingPageReducer,
  ReducerUtil.ProductListingPageReducer
);

export default combineReducers({
  [ReducerUtil.HeaderReducer]: HeaderReducer,
  [ReducerUtil.FooterReducer]: FooterReducer,
  [ReducerUtil.ModuleDReducer]: ModuleDReducer,
  [ReducerUtil.GlobalReducers]: GlobalReducers,
  [ReducerUtil.HomePageReducer]: HomePageReducer,
  [ReducerUtil.ProductListingPageReducer]: filteredProductListingPageReducer,
  [ReducerUtil.LoginPageReducer]: LoginPageReducer,
});
