import { all } from 'redux-saga/effects';
import BootstrapSaga from '@tcp/core/src/reduxStore/sagas/bootstrap';
import LabelsSaga from '@tcp/core/src/reduxStore/sagas/labels';
import LoginPageSaga from '@tcp/core/src/components/features/account/LoginPage/container/LoginPage.saga';
import UserSaga from '@tcp/core/src/components/features/account/User/container/User.saga';
import LogOutPageSaga from '@tcp/core/src/components/features/account/Logout/container/LogOut.saga';
import ForgotPasswordSaga from '@tcp/core/src/components/features/account/ForgotPassword/container/ForgotPassword.saga';
import ProductListingSaga from '@tcp/core/src/components/features/browse/ProductListing/container/ProductListing.saga';
import ProductDetailSaga from '@tcp/core/src/components/features/browse/ProductDetail/container/ProductDetail.saga';
import QuickViewSaga from '@tcp/core/src/components/common/organisms/QuickViewModal/container/QuickViewModal.saga';
import PaymentSaga from '@tcp/core/src/components/features/account/Payment/container/Payment.saga';
import UpdateProfileSaga from '@tcp/core/src/components/features/account/AddEditPersonalInformation/container/AddEditPersonalInformation.saga';
import AddEditAddressSaga from '@tcp/core/src/components/common/organisms/AddEditAddress/container/AddEditAddress.saga';
import AddressVerificationSaga from '@tcp/core/src/components/common/organisms/AddressVerification/container/AddressVerification.saga';
import DefaultPaymentSaga from '@tcp/core/src/components/features/account/Payment/container/DefaultPayment.saga';
import AddressBookSaga from '@tcp/core/src/components/features/account/AddressBook/container/AddressBook.saga';
import DeleteAddressSaga from '@tcp/core/src/components/features/account/AddressBook/container/DeleteAddress.saga';
import { SetDefaultShippingAddressSaga } from '@tcp/core/src/components/features/account/AddressBook/container/DefaultShippingAddress.saga';
import ProductListingPageSaga from '@tcp/core/src/components/features/browse/ProductListingPage/container/ProductListingPage.saga';
import AddedToBagSaga from '@tcp/core/src/components/features/CnC/AddedToBag/container/AddedToBag.saga';
import CreateAccountSaga from '@tcp/core/src/components/features/account/CreateAccount/container/CreateAccount.saga';
import CartPageSaga from '@tcp/core/src/components/features/CnC/CartItemTile/container/CartItemTile.saga';
import BonusPointsSaga from '@tcp/core/src/components/common/organisms/BonusPointsDays/container/BonusPointsDays.saga';
import GiftCardBalanceSaga from '@tcp/core/src/components/features/account/Payment/container/GetCardBalance.saga';
import BagPageSaga from '@tcp/core/src/components/features/CnC/BagPage/container/BagPage.saga';
import DeleteCardSaga from '@tcp/core/src/components/features/account/Payment/container/DeleteCard.saga';
import PointsHistorySaga from '@tcp/core/src/components/features/account/common/organism/PointsHistory/container/PointsHistory.saga';
import EarnExtraPointsSaga from '@tcp/core/src/components/features/account/common/organism/EarnExtraPointsTile/container/EarnExtraPointsTile.saga';
import EarnedPointsNotificationSaga from '@tcp/core/src/components/features/account/common/organism/EarnExtraPointsTile/container/EarnedPointsNotification.saga';

