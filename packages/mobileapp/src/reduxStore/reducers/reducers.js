import { combineReducers } from 'redux';
import { reducer as reduxFormReducer } from 'redux-form';
import { createFilteredReducer } from '@tcp/core/src/utils/redux.util';
import LoginPageReducer from '@tcp/core/src/components/features/account/LoginPage/container/LoginPage.reducer';
import ForgotPasswordReducer from '@tcp/core/src/components/features/account/ForgotPassword/container/ForgotPassword.reducer';
import PaymentReducer from '@tcp/core/src/components/features/account/Payment/container/Payment.reducer';
import { ProductListingPageReducer } from '@tcp/core/src/components/features/browse/ProductListingPage/container/ProductListingPage.reducer';
import ProductListingReducer from '@tcp/core/src/components/features/browse/ProductListing/container/ProductListing.reducer';
import AddEditAddressReducer from '@tcp/core/src/components/common/organisms/AddEditAddress/container/AddEditAddress.reducer';
import LabelReducer from '@tcp/core/src/reduxStore/reducers/labels';
import LayoutReducer from '@tcp/core/src/reduxStore/reducers/layout';
import AddressVerificationReducer from '@tcp/core/src/components/common/organisms/AddressVerification/container/AddressVerification.reducer';
import AddedToBagReducer from '@tcp/core/src/components/features/CnC/AddedToBag/container/AddedToBag.reducer';
import CartItemTile from '@tcp/core/src/components/features/CnC/CartItemTile/container/CartItemTile.reducer';
import CartPage from '@tcp/core/src/components/features/CnC/BagPage/container/BagPage.reducer';
import PointsHistoryReducer from '@tcp/core/src/components/features/account/common/organism/PointsHistory/container/PointsHistory.reducer';
import CreateAccountReducer from '@tcp/core/src/components/features/account/CreateAccount/container/CreateAccount.reducer';
import CouponReducer from '@tcp/core/src/components/features/CnC/common/organism/CouponAndPromos/container/Coupon.reducer';
import AirmilesBannerReducer from '@tcp/core/src/components/features/CnC/common/organism/AirmilesBanner/container/AirmilesBanner.reducer';
import TrackOrderReducer from '@tcp/core/src/components/features/account/TrackOrder/container/TrackOrder.reducer';
import AddEditCreditCardReducer from '@tcp/core/src/components/features/account/AddEditCreditCard/container/AddEditCreditCard.reducer';
import BonusPointsDaysReducer from '@tcp/core/src/components/common/organisms/BonusPointsDays/container/BonusPointsDays.reducer';
import CheckoutReducer from '@tcp/core/src/components/features/CnC/Checkout/container/Checkout.reducer';
import ApiConfigReducer from '@tcp/core/src/reduxStore/reducers/apiConfig';
import ChangePasswordReducer from '@tcp/core/src/components/features/account/ChangePassword/container/ChangePassword.reducer';
import SessionConfigReducer from '@tcp/core/src/reduxStore/reducers/sessionConfig';
import GetCandidReducer from '@tcp/core/src/components/common/molecules/GetCandid/container/GetCandid.reducer';

import {
  SESSIONCONFIG_REDUCER_KEY,
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
  PRODUCT_LISTING_REDUCER_KEY,
  APICONFIG_REDUCER_KEY,
  ADDEDITCREDITCARD_REDUCER_KEY,
  USER_REDUCER_KEY,
  CHECKOUT_REDUCER_KEY,
  CHANGE_PASSWORD_REDUCER_KEY,
  ADDEDITADDRESS_REDUCER_KEY,
  ADDRESS_VERIFICATION_REDUCER_KEY,
  TRACK_ORDER_REDUCER_KEY,
  GET_CANDID_REDUCER_KEY,
  TOAST_REDUCER_KEY,
  PRODUCT_LIST_TABS_REDUCER_KEY,
} from '@tcp/core/src/constants/reducer.constants';
import HeaderReducer from '@tcp/core/src/components/common/organisms/Header/container/Header.reducer';
import ModulesReducer from '@tcp/core/src/reduxStore/reducers/modules';
import AddGiftCardReducer from '@tcp/core/src/components/features/account/Payment/AddGiftCard/container/AddGiftCard.reducer';
import AddressBookReducer from '@tcp/core/src/components/features/account/AddressBook/container/AddressBook.reducer';
import NavigationReducer from '@tcp/core/src/components/features/content/Navigation/container/Navigation.reducer';
import UserReducer from '@tcp/core/src/components/features/account/User/container/User.reducer';
import ToastMessageReducer from '@tcp/core/src/components/common/atoms/Toast/container/Toast.reducer.native';
import ProductListTabsReducer from '@tcp/core/src/components/common/organisms/ProductListTabs/container/ProductListTabs.reducer';

import ThemeWrapperReducer from '../../components/common/hoc/ThemeWrapper.reducer';
import { THEME_WRAPPER_REDUCER_KEY } from '../../components/common/hoc/ThemeWrapper.constants';

const filteredProductListingPageReducer = createFilteredReducer(
  ProductListingPageReducer,
  PRODUCTLISTINGPAGE_REDUCER_KEY
);

const filteredProductListingReducer = createFilteredReducer(
  ProductListingReducer,
  PRODUCT_LISTING_REDUCER_KEY
);

const filteredAppConfigReducer = createFilteredReducer(ApiConfigReducer, APICONFIG_REDUCER_KEY);

const filteredGetCandidReducer = createFilteredReducer(GetCandidReducer, GET_CANDID_REDUCER_KEY);

const rootReducer = combineReducers({
  [APICONFIG_REDUCER_KEY]: filteredAppConfigReducer,
  [TOAST_REDUCER_KEY]: ToastMessageReducer,
  [SESSIONCONFIG_REDUCER_KEY]: SessionConfigReducer,
  [THEME_WRAPPER_REDUCER_KEY]: ThemeWrapperReducer,
  [HEADER_REDUCER_KEY]: HeaderReducer,
  [LABEL_REDUCER_KEY]: LabelReducer,
  [LAYOUT_REDUCER_KEY]: LayoutReducer,
  [PRODUCTLISTINGPAGE_REDUCER_KEY]: filteredProductListingPageReducer,
  [PRODUCT_LISTING_REDUCER_KEY]: filteredProductListingReducer,
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
  [CHANGE_PASSWORD_REDUCER_KEY]: ChangePasswordReducer,
  [ADDEDITADDRESS_REDUCER_KEY]: AddEditAddressReducer,
  [ADDRESS_VERIFICATION_REDUCER_KEY]: AddressVerificationReducer,
  [TRACK_ORDER_REDUCER_KEY]: TrackOrderReducer,
  [PRODUCT_LIST_TABS_REDUCER_KEY]: ProductListTabsReducer,
  [GET_CANDID_REDUCER_KEY]: filteredGetCandidReducer,
});

export default rootReducer;
