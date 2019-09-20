import { all } from 'redux-saga/effects';
import SearchPageSaga from '@tcp/core/src/components/features/browse/SearchDetail/container/SearchDetail.saga';
import ProductListingPageSaga from '@tcp/core/src/components/features/browse/ProductListingPage/container/ProductListingPage.saga';
import LoginPageSaga from '@tcp/core/src/components/features/account/LoginPage/container/LoginPage.saga';
import UserSaga from '@tcp/core/src/components/features/account/User/container/User.saga';
import LogOutPageSaga from '@tcp/core/src/components/features/account/Logout/container/LogOut.saga';
import ForgotPasswordSaga from '@tcp/core/src/components/features/account/ForgotPassword/container/ForgotPassword.saga';
import ResetPasswordSaga from '@tcp/core/src/components/features/account/ResetPassword/container/ResetPassword.saga';
import ChangePasswordSaga from '@tcp/core/src/components/features/account/ChangePassword/container/ChangePassword.saga';
import UpdateProfileSaga from '@tcp/core/src/components/features/account/AddEditPersonalInformation/container/AddEditPersonalInformation.saga';
import AddEditAddressSaga from '@tcp/core/src/components/common/organisms/AddEditAddress/container/AddEditAddress.saga';
import AddressBookSaga from '@tcp/core/src/components/features/account/AddressBook/container/AddressBook.saga';
import PaymentSaga from '@tcp/core/src/components/features/account/Payment/container/Payment.saga';
import CreateAccountSaga from '@tcp/core/src/components/features/account/CreateAccount/container/CreateAccount.saga';
import DeleteCardSaga from '@tcp/core/src/components/features/account/Payment/container/DeleteCard.saga';
import GiftCardBalanceSaga from '@tcp/core/src/components/features/account/Payment/container/GetCardBalance.saga';
import DefaultPaymentSaga from '@tcp/core/src/components/features/account/Payment/container/DefaultPayment.saga';
import { AddGiftCardSaga } from '@tcp/core/src/components/features/account/Payment/AddGiftCard/container/AddGiftCard.saga';
import AddedToBagSaga from '@tcp/core/src/components/features/CnC/AddedToBag/container/AddedToBag.saga';
import DeleteAddressSaga from '@tcp/core/src/components/features/account/AddressBook/container/DeleteAddress.saga';
import BonusPointsSaga from '@tcp/core/src/components/common/organisms/BonusPointsDays/container/BonusPointsDays.saga';
import { SetDefaultShippingAddressSaga } from '@tcp/core/src/components/features/account/AddressBook/container/DefaultShippingAddress.saga';
import AddressVerificationSaga from '@tcp/core/src/components/common/organisms/AddressVerification/container/AddressVerification.saga';
import BirthdaySavingsSaga from '@tcp/core/src/components/features/account/common/organism/BirthdaySavingsList/container/BirthdaySavingsList.saga';
import BootstrapSaga from '@tcp/core/src/reduxStore/sagas/bootstrap';
import LabelsSaga from '@tcp/core/src/reduxStore/sagas/labels';
import AccountSaga from '@tcp/core/src/components/features/account/Account/container/Account.saga';
import AccountHeaderSaga from '@tcp/core/src/components/features/account/common/organism/AccountHeader/container/AccountHeader.saga';
import AddEditCreditCardSaga from '@tcp/core/src/components/features/account/AddEditCreditCard/container/AddEditCreditCard.saga';
import CartPageSaga from '@tcp/core/src/components/features/CnC/CartItemTile/container/CartItemTile.saga';
import ProductListingSaga from '@tcp/core/src/components/features/browse/ProductListing/container/ProductListing.saga';
import ProductDetailSaga from '@tcp/core/src/components/features/browse/ProductDetail/container/ProductDetail.saga';
import CouponSaga from '@tcp/core/src/components/features/CnC/common/organism/CouponAndPromos/container/Coupon.saga';
import CheckoutSaga from '@tcp/core/src/components/features/CnC/Checkout/container/Checkout.saga';
import BagPageSaga from '@tcp/core/src/components/features/CnC/BagPage/container/BagPage.saga';
import TrackOrderSaga from '@tcp/core/src/components/features/account/TrackOrder/container/TrackOrder.saga';
import PointsHistorySaga from '@tcp/core/src/components/features/account/common/organism/PointsHistory/container/PointsHistory.saga';
import EarnExtraPointsSaga from '@tcp/core/src/components/features/account/common/organism/EarnExtraPointsTile/container/EarnExtraPointsTile.saga';
import AddAirmilesBannerSaga from '@tcp/core/src/components/features/CnC/common/organism/AirmilesBanner/container/AirmilesBanner.saga';
import ApplyCreditCardSaga, {
  SubmitInstantCardApplication,
} from '@tcp/core/src/components/features/browse/ApplyCardPage/container/ApplyCard.saga';
import SocialAccountSaga from '@tcp/core/src/components/common/organisms/SocialAccount/container/Social.saga';
import BillingPaymentSaga from '@tcp/core/src/components/features/CnC/Checkout/organisms/BillingPaymentForm/container/CreditCard.saga';
import GiftCardsSaga from '@tcp/core/src/components/features/CnC/Checkout/organisms/GiftCardsSection/container/GiftCards.saga';
import MailingAddressSaga from '@tcp/core/src/components/features/account/MyProfile/organism/MailingInformation/container/MailingAddress.saga';
import ProductTabListSaga from '@tcp/core/src/components/common/organisms/ProductTabList/container/ProductTabList.saga';
import RecommendationsSaga from '@tcp/core/src/components/common/molecules/Recommendations/container/Recommendations.saga';
import StoreLocatorSaga from '@tcp/core/src/components/features/storeLocator/StoreLanding/container/StoreLanding.saga';
import MyFavoriteStoreSaga from '@tcp/core/src/components/features/account/MyProfile/organism/MyFavoriteStore/container/MyFavoriteStore.saga';
import PickupStoreSaga from '@tcp/core/src/components/common/organisms/PickupStoreModal/container/PickUpStoreModal.saga';
import HomePageSaga from '../../components/features/content/HomePage/container/HomePage.saga';
import EmailSignupSaga from '../../components/common/molecules/EmailSignupModal/container/EmailSignupModal.saga';
import SmsSignupSaga from '../../components/common/molecules/SmsSignupModal/container/SmsSignupModal.saga';
import CountrySelectorSaga from '../../components/features/content/Header/molecules/CountrySelector/container/CountrySelector.saga';
import SearchBarSaga from '../../components/features/content/Header/molecules/SearchBar/SearchBar.saga';

