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
import SessionConfigReducer from '@tcp/core/src/reduxStore/reducers/sessionConfig';
import AddEditAddressReducer from '@tcp/core/src/components/common/organisms/AddEditAddress/container/AddEditAddress.reducer';
import AddEditCreditCardReducer from '@tcp/core/src/components/features/account/AddEditCreditCard/container/AddEditCreditCard.reducer';
import ModulesReducer from '@tcp/core/src/reduxStore/reducers/modules';
import AddGiftCardReducer from '@tcp/core/src/components/features/account/Payment/AddGiftCard/container/AddGiftCard.reducer';
import { createFilteredReducer } from '@tcp/core/src/utils/redux.util';
import AddressVerificationReducer from '@tcp/core/src/components/common/organisms/AddressVerification/container/AddressVerification.reducer';
import AccountReducer from '@tcp/core/src/components/features/account/Account/container/Account.reducer';
import CartItemTile from '@tcp/core/src/components/features/CnC/CartItemTile/container/CartItemTile.reducer';
import CartPage from '@tcp/core/src/components/features/CnC/BagPage/container/BagPage.reducer';
import CheckoutReducer from '@tcp/core/src/components/features/CnC/Checkout/container/Checkout.reducer';
import OverlayModalReducer from '@tcp/core/src/components/features/OverlayModal/container/OverlayModal.reducer';
import ProductListingReducer from '@tcp/core/src/components/features/browse/ProductListing/container/ProductListing.reducer';
import CreateAccountReducer from '@tcp/core/src/components/features/account/CreateAccount/container/CreateAccount.reducer';
import BonusPointsDaysReducer from '@tcp/core/src/components/common/organisms/BonusPointsDays/container/BonusPointsDays.reducer';
import CouponsReducer from '@tcp/core/src/components/features/CnC/common/organism/CouponAndPromos/container/Coupon.reducer';
import AirmilesBannerReducer from '@tcp/core/src/components/features/CnC/common/organism/AirmilesBanner/container/AirmilesBanner.reducer';
import AccountHeaderReducer from '@tcp/core/src/components/features/account/common/organism/AccountHeader/container/AccountHeader.reducer';
import PointsHistoryReducer from '@tcp/core/src/components/features/account/common/organism/PointsHistory/container/PointsHistory.reducer';
import EarnExtraPointsReducer from '@tcp/core/src/components/features/account/common/organism/EarnExtraPointsTile/container/EarnExtraPointsTile.reducer';
import OrderDetailsDataReducer from '@tcp/core/src/components/features/account/OrderDetails/container/OrderDetails.reducer';
import ResetPasswordReducer from '@tcp/core/src/components/features/account/ResetPassword/container/ResetPassword.reducer';
import TrackOrderReducer from '@tcp/core/src/components/features/account/TrackOrder/container/TrackOrder.reducer';
import ChangePasswordReducer from '@tcp/core/src/components/features/account/ChangePassword/container/ChangePassword.reducer';
import MyProfileReducer from '@tcp/core/src/components/features/account/MyProfile/container/MyProfile.reducer';
import UpdateProfileReducer from '@tcp/core/src/components/features/account/AddEditPersonalInformation/container/AddEditPersonalInformation.reducer';
import DeviceInfoReducer from '@tcp/core/src/reduxStore/reducers/deviceInfo';
import ApplyCardReducer from '@tcp/core/src/components/features/browse/ApplyCardPage/container/ApplyCard.reducer';
import OptimizelyFeaturesReducer from '@tcp/core/src/reduxStore/reducers/optimizelyFeatures';
import AddMailingAddressReducer from '@tcp/core/src/components/features/account/MyProfile/organism/MailingInformation/container/MailingAddress.reducer';
import ProductDetailReducer from '@tcp/core/src/components/features/browse/ProductDetail/container/ProductDetail.reducer';
import QuickViewReducer from '@tcp/core/src/components/common/organisms/QuickViewModal/container/QuickViewModal.reducer';
import ApplyNowModalPLCCReducer from '@tcp/core/src/components/common/molecules/ApplyNowPLCCModal/container/ApplyNowModal.reducer';
import ProductTabListReducer from '@tcp/core/src/components/common/organisms/ProductTabList/container/ProductTabList.reducer';
import StyliticsProductTabListReducer from '@tcp/core/src/components/common/organisms/StyliticsProductTabList/container/StyliticsProductTabList.reducer';
import BirthdaySavingsListReducer from '@tcp/core/src/components/features/account/common/organism/BirthdaySavingsList/container/BirthdaySavingsList.reducer';
import PickupModalReducer from '@tcp/core/src/components/common/organisms/PickupStoreModal/container/PickUpStoreModal.reducer';
import OutfitDetailReducer from '@tcp/core/src/components/features/browse/OutfitDetails/container/OutfitDetails.reducer';
import RecommendationsReducer from '@tcp/core/src/components/common/molecules/Recommendations/container/Recommendations.reducer';
import SearchBarReducer from '@tcp/web/src/components/features/content/Header/molecules/SearchBar/SearchBar.reducer';
import StoreLocatorReducer from '@tcp/core/src/components/features/storeLocator/StoreLanding/container/StoreLanding.reducer';
import SocialReducer from '@tcp/core/src/components/common/organisms/SocialAccount/container/Social.reducer';
import SearchPageReducer from '@tcp/core/src/components/features/browse/SearchDetail/container/SearchDetail.reducer';
import MyFavoriteStoreReducer from '@tcp/core/src/components/features/account/MyProfile/organism/MyFavoriteStore/container/MyFavoriteStore.reducer';
import StoreDetailReducer from '@tcp/core/src/components/features/storeLocator/StoreDetail/container/StoreDetail.reducer';
import PointsClaimReducer from '@tcp/core/src/components/features/account/PointsClaim/container/PointsClaim.reducer';
import orderConfirmationReducer from '@tcp/core/src/components/features/CnC/Confirmation/container/Confirmation.reducer';
import OrdersReducer from '@tcp/core/src/components/features/account/Orders/container/Orders.reducer';

