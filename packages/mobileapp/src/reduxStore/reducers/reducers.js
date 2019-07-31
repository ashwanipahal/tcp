import { combineReducers } from 'redux';
import { reducer as reduxFormReducer } from 'redux-form';
import { createFilteredReducer } from '@tcp/core/src/utils/redux.util';
import LoginPageReducer from '@tcp/core/src/components/features/account/LoginPage/container/LoginPage.reducer';
import PaymentReducer from '@tcp/core/src/components/features/account/Payment/container/Payment.reducer';
import { ProductListingPageReducer } from '@tcp/core/src/components/features/browse/ProductListingPage/container/ProductListingPage.reducer';
import LabelReducer from '@tcp/core/src/reduxStore/reducers/labels';
import LayoutReducer from '@tcp/core/src/reduxStore/reducers/layout';
import AddedToBagReducer from '@tcp/core/src/components/features/CnC/AddedToBag/container/AddedToBag.reducer';
import CartPage from '@tcp/core/src/components/features/CnC/CartItemTile/container/CartItemTile.reducer';
import CartReducer from '@tcp/core/src/components/features/CnC/Cart/containers/Cart.reducer';
import {
  HEADER_REDUCER_KEY,
  LABEL_REDUCER_KEY,
  LAYOUT_REDUCER_KEY,
  LOGINPAGE_REDUCER_KEY,
  PRODUCTLISTINGPAGE_REDUCER_KEY,
  PAYMENT_REDUCER_KEY,
  MODULES_REDUCER_KEY,
  CARTPAGE_REDUCER_KEY,
  ADD_GIFT_CARD_REDUCER_KEY,
  ADDED_TO_BAG_REDUCER_KEY,
  CART_REDUCER_KEY,
  NAVIGATION_REDUCER_KEY,
  FORM_REDUCER_KEY,
} from '@tcp/core/src/constants/reducer.constants';
import HeaderReducer from '@tcp/core/src/components/common/organisms/Header/container/Header.reducer';
import ModulesReducer from '@tcp/core/src/reduxStore/reducers/modules';
import AddGiftCardReducer from '@tcp/core/src/components/features/account/Payment/AddGiftCard/container/AddGiftCard.reducer';
import NavigationReducer from '@tcp/core/src/components/features/content/Navigation/container/Navigation.reducer';
import ThemeWrapperReducer from '../../components/common/hoc/ThemeWrapper.reducer';
import { THEME_WRAPPER_REDUCER_KEY } from '../../components/common/hoc/ThemeWrapper.constants';

const filteredProductListingPageReducer = createFilteredReducer(
  ProductListingPageReducer,
  PRODUCTLISTINGPAGE_REDUCER_KEY
);

export default combineReducers({
  [THEME_WRAPPER_REDUCER_KEY]: ThemeWrapperReducer,
  [HEADER_REDUCER_KEY]: HeaderReducer,
  [LABEL_REDUCER_KEY]: LabelReducer,
  [LAYOUT_REDUCER_KEY]: LayoutReducer,
  [PRODUCTLISTINGPAGE_REDUCER_KEY]: filteredProductListingPageReducer,
  [LOGINPAGE_REDUCER_KEY]: LoginPageReducer,
  [PAYMENT_REDUCER_KEY]: PaymentReducer,
  [MODULES_REDUCER_KEY]: ModulesReducer,
  [ADD_GIFT_CARD_REDUCER_KEY]: AddGiftCardReducer,
  [ADDED_TO_BAG_REDUCER_KEY]: AddedToBagReducer,
  [FORM_REDUCER_KEY]: reduxFormReducer,
  [CARTPAGE_REDUCER_KEY]: CartPage,
  [CART_REDUCER_KEY]: CartReducer,
  [NAVIGATION_REDUCER_KEY]: NavigationReducer,
});
