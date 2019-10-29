import { combineReducers } from 'redux';
import { reducer as reduxFormReducer } from 'redux-form';
import { persistReducer } from 'redux-persist';
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
import AccountReducer from '@tcp/core/src/components/features/account/Account/container/Account.reducer';
import AddedToBagReducer from '@tcp/core/src/components/features/CnC/AddedToBag/container/AddedToBag.reducer';
import CartItemTile from '@tcp/core/src/components/features/CnC/CartItemTile/container/CartItemTile.reducer';
import CartPage from '@tcp/core/src/components/features/CnC/BagPage/container/BagPage.reducer';
import PointsHistoryReducer from '@tcp/core/src/components/features/account/common/organism/PointsHistory/container/PointsHistory.reducer';
import EarnExtraPointsReducer from '@tcp/core/src/components/features/account/common/organism/EarnExtraPointsTile/container/EarnExtraPointsTile.reducer';
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
import AddMailingAddressReducer from '@tcp/core/src/components/features/account/MyProfile/organism/MailingInformation/container/MailingAddress.reducer';
import UpdateProfileReducer from '@tcp/core/src/components/features/account/AddEditPersonalInformation/container/AddEditPersonalInformation.reducer';
import MyProfileReducer from '@tcp/core/src/components/features/account/MyProfile/container/MyProfile.reducer';
import ProductDetailReducer from '@tcp/core/src/components/features/browse/ProductDetail/container/ProductDetail.reducer';
import QuickViewReducer from '@tcp/core/src/components/common/organisms/QuickViewModal/container/QuickViewModal.reducer';
import MyFavoriteStoreReducer from '@tcp/core/src/components/features/account/MyProfile/organism/MyFavoriteStore/container/MyFavoriteStore.reducer';
import BirthdaySavingsListReducer from '@tcp/core/src/components/features/account/common/organism/BirthdaySavingsList/container/BirthdaySavingsList.reducer';
import StoreDetailReducer from '@tcp/core/src/components/features/storeLocator/StoreDetail/container/StoreDetail.reducer';
import StoreLandingReducer from '@tcp/core/src/components/features/storeLocator/StoreLanding/container/StoreLanding.reducer';
import ApplyCardReducer from '@tcp/core/src/components/features/browse/ApplyCardPage/container/ApplyCard.reducer';
import ApplyNowModalPLCCReducer from '@tcp/core/src/components/common/molecules/ApplyNowPLCCModal/container/ApplyNowModal.reducer';
import PointsClaimReducer from '@tcp/core/src/components/features/account/PointsClaim/container/PointsClaim.reducer';
import SocialReducer from '@tcp/core/src/components/common/organisms/SocialAccount/container/Social.reducer';
import orderConfirmationReducer from '@tcp/core/src/components/features/CnC/Confirmation/container/Confirmation.reducer';
import PickupModalReducer from '@tcp/core/src/components/common/organisms/PickupStoreModal/container/PickUpStoreModal.reducer';
import OutfitDetailReducer from '@tcp/core/src/components/features/browse/OutfitDetails/container/OutfitDetails.reducer';
import SearchDetailReducer from '@tcp/core/src/components/features/browse/SearchDetail/container/SearchDetail.reducer';
import ExtraPointsReducer from '@tcp/core/src/components/features/account/ExtraPoints/container/ExtraPoints.reducer';
import OrdersReducer from '@tcp/core/src/components/features/account/Orders/container/Orders.reducer';
import OrderDetailsDataReducer from '@tcp/core/src/components/features/account/OrderDetails/container/OrderDetails.reducer';
import SearchBarReducer from '@tcp/core/src/components/common/molecules/SearchBar/SearchBar.reducer';
import FavoriteReducer from '@tcp/core/src/components/features/browse/Favorites/container/Favorites.reducer';
import RecommendationsReducer from '@tcp/core/src/components/common/molecules/Recommendations/container/Recommendations.reducer';
import RecentSearchReducer from '@tcp/core/src/components/common/organisms/SearchProduct/RecentSearch.reducer';
import AsyncStorage from '@react-native-community/async-storage';
import MyPreferenceSubscriptionReducer from '@tcp/core/src/components/features/account/MyPreferenceSubscription/container/MyPreferenceSubscription.reducer';

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
  ACCOUNT_REDUCER_KEY,
  CREATE_ACCOUNT_REDUCER_KEY,
  COUPON_REDUCER_KEY,
  AIRMILES_BANNER_REDUCER_KEY,
  BONUS_POINTS_DAYS_REDUCER_KEY,
  POINTS_HISTORY_REDUCER_KEY,
  EARNEXTRAPOINTS_REDUCER_KEY,
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
  PRODUCT_TAB_LIST_REDUCER_KEY,
  MAILING_ADDRESS_REDUCER_KEY,
  UPDATE_PROFILE_REDUCER_KEY,
  MY_PROFILE_REDUCER_KEY,
  PRODUCT_DETAIL_REDUCER_KEY,
  QUICK_VIEW_REDUCER_KEY,
  MY_FAVORITE_STORE_REDUCER_KEY,
  BIRTHDAY_SAVING_LIST_REDUCER_KEY,
  STORE_DETAIL_REDUCER_KEY,
  STORE_LOCATOR_REDUCER_KEY,
  APPLY_NOW_MODAL_REDUCER_KEY,
  APPLY_PLCC_REDUCER_KEY,
  POINTS_CLAIM_REDUCER_KEY,
  SOCIAL_REDUCER_KEY,
  CONFIRMATION_REDUCER_KEY,
  STYLITICS_PRODUCT_TAB_LIST_REDUCER_KEY,
  PICKUP_MODAL_REDUCER_KEY,
  SLP_PAGE_REDUCER_KEY,
  EXTRA_POINTS_REDUCER_KEY,
  ORDERS_REDUCER_KEY,
  ORDERDETAILS_REDUCER_KEY,
  SEARCH_REDUCER_KEY,
  FAVORITES_REDUCER_KEY,
  RECOMMENDATIONS_REDUCER_KEY,
  OUTFIT_DETAILS_REDUCER_KEY,
  RECENT_SEARCH_REDUCER_KEY,
  MY_PREFERENCE_REDUCER_KEY,
} from '@tcp/core/src/constants/reducer.constants';
import HeaderReducer from '@tcp/core/src/components/common/organisms/Header/container/Header.reducer';
import ModulesReducer from '@tcp/core/src/reduxStore/reducers/modules';
import AddGiftCardReducer from '@tcp/core/src/components/features/account/Payment/AddGiftCard/container/AddGiftCard.reducer';
import AddressBookReducer from '@tcp/core/src/components/features/account/AddressBook/container/AddressBook.reducer';
import NavigationReducer from '@tcp/core/src/components/features/content/Navigation/container/Navigation.reducer';
import UserReducer from '@tcp/core/src/components/features/account/User/container/User.reducer';
import ToastMessageReducer from '@tcp/core/src/components/common/atoms/Toast/container/Toast.reducer.native';
import ProductTabListReducer from '@tcp/core/src/components/common/organisms/ProductTabList/container/ProductTabList.reducer';
import StyliticsProductTabListReducer from '@tcp/core/src/components/common/organisms/StyliticsProductTabList/container/StyliticsProductTabList.reducer';
import immutableTransform from 'redux-persist-transform-immutable';

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