import {
  APICONFIG_REDUCER_KEY,
  APPLY_PLCC_REDUCER_KEY,
  SESSIONCONFIG_REDUCER_KEY,
  COUNTRY_SELECTOR_REDUCER_KEY,
  HEADER_REDUCER_KEY,
  FOOTER_REDUCER_KEY,
  LABEL_REDUCER_KEY,
  LAYOUT_REDUCER_KEY,
  LOADER_REDUCER_KEY,
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
  PRODUCT_LISTING_REDUCER_KEY,
  CREATE_ACCOUNT_REDUCER_KEY,
  BONUS_POINTS_DAYS_REDUCER_KEY,
  COUPON_REDUCER_KEY,
  AIRMILES_BANNER_REDUCER_KEY,
  MY_FAVORITE_STORE_REDUCER_KEY,
  ACCOUNTHEADER_REDUCER_KEY,
  POINTS_HISTORY_REDUCER_KEY,
  EARNEXTRAPOINTS_REDUCER_KEY,
  ORDERDETAILS_REDUCER_KEY,
  RESET_PASSWORD_REDUCER_KEY,
  CHANGE_PASSWORD_REDUCER_KEY,
  UPDATE_PROFILE_REDUCER_KEY,
  MY_PROFILE_REDUCER_KEY,
  USER_REDUCER_KEY,
  CHECKOUT_REDUCER_KEY,
  DEVICE_INFO_REDUCER_KEY,
  TRACK_ORDER_REDUCER_KEY,
  OPTIMIZELY_FEATURES_REDUCER,
  TOAST_REDUCER_KEY,
  MAILING_ADDRESS_REDUCER_KEY,
  PRODUCT_DETAIL_REDUCER_KEY,
  OUTFIT_DETAILS_REDUCER_KEY,
  APPLY_NOW_MODAL_REDUCER_KEY,
  PRODUCT_TAB_LIST_REDUCER_KEY,
  STYLITICS_PRODUCT_TAB_LIST_REDUCER_KEY,
  BIRTHDAY_SAVING_LIST_REDUCER_KEY,
  PICKUP_MODAL_REDUCER_KEY,
  RECOMMENDATIONS_REDUCER_KEY,
  SEARCH_REDUCER_KEY,
  STORE_LOCATOR_REDUCER_KEY,
  SOCIAL_REDUCER_KEY,
  SLP_PAGE_REDUCER_KEY,
  STORE_DETAIL_REDUCER_KEY,
  QUICK_VIEW_REDUCER_KEY,
  POINTS_CLAIM_REDUCER_KEY,
  CONFIRMATION_REDUCER_KEY,
  ORDERS_REDUCER_KEY,
} from '@tcp/core/src/constants/reducer.constants';
import { TRACK_PAGE_VIEW } from '@tcp/core/src/analytics';
import HeaderReducer from '@tcp/core/src/components/common/organisms/Header/container/Header.reducer';
import FooterReducer from '@tcp/core/src/components/common/organisms/Footer/container/Footer.reducer';
import NavigationReducer from '@tcp/core/src/components/features/content/Navigation/container/Navigation.reducer';
import AddedToBagReducer from '@tcp/core/src/components/features/CnC/AddedToBag/container/AddedToBag.reducer';
import UserReducer from '@tcp/core/src/components/features/account/User/container/User.reducer';
import ToastMessageReducer from '@tcp/core/src/components/common/atoms/Toast/container/Toast.reducer.native';
import LoaderReducer from '../../components/features/content/Loader/container/Loader.reducer';
import EmailSignupReducer from '../../components/common/molecules/EmailSignupModal/container/EmailSignupModal.reducer';
import CountrySelectorReducer from '../../components/features/content/Header/molecules/CountrySelector/container/CountrySelector.reducer';
import SmsSignupReducer from '../../components/common/molecules/SmsSignupModal/container/SmsSignupModal.reducer';