export default function* rootSaga() {
  yield all([
    LabelsSaga(),
    BootstrapSaga(),
    HomePageSaga(),
    ProductListingPageSaga(),
    LoginPageSaga(),
    UserSaga(),
    LogOutPageSaga(),
    ForgotPasswordSaga(),
    SearchBarSaga(),
    AddEditAddressSaga(),
    AddressBookSaga(),
    DeleteAddressSaga(),
    AddedToBagSaga(),
    SetDefaultShippingAddressSaga(),
    AddressVerificationSaga(),
    PaymentSaga(),
    TrackOrderSaga(),
    EmailSignupSaga(),
    SmsSignupSaga(),
    DeleteCardSaga(),
    GiftCardBalanceSaga(),
    DefaultPaymentSaga(),
    AddEditCreditCardSaga(),
    SubmitInstantCardApplication(),
    AddGiftCardSaga(),
    AccountSaga(),
    BagPageSaga(),
    CartPageSaga(),
    CreateAccountSaga(),
    ProductListingSaga(),
    ProductDetailSaga(),
    BonusPointsSaga(),
    CouponSaga(),
    CheckoutSaga(),
    AccountHeaderSaga(),
    CountrySelectorSaga(),
    PointsHistorySaga(),
    EarnExtraPointsSaga(),
    ResetPasswordSaga(),
    ApplyCreditCardSaga(),
    ChangePasswordSaga(),
    UpdateProfileSaga(),
    BirthdaySavingsSaga(),
    GiftCardsSaga(),
    AddAirmilesBannerSaga(),
    MailingAddressSaga(),
    ProductTabListSaga(),
    RecommendationsSaga(),
    BillingPaymentSaga(),
    StoreLocatorSaga(),
    SocialAccountSaga(),
    SearchPageSaga(),
    MyFavoriteStoreSaga(),
    PickupStoreSaga(),
  ]);
}
