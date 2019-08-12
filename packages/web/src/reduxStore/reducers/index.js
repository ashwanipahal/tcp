import { combineReducers } from 'redux';
import { reducer as reduxFormReducer } from 'redux-form';
import { ProductListingPageReducer } from '@tcp/core/src/components/features/browse/ProductListingPage/container/ProductListingPage.reducer';
import LoginPageReducer from '@tcp/core/src/components/features/account/LoginPage/container/LoginPage.reducer';
import ForgotPasswordReducer from '@tcp/core/src/components/features/account/ForgotPassword/container/ForgotPassword.reducer';
import AddressBookReducer from '@tcp/core/src/components/features/account/AddressBook/container/AddressBook.reducer';
import PaymentReducer from '@tcp/core/src/components/features/account/Payment/container/Payment.reducer';
import LabelReducer from '@tcp/core/src/reduxStore/reducers/labels';
import LayoutReducer from '@tcp/core/src/reduxStore/reducers/layout';
import ApiConfigReducer from '@tcp/core/src/reduxStore/reducers/apiConfig';
import AddEditAddressReducer from '@tcp/core/src/components/features/account/AddEditAddress/container/AddEditAddress.reducer';
import AddEditCreditCardReducer from '@tcp/core/src/components/features/account/AddEditCreditCard/container/AddEditCreditCard.reducer';
import ModulesReducer from '@tcp/core/src/reduxStore/reducers/modules';
import AddGiftCardReducer from '@tcp/core/src/components/features/account/Payment/AddGiftCard/container/AddGiftCard.reducer';
import { createFilteredReducer } from '@tcp/core/src/utils/redux.util';
import AddressVerificationReducer from '@tcp/core/src/components/features/account/AddressVerification/container/AddressVerification.reducer';
import AccountReducer from '@tcp/core/src/components/features/account/Account/container/Account.reducer';
import CartItemTile from '@tcp/core/src/components/features/CnC/CartItemTile/container/CartItemTile.reducer';
import CartPage from '@tcp/core/src/components/features/CnC/BagPage/container/BagPage.reducer';
import OverlayModalReducer from '@tcp/core/src/components/features/OverlayModal/container/OverlayModal.reducer';
import CreateAccountReducer from '@tcp/core/src/components/features/account/CreateAccount/container/CreateAccount.reducer';
import CouponsReducer from '@tcp/core/src/components/features/CnC/common/organism/CouponAndPromos/container/Coupon.reducer';
import AccountHeaderReducer from '@tcp/core/src/components/features/account/common/organism/AccountHeader/container/AccountHeader.reducer';

import {
  APICONFIG_REDUCER_KEY,
  COUNTRY_SELECTOR_REDUCER_KEY,
  HEADER_REDUCER_KEY,
  FOOTER_REDUCER_KEY,
  LABEL_REDUCER_KEY,
  LAYOUT_REDUCER_KEY,
  HOMEPAGE_REDUCER_KEY,
  LOGINPAGE_REDUCER_KEY,
  PRODUCTLISTINGPAGE_REDUCER_KEY,
  ADDRESSBOOK_REDUCER_KEY,
  ADDRESS_VERIFICATION_REDUCER_KEY,
  PAYMENT_REDUCER_KEY,
  ADDEDITADDRESS_REDUCER_KEY,
  EMAIL_SIGNUP_REDUCER_KEY,
  SMS_SIGNUP_REDUCER_KEY,
  MODULES_REDUCER_KEY,
  ADDEDITCREDITCARD_REDUCER_KEY,
  ADD_GIFT_CARD_REDUCER_KEY,
  ADDED_TO_BAG_REDUCER_KEY,
  ACCOUNT_REDUCER_KEY,
  CARTITEMTILE_REDUCER_KEY,
  CARTPAGE_REDUCER_KEY,
  FORGOTPASSWORD_REDUCER_KEY,
  OVERLAY_MODAL_REDUCER_KEY,
  NAVIGATION_REDUCER_KEY,
  CREATE_ACCOUNT_REDUCER_KEY,
  COUPON_REDUCER_KEY,
  ACCOUNTHEADER_REDUCER_KEY,
} from '@tcp/core/src/constants/reducer.constants';
import HeaderReducer from '@tcp/core/src/components/common/organisms/Header/container/Header.reducer';
import FooterReducer from '@tcp/core/src/components/common/organisms/Footer/container/Footer.reducer';
import NavigationReducer from '@tcp/core/src/components/features/content/Navigation/container/Navigation.reducer';
import AddedToBagReducer from '@tcp/core/src/components/features/CnC/AddedToBag/container/AddedToBag.reducer';
import HomePageReducer from '../../components/features/content/HomePage/container/HomePage.reducer';
import EmailSignupReducer from '../../components/common/molecules/EmailSignupModal/container/EmailSignupModal.reducer';
import CountrySelectorReducer from '../../components/features/content/Header/molecules/CountrySelector/container/CountrySelector.reducer';
import SmsSignupReducer from '../../components/common/molecules/SmsSignupModal/container/SmsSignupModal.reducer';