// A higher order reducer to filter out actions not matching a certain action name pattern.
const filteredProductListingPageReducer = createFilteredReducer(
  ProductListingPageReducer,
  PRODUCTLISTINGPAGE_REDUCER_KEY,
  PRODUCT_LISTING_REDUCER_KEY
);

const filteredAppConfigReducer = createFilteredReducer(ApiConfigReducer, APICONFIG_REDUCER_KEY);
// TODO: filteredSessionConfigReducer should be used, but issue with immutable map to be corrected
// const filteredSessionConfigReducer = createFilteredReducer(
//   SessionConfigReducer,
//   SESSIONCONFIG_REDUCER_KEY
// );

const filteredProductTabListReducer = createFilteredReducer(
  ProductTabListReducer,
  PRODUCT_TAB_LIST_REDUCER_KEY
);

const filteredStyliticsProductTabListReducer = createFilteredReducer(
  StyliticsProductTabListReducer,
  STYLITICS_PRODUCT_TAB_LIST_REDUCER_KEY
);

/**
 * TODO: This reducer is fragile. We should handle page
 * name changes in a cleaner way.
 *
 * @see RouteTracker.js
 */
function pageNameReducer(state = '', action) {
  switch (action.type) {
    case TRACK_PAGE_VIEW: {
      const { props } = action.payload;
      const { pageName = '' } = (props && props.initialProps && props.initialProps.pageProps) || {};
      return pageName;
    }
    default:
      return state;
  }
}