const filteredProductTabListReducer = createFilteredReducer(
  ProductTabListReducer,
  PRODUCT_TAB_LIST_REDUCER_KEY
);

const filteredStyliticsProductTabListReducer = createFilteredReducer(
  StyliticsProductTabListReducer,
  STYLITICS_PRODUCT_TAB_LIST_REDUCER_KEY
);

const filteredProductDetailReducer = createFilteredReducer(
  ProductDetailReducer,
  PRODUCT_DETAIL_REDUCER_KEY
);

const filteredSearchDetailReducer = createFilteredReducer(
  SearchDetailReducer,
  SLP_PAGE_REDUCER_KEY
);

const filteredAppConfigReducer = createFilteredReducer(ApiConfigReducer, APICONFIG_REDUCER_KEY);

const filteredGetCandidReducer = createFilteredReducer(GetCandidReducer, GET_CANDID_REDUCER_KEY);

const filteredRecommendationsReducers = createFilteredReducer(
  RecommendationsReducer,
  RECOMMENDATIONS_REDUCER_KEY
);

const rootReducer = combineReducers({
  [SOCIAL_REDUCER_KEY]: SocialReducer,
  [APICONFIG_REDUCER_KEY]: filteredAppConfigReducer,
  [TOAST_REDUCER_KEY]: ToastMessageReducer,
  [SESSIONCONFIG_REDUCER_KEY]: SessionConfigReducer,
  [THEME_WRAPPER_REDUCER_KEY]: ThemeWrapperReducer,
  [HEADER_REDUCER_KEY]: HeaderReducer,
  [LABEL_REDUCER_KEY]: LabelReducer,
  [LAYOUT_REDUCER_KEY]: LayoutReducer,
  [PRODUCTLISTINGPAGE_REDUCER_KEY]: filteredProductListingPageReducer,
  [PRODUCT_LISTING_REDUCER_KEY]: filteredProductListingReducer,
  [PRODUCT_DETAIL_REDUCER_KEY]: filteredProductDetailReducer,
  [QUICK_VIEW_REDUCER_KEY]: QuickViewReducer,
  [LOGINPAGE_REDUCER_KEY]: LoginPageReducer,
  [FORGOTPASSWORD_REDUCER_KEY]: ForgotPasswordReducer,
  [PAYMENT_REDUCER_KEY]: PaymentReducer,
  [MODULES_REDUCER_KEY]: ModulesReducer,
  [ADD_GIFT_CARD_REDUCER_KEY]: AddGiftCardReducer,
  [ADDRESSBOOK_REDUCER_KEY]: AddressBookReducer,
  [ADDED_TO_BAG_REDUCER_KEY]: AddedToBagReducer,
  [ACCOUNT_REDUCER_KEY]: AccountReducer,
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
  [EARNEXTRAPOINTS_REDUCER_KEY]: EarnExtraPointsReducer,
  [ADDEDITCREDITCARD_REDUCER_KEY]: AddEditCreditCardReducer,
  [USER_REDUCER_KEY]: UserReducer,
  [CHANGE_PASSWORD_REDUCER_KEY]: ChangePasswordReducer,
  [ADDEDITADDRESS_REDUCER_KEY]: AddEditAddressReducer,
  [ADDRESS_VERIFICATION_REDUCER_KEY]: AddressVerificationReducer,
  [TRACK_ORDER_REDUCER_KEY]: TrackOrderReducer,
  [PRODUCT_TAB_LIST_REDUCER_KEY]: filteredProductTabListReducer,
  [STYLITICS_PRODUCT_TAB_LIST_REDUCER_KEY]: filteredStyliticsProductTabListReducer,
  [GET_CANDID_REDUCER_KEY]: filteredGetCandidReducer,
  [MAILING_ADDRESS_REDUCER_KEY]: AddMailingAddressReducer,
  [UPDATE_PROFILE_REDUCER_KEY]: UpdateProfileReducer,
  [MY_PROFILE_REDUCER_KEY]: MyProfileReducer,
  [MY_FAVORITE_STORE_REDUCER_KEY]: MyFavoriteStoreReducer,
  [BIRTHDAY_SAVING_LIST_REDUCER_KEY]: BirthdaySavingsListReducer,
  [STORE_DETAIL_REDUCER_KEY]: StoreDetailReducer,
  [STORE_LOCATOR_REDUCER_KEY]: StoreLandingReducer,
  [APPLY_PLCC_REDUCER_KEY]: ApplyCardReducer,
  [APPLY_NOW_MODAL_REDUCER_KEY]: ApplyNowModalPLCCReducer,
  [POINTS_CLAIM_REDUCER_KEY]: PointsClaimReducer,
  [CONFIRMATION_REDUCER_KEY]: orderConfirmationReducer,
  [PICKUP_MODAL_REDUCER_KEY]: PickupModalReducer,
  [SLP_PAGE_REDUCER_KEY]: filteredSearchDetailReducer,
  [EXTRA_POINTS_REDUCER_KEY]: ExtraPointsReducer,
  [ORDERS_REDUCER_KEY]: OrdersReducer,
  [ORDERDETAILS_REDUCER_KEY]: OrderDetailsDataReducer,
  [SEARCH_REDUCER_KEY]: SearchBarReducer,
  [FAVORITES_REDUCER_KEY]: FavoriteReducer,
  [RECOMMENDATIONS_REDUCER_KEY]: filteredRecommendationsReducers,
  [OUTFIT_DETAILS_REDUCER_KEY]: OutfitDetailReducer,
  [RECENT_SEARCH_REDUCER_KEY]: RecentSearchReducer,
  [MY_PREFERENCE_REDUCER_KEY]: MyPreferenceSubscriptionReducer,
});

const rootPersistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: [RECENT_SEARCH_REDUCER_KEY],
  transforms: [immutableTransform()],
};

export default persistReducer(rootPersistConfig, rootReducer);
