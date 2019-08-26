import { combineReducers } from 'redux';
import { reducer as reduxFormReducer } from 'redux-form';
import { createFilteredReducer } from '@tcp/core/src/utils/redux.util';
import LoginPageReducer from '@tcp/core/src/components/features/account/LoginPage/container/LoginPage.reducer';
import ForgotPasswordReducer from '@tcp/core/src/components/features/account/ForgotPassword/container/ForgotPassword.reducer';
import PaymentReducer from '@tcp/core/src/components/features/account/Payment/container/Payment.reducer';
import { ProductListingPageReducer } from '@tcp/core/src/components/features/browse/ProductListingPage/container/ProductListingPage.reducer';
import LabelReducer from '@tcp/core/src/reduxStore/reducers/labels';
import LayoutReducer from '@tcp/core/src/reduxStore/reducers/layout';
import AddedToBagReducer from '@tcp/core/src/components/features/CnC/AddedToBag/container/AddedToBag.reducer';
import CartItemTile from '@tcp/core/src/components/features/CnC/CartItemTile/container/CartItemTile.reducer';
import CartPage from '@tcp/core/src/components/features/CnC/BagPage/container/BagPage.reducer';
import PointsHistoryReducer from '@tcp/core/src/components/features/account/common/organism/PointsHistory/container/PointsHistory.reducer';
import CreateAccountReducer from '@tcp/core/src/components/features/account/CreateAccount/container/CreateAccount.reducer';
import CouponReducer from '@tcp/core/src/components/features/CnC/common/organism/CouponAndPromos/container/Coupon.reducer';
import AirmilesBannerReducer from '@tcp/core/src/components/features/CnC/common/organism/AirmilesBanner/container/AirmilesBanner.reducer';

import AddEditCreditCardReducer from '@tcp/core/src/components/features/account/AddEditCreditCard/container/AddEditCreditCard.reducer';
import BonusPointsDaysReducer from '@tcp/core/src/components/common/organisms/BonusPointsDays/container/BonusPointsDays.reducer';
import CheckoutReducer from '@tcp/core/src/components/features/CnC/Checkout/container/Checkout.reducer';
import ApiConfigReducer from '@tcp/core/src/reduxStore/reducers/apiConfig';
import DeviceInfoReducer from '@tcp/core/src/reduxStore/reducers/deviceInfo';

import {
  HEADER_REDUCER_KEY,
  LABEL_REDUCER_KEY,
  LAYOUT_REDUCER_KEY,
  LOGINPAGE_REDUCER_KEY,
  PRODUCTLISTINGPAGE_REDUCER_KEY,
  PAYMENT_REDUCER_KEY,
  MODULES_REDUCER_KEY,
  CARTPAGE_REDUCER_KEY,
  CARTITEMTILE_REDUCER_KEY,
  ADD_GIFT_CARD_REDUCER_KEY,
  FORGOTPASSWORD_REDUCER_KEY,
  ADDRESSBOOK_REDUCER_KEY,
  ADDED_TO_BAG_REDUCER_KEY,
  NAVIGATION_REDUCER_KEY,
  FORM_REDUCER_KEY,
  CREATE_ACCOUNT_REDUCER_KEY,
  COUPON_REDUCER_KEY,
  AIRMILES_BANNER_REDUCER_KEY,
  BONUS_POINTS_DAYS_REDUCER_KEY,
  POINTS_HISTORY_REDUCER_KEY,
  APICONFIG_REDUCER_KEY,
  ADDEDITCREDITCARD_REDUCER_KEY,
  USER_REDUCER_KEY,
  CHECKOUT_REDUCER_KEY,
  DEVICE_INFO_REDUCER_KEY,
} from '@tcp/core/src/constants/reducer.constants';
import HeaderReducer from '@tcp/core/src/components/common/organisms/Header/container/Header.reducer';
import ModulesReducer from '@tcp/core/src/reduxStore/reducers/modules';
import AddGiftCardReducer from '@tcp/core/src/components/features/account/Payment/AddGiftCard/container/AddGiftCard.reducer';
import AddressBookReducer from '@tcp/core/src/components/features/account/AddressBook/container/AddressBook.reducer';
import NavigationReducer from '@tcp/core/src/components/features/content/Navigation/container/Navigation.reducer';
import UserReducer from '@tcp/core/src/components/features/account/User/container/User.reducer';
import ThemeWrapperReducer from '../../components/common/hoc/ThemeWrapper.reducer';
import { THEME_WRAPPER_REDUCER_KEY } from '../../components/common/hoc/ThemeWrapper.constants';

const filteredProductListingPageReducer = createFilteredReducer(
  ProductListingPageReducer,
  PRODUCTLISTINGPAGE_REDUCER_KEY
);

const filteredAppConfigReducer = createFilteredReducer(ApiConfigReducer, APICONFIG_REDUCER_KEY);

const rootReducer = combineReducers({
  [APICONFIG_REDUCER_KEY]: filteredAppConfigReducer,
  [THEME_WRAPPER_REDUCER_KEY]: ThemeWrapperReducer,
  [HEADER_REDUCER_KEY]: HeaderReducer,
  [LABEL_REDUCER_KEY]: LabelReducer,
  [LAYOUT_REDUCER_KEY]: LayoutReducer,
  [PRODUCTLISTINGPAGE_REDUCER_KEY]: filteredProductListingPageReducer,
  [LOGINPAGE_REDUCER_KEY]: LoginPageReducer,
  [FORGOTPASSWORD_REDUCER_KEY]: ForgotPasswordReducer,
  [PAYMENT_REDUCER_KEY]: PaymentReducer,
  [MODULES_REDUCER_KEY]: ModulesReducer,
  [ADD_GIFT_CARD_REDUCER_KEY]: AddGiftCardReducer,
  [ADDRESSBOOK_REDUCER_KEY]: AddressBookReducer,
  [ADDED_TO_BAG_REDUCER_KEY]: AddedToBagReducer,
  [FORM_REDUCER_KEY]: reduxFormReducer,
  [CARTITEMTILE_REDUCER_KEY]: CartItemTile,
  [CARTPAGE_REDUCER_KEY]: CartPage,
  [CHECKOUT_REDUCER_KEY]: CheckoutReducer,
  [NAVIGATION_REDUCER_KEY]: NavigationReducer,
  [CREATE_ACCOUNT_REDUCER_KEY]: CreateAccountReducer,
  [COUPON_REDUCER_KEY]: CouponReducer,
  [AIRMILES_BANNER_REDUCER_KEY]: AirmilesBannerReducer,

  [BONUS_POINTS_DAYS_REDUCER_KEY]: BonusPointsDaysReducer,
  [POINTS_HISTORY_REDUCER_KEY]: PointsHistoryReducer,
  [ADDEDITCREDITCARD_REDUCER_KEY]: AddEditCreditCardReducer,
  [USER_REDUCER_KEY]: UserReducer,
  [DEVICE_INFO_REDUCER_KEY]: DeviceInfoReducer,
});

export default rootReducer;