import CouponSaga from '@tcp/core/src/components/features/CnC/common/organism/CouponAndPromos/container/Coupon.saga';
import CheckoutSaga from '@tcp/core/src/components/features/CnC/Checkout/container/Checkout.saga';
import AddEditCreditCardSaga from '@tcp/core/src/components/features/account/AddEditCreditCard/container/AddEditCreditCard.saga';
import { AddGiftCardSaga } from '@tcp/core/src/components/features/account/Payment/AddGiftCard/container/AddGiftCard.saga';
import TrackOrderSaga from '@tcp/core/src/components/features/account/TrackOrder/container/TrackOrder.saga';
import NavigationSaga from '@tcp/core/src/components/features/content/Navigation/container/Navigation.saga';
import ChangePasswordSaga from '@tcp/core/src/components/features/account/ChangePassword/container/ChangePassword.saga';
import BillingPaymentSaga from '@tcp/core/src/components/features/CnC/Checkout/organisms/BillingPaymentForm/container/CreditCard.saga';
import ProductTabListSaga from '@tcp/core/src/components/common/organisms/ProductTabList/container/ProductTabList.saga';
import StyliticsProductTabListSaga from '@tcp/core/src/components/common/organisms/StyliticsProductTabList/container/StyliticsProductTabList.saga';
import GetCandidSaga from '@tcp/core/src/components/common/molecules/GetCandid/container/GetCandid.saga';
import GiftCardsSaga from '@tcp/core/src/components/features/CnC/Checkout/organisms/GiftCardsSection/container/GiftCards.saga';
import MailingAddressSaga from '@tcp/core/src/components/features/account/MyProfile/organism/MailingInformation/container/MailingAddress.saga';
import MyFavoriteStoreSaga from '@tcp/core/src/components/features/account/MyProfile/organism/MyFavoriteStore/container/MyFavoriteStore.saga';
import SearchPageSaga from '@tcp/core/src/components/features/browse/SearchDetail/container/SearchDetail.saga';
import BirthdaySavingsSaga from '@tcp/core/src/components/features/account/common/organism/BirthdaySavingsList/container/BirthdaySavingsList.saga';
import StoreDetailSaga from '@tcp/core/src/components/features/storeLocator/StoreDetail/container/StoreDetail.saga';
import StoreLandingSaga from '@tcp/core/src/components/features/storeLocator/StoreLanding/container/StoreLanding.saga';
import ExtraPointsSaga from '@tcp/core/src/components/features/account/ExtraPoints/container/ExtraPoints.saga';

import PickupStoreSaga from '@tcp/core/src/components/common/organisms/PickupStoreModal/container/PickUpStoreModal.saga';
import ConfirmationPageSaga from '@tcp/core/src/components/features/CnC/Confirmation/container/Confirmation.saga';
import ApplyCreditCardSaga, {
  SubmitInstantCardApplication,
} from '@tcp/core/src/components/features/browse/ApplyCardPage/container/ApplyCard.saga';
import SocialAccountSaga from '@tcp/core/src/components/common/organisms/SocialAccount/container/Social.saga';
import PointsClaimSaga from '@tcp/core/src/components/features/account/PointsClaim/container/PointsClaim.saga';
import OrdersSaga from '@tcp/core/src/components/features/account/Orders/container/Orders.saga';
import SearchBarSaga from '@tcp/core/src/components/common/molecules/SearchBar/SearchBar.saga';
import HomePageSaga from '../../components/features/content/HomePage/container/HomePage.saga';

export default function* rootSaga() {
  yield all([
    LabelsSaga(),
    BootstrapSaga(),
    HomePageSaga(),
    NavigationSaga(),
    AddEditAddressSaga(),
    AddressVerificationSaga(),
    LoginPageSaga(),
    LogOutPageSaga(),
    ForgotPasswordSaga(),
    PaymentSaga(),
    DefaultPaymentSaga(),
    SetDefaultShippingAddressSaga(),
    AddressBookSaga(),
    DeleteAddressSaga(),
    ProductListingPageSaga(),
    AddedToBagSaga(),
    CreateAccountSaga(),
    BagPageSaga(),
    CartPageSaga(),
    BonusPointsSaga(),
    GiftCardBalanceSaga(),
    CouponSaga(),
    DeleteCardSaga(),
    PointsHistorySaga(),
    EarnExtraPointsSaga(),
    EarnedPointsNotificationSaga(),
    ProductListingSaga(),
    AddEditCreditCardSaga(),
    UserSaga(),
    AddGiftCardSaga(),
    CheckoutSaga(),
    TrackOrderSaga(),
    ChangePasswordSaga(),
    BillingPaymentSaga(),
    ProductTabListSaga(),
    StyliticsProductTabListSaga(),
    GetCandidSaga(),
    UpdateProfileSaga(),
    GiftCardsSaga(),
    MailingAddressSaga(),
    SearchPageSaga(),
    ProductDetailSaga(),
    MyFavoriteStoreSaga(),
    BirthdaySavingsSaga(),
    StoreDetailSaga(),
    StoreLandingSaga(),
    ApplyCreditCardSaga(),
    SubmitInstantCardApplication(),
    QuickViewSaga(),
    PointsClaimSaga(),
    SocialAccountSaga(),
    ConfirmationPageSaga(),
    PickupStoreSaga(),
    ExtraPointsSaga(),
    OrdersSaga(),
    SearchBarSaga(),
  ]);
}