// A higher order reducer to filter out actions not matching a certain action name pattern.
const filteredProductListingPageReducer = createFilteredReducer(
  ProductListingPageReducer,
  PRODUCTLISTINGPAGE_REDUCER_KEY
);

const filteredAppConfigReducer = createFilteredReducer(ApiConfigReducer, APICONFIG_REDUCER_KEY);

export default combineReducers({
  [APICONFIG_REDUCER_KEY]: filteredAppConfigReducer,
  [HEADER_REDUCER_KEY]: HeaderReducer,
  [FOOTER_REDUCER_KEY]: FooterReducer,
  [LABEL_REDUCER_KEY]: LabelReducer,
  [LAYOUT_REDUCER_KEY]: LayoutReducer,
  [MODULES_REDUCER_KEY]: ModulesReducer,
  [HOMEPAGE_REDUCER_KEY]: HomePageReducer,
  [PRODUCTLISTINGPAGE_REDUCER_KEY]: filteredProductListingPageReducer,
  [LOGINPAGE_REDUCER_KEY]: LoginPageReducer,
  [FORGOTPASSWORD_REDUCER_KEY]: ForgotPasswordReducer,
  [ADDRESSBOOK_REDUCER_KEY]: AddressBookReducer,
  [ADDRESS_VERIFICATION_REDUCER_KEY]: AddressVerificationReducer,
  [PAYMENT_REDUCER_KEY]: PaymentReducer,
  [ADDEDITADDRESS_REDUCER_KEY]: AddEditAddressReducer,
  form: reduxFormReducer,
  [EMAIL_SIGNUP_REDUCER_KEY]: EmailSignupReducer,
  [COUNTRY_SELECTOR_REDUCER_KEY]: CountrySelectorReducer,
  [SMS_SIGNUP_REDUCER_KEY]: SmsSignupReducer,
  [ADDEDITCREDITCARD_REDUCER_KEY]: AddEditCreditCardReducer,
  [ADD_GIFT_CARD_REDUCER_KEY]: AddGiftCardReducer,
  [ADDED_TO_BAG_REDUCER_KEY]: AddedToBagReducer,
  [ACCOUNT_REDUCER_KEY]: AccountReducer,
  [CARTITEMTILE_REDUCER_KEY]: CartItemTile,
  [CARTPAGE_REDUCER_KEY]: CartPage,
  [OVERLAY_MODAL_REDUCER_KEY]: OverlayModalReducer,
  [NAVIGATION_REDUCER_KEY]: NavigationReducer,
  [CREATE_ACCOUNT_REDUCER_KEY]: CreateAccountReducer,
  [COUPON_REDUCER_KEY]: CouponsReducer,
  [ACCOUNTHEADER_REDUCER_KEY]: AccountHeaderReducer,
});
