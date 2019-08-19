import { all } from 'redux-saga/effects';
import BootstrapSaga from '@tcp/core/src/reduxStore/sagas/bootstrap';
import LoginPageSaga from '@tcp/core/src/components/features/account/LoginPage/container/LoginPage.saga';
import LogOutPageSaga from '@tcp/core/src/components/features/account/Logout/container/LogOut.saga';
import ForgotPasswordSaga from '@tcp/core/src/components/features/account/ForgotPassword/container/ForgotPassword.saga';
import PaymentSaga from '@tcp/core/src/components/features/account/Payment/container/Payment.saga';
import DefaultPaymentSaga from '@tcp/core/src/components/features/account/Payment/container/DefaultPayment.saga';
import AddressBookSaga from '@tcp/core/src/components/features/account/AddressBook/container/AddressBook.saga';
import { SetDefaultShippingAddressSaga } from '@tcp/core/src/components/features/account/AddressBook/container/DefaultShippingAddress.saga';
import ProductListingPageSaga from '@tcp/core/src/components/features/browse/ProductListingPage/container/ProductListingPage.saga';
import AddedToBagSaga from '@tcp/core/src/components/features/CnC/AddedToBag/container/AddedToBag.saga';
import CreateAccountSaga from '@tcp/core/src/components/features/account/CreateAccount/container/CreateAccount.saga';
import CartPageSaga from '@tcp/core/src/components/features/CnC/CartItemTile/container/CartItemTile.saga';
import BonusPointsSaga from '@tcp/core/src/components/features/account/BonusPointsDays/container/BonusPointsDays.saga';
import GiftCardBalanceSaga from '@tcp/core/src/components/features/account/Payment/container/GetCardBalance.saga';
import BagPageSaga from '@tcp/core/src/components/features/CnC/BagPage/container/BagPage.saga';
import DeleteCardSaga from '@tcp/core/src/components/features/account/Payment/container/DeleteCard.saga';
import PointsHistorySaga from '@tcp/core/src/components/features/account/common/organism/PointsHistory/container/PointsHistory.saga';
import CouponSaga from '@tcp/core/src/components/features/CnC/common/organism/CouponAndPromos/container/Coupon.saga';
import HomePageSaga from '../../components/features/content/HomePage/container/HomePage.saga';

export default function* rootSaga() {
  yield all([
    BootstrapSaga(),
    HomePageSaga(),
    LoginPageSaga(),
    LogOutPageSaga(),
    ForgotPasswordSaga(),
    PaymentSaga(),
    DefaultPaymentSaga(),
    SetDefaultShippingAddressSaga(),
    AddressBookSaga(),
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
  ]);
}
