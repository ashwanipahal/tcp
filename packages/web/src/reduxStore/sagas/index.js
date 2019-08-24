import { all } from 'redux-saga/effects';
import ProductListingPageSaga from '@tcp/core/src/components/features/browse/ProductListingPage/container/ProductListingPage.saga';
import LoginPageSaga from '@tcp/core/src/components/features/account/LoginPage/container/LoginPage.saga';
import UserSaga from '@tcp/core/src/components/features/account/User/container/User.saga';
import LogOutPageSaga from '@tcp/core/src/components/features/account/Logout/container/LogOut.saga';
import ForgotPasswordSaga from '@tcp/core/src/components/features/account/ForgotPassword/container/ForgotPassword.saga';
import ResetPasswordSaga from '@tcp/core/src/components/features/account/ResetPassword/container/ResetPassword.saga';
import ChangePasswordSaga from '@tcp/core/src/components/features/account/ChangePassword/container/ChangePassword.saga';
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
import BootstrapSaga from '@tcp/core/src/reduxStore/sagas/bootstrap';
import AccountSaga from '@tcp/core/src/components/features/account/Account/container/Account.saga';
import AccountHeaderSaga from '@tcp/core/src/components/features/account/common/organism/AccountHeader/container/AccountHeader.saga';
import AddEditCreditCardSaga from '@tcp/core/src/components/features/account/AddEditCreditCard/container/AddEditCreditCard.saga';
import CartPageSaga from '@tcp/core/src/components/features/CnC/CartItemTile/container/CartItemTile.saga';
import ProductListingSaga from '@tcp/core/src/components/features/browse/ProductListing/container/ProductListing.saga';
import CouponSaga from '@tcp/core/src/components/features/CnC/common/organism/CouponAndPromos/container/Coupon.saga';
import CheckoutSaga from '@tcp/core/src/components/features/CnC/Checkout/container/Checkout.saga';
import BagPageSaga from '@tcp/core/src/components/features/CnC/BagPage/container/BagPage.saga';
import TrackOrderSaga from '@tcp/core/src/components/features/account/TrackOrder/container/TrackOrder.saga';
import PointsHistorySaga from '@tcp/core/src/components/features/account/common/organism/PointsHistory/container/PointsHistory.saga';
import HomePageSaga from '../../components/features/content/HomePage/container/HomePage.saga';
import EmailSignupSaga from '../../components/common/molecules/EmailSignupModal/container/EmailSignupModal.saga';
import SmsSignupSaga from '../../components/common/molecules/SmsSignupModal/container/SmsSignupModal.saga';

export default function* rootSaga() {
  yield all([
    BootstrapSaga(),
    HomePageSaga(),
    ProductListingPageSaga(),
    LoginPageSaga(),
    UserSaga(),
    LogOutPageSaga(),
    ForgotPasswordSaga(),
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
    AddGiftCardSaga(),
    AccountSaga(),
    BagPageSaga(),
    CartPageSaga(),
    CreateAccountSaga(),
    ProductListingSaga(),
    BonusPointsSaga(),
    CouponSaga(),
    CheckoutSaga(),
    AccountHeaderSaga(),
    PointsHistorySaga(),
    ResetPasswordSaga(),
    ChangePasswordSaga(),
  ]);
}
