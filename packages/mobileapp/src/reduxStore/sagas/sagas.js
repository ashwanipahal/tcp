import { all } from 'redux-saga/effects';
import BootstrapSaga from '@tcp/core/src/reduxStore/sagas/bootstrap';
import LabelsSaga from '@tcp/core/src/reduxStore/sagas/labels';
import LoginPageSaga from '@tcp/core/src/components/features/account/LoginPage/container/LoginPage.saga';
import UserSaga from '@tcp/core/src/components/features/account/User/container/User.saga';
import LogOutPageSaga from '@tcp/core/src/components/features/account/Logout/container/LogOut.saga';
import ForgotPasswordSaga from '@tcp/core/src/components/features/account/ForgotPassword/container/ForgotPassword.saga';
import ProductListingSaga from '@tcp/core/src/components/features/browse/ProductListing/container/ProductListing.saga';
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
import CouponSaga from '@tcp/core/src/components/features/CnC/common/organism/CouponAndPromos/container/Coupon.saga';
import CheckoutSaga from '@tcp/core/src/components/features/CnC/Checkout/container/Checkout.saga';
import AddEditCreditCardSaga from '@tcp/core/src/components/features/account/AddEditCreditCard/container/AddEditCreditCard.saga';
import { AddGiftCardSaga } from '@tcp/core/src/components/features/account/Payment/AddGiftCard/container/AddGiftCard.saga';
import TrackOrderSaga from '@tcp/core/src/components/features/account/TrackOrder/container/TrackOrder.saga';
import NavigationSaga from '@tcp/core/src/components/features/content/Navigation/container/Navigation.saga';
import ChangePasswordSaga from '@tcp/core/src/components/features/account/ChangePassword/container/ChangePassword.saga';
import ProductTabListSaga from '@tcp/core/src/components/common/organisms/ProductTabList/container/ProductTabList.saga';
import GetCandidSaga from '@tcp/core/src/components/common/molecules/GetCandid/container/GetCandid.saga';
import GiftCardsSaga from '@tcp/core/src/components/features/CnC/Checkout/organisms/GiftCardsSection/container/GiftCards.saga';
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
    ProductListingSaga(),
    AddEditCreditCardSaga(),
    UserSaga(),
    AddGiftCardSaga(),
    CheckoutSaga(),
    TrackOrderSaga(),
    ChangePasswordSaga(),
    ProductTabListSaga(),
    GetCandidSaga(),
    UpdateProfileSaga(),
    GiftCardsSaga(),
  ]);
}