export default combineReducers({
  pageName: pageNameReducer,
  [SOCIAL_REDUCER_KEY]: SocialReducer,
  [APICONFIG_REDUCER_KEY]: filteredAppConfigReducer,
  [APPLY_PLCC_REDUCER_KEY]: ApplyCardReducer,
  [SESSIONCONFIG_REDUCER_KEY]: SessionConfigReducer,
  [HEADER_REDUCER_KEY]: HeaderReducer,
  [TOAST_REDUCER_KEY]: ToastMessageReducer,
  [FOOTER_REDUCER_KEY]: FooterReducer,
  [LABEL_REDUCER_KEY]: LabelReducer,
  [LAYOUT_REDUCER_KEY]: LayoutReducer,
  [MODULES_REDUCER_KEY]: ModulesReducer,
  [LOADER_REDUCER_KEY]: LoaderReducer,
  [SEARCH_REDUCER_KEY]: SearchBarReducer,
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
  [CHECKOUT_REDUCER_KEY]: CheckoutReducer,
  [OVERLAY_MODAL_REDUCER_KEY]: OverlayModalReducer,
  [NAVIGATION_REDUCER_KEY]: NavigationReducer,
  [PRODUCT_LISTING_REDUCER_KEY]: ProductListingReducer,
  [CREATE_ACCOUNT_REDUCER_KEY]: CreateAccountReducer,
  [BONUS_POINTS_DAYS_REDUCER_KEY]: BonusPointsDaysReducer,
  [COUPON_REDUCER_KEY]: CouponsReducer,
  [AIRMILES_BANNER_REDUCER_KEY]: AirmilesBannerReducer,
  [MY_FAVORITE_STORE_REDUCER_KEY]: MyFavoriteStoreReducer,
  [ACCOUNTHEADER_REDUCER_KEY]: AccountHeaderReducer,
  [POINTS_HISTORY_REDUCER_KEY]: PointsHistoryReducer,
  [EARNEXTRAPOINTS_REDUCER_KEY]: EarnExtraPointsReducer,
  [ORDERDETAILS_REDUCER_KEY]: OrderDetailsDataReducer,
  [RESET_PASSWORD_REDUCER_KEY]: ResetPasswordReducer,
  [CHANGE_PASSWORD_REDUCER_KEY]: ChangePasswordReducer,
  [UPDATE_PROFILE_REDUCER_KEY]: UpdateProfileReducer,
  [MY_PROFILE_REDUCER_KEY]: MyProfileReducer,
  [USER_REDUCER_KEY]: UserReducer,
  [DEVICE_INFO_REDUCER_KEY]: DeviceInfoReducer,
  [TRACK_ORDER_REDUCER_KEY]: TrackOrderReducer,
  [OPTIMIZELY_FEATURES_REDUCER]: OptimizelyFeaturesReducer,
  [MAILING_ADDRESS_REDUCER_KEY]: AddMailingAddressReducer,
  [PRODUCT_DETAIL_REDUCER_KEY]: ProductDetailReducer,
  [QUICK_VIEW_REDUCER_KEY]: QuickViewReducer,
  [OUTFIT_DETAILS_REDUCER_KEY]: OutfitDetailReducer,
  [APPLY_NOW_MODAL_REDUCER_KEY]: ApplyNowModalPLCCReducer,
  [PRODUCT_TAB_LIST_REDUCER_KEY]: filteredProductTabListReducer,
  [STYLITICS_PRODUCT_TAB_LIST_REDUCER_KEY]: filteredStyliticsProductTabListReducer,
  [BIRTHDAY_SAVING_LIST_REDUCER_KEY]: BirthdaySavingsListReducer,
  [PICKUP_MODAL_REDUCER_KEY]: PickupModalReducer,
  [RECOMMENDATIONS_REDUCER_KEY]: RecommendationsReducer,
  [STORE_LOCATOR_REDUCER_KEY]: StoreLocatorReducer,
  [SLP_PAGE_REDUCER_KEY]: SearchPageReducer,
  [STORE_DETAIL_REDUCER_KEY]: StoreDetailReducer,
  [POINTS_CLAIM_REDUCER_KEY]: PointsClaimReducer,
  [CONFIRMATION_REDUCER_KEY]: orderConfirmationReducer,
  [ORDERS_REDUCER_KEY]: OrdersReducer,
});
