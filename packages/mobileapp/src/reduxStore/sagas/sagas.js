import { all } from 'redux-saga/effects';
import BootstrapSaga from '@tcp/core/src/reduxStore/sagas/bootstrap';
import LoginPageSaga from '@tcp/core/src/components/features/account/LoginPage/container/LoginPage.saga';
import ForgotPasswordSaga from '@tcp/core/src/components/features/account/ForgotPassword/container/ForgotPassword.saga';
import PaymentSaga from '@tcp/core/src/components/features/account/Payment/container/Payment.saga';
import DefaultPaymentSaga from '@tcp/core/src/components/features/account/Payment/container/DefaultPayment.saga';
import AddressBookSaga from '@tcp/core/src/components/features/account/AddressBook/container/AddressBook.saga';
import ProductListingPageSaga from '@tcp/core/src/components/features/browse/ProductListingPage/container/ProductListingPage.saga';
import AddedToBagSaga from '@tcp/core/src/components/features/CnC/AddedToBag/container/AddedToBag.saga';
import CreateAccountSaga from '@tcp/core/src/components/features/account/CreateAccount/container/CreateAccount.saga';
import CartPageSaga from '@tcp/core/src/components/features/CnC/CartItemTile/container/CartItemTile.saga';
import BagPageSaga from '@tcp/core/src/components/features/CnC/BagPage/container/BagPage.saga';
import HomePageSaga from '../../components/features/content/HomePage/container/HomePage.saga';

export default function* rootSaga() {
  yield all([
    BootstrapSaga(),
    HomePageSaga(),
    LoginPageSaga(),
    ForgotPasswordSaga(),
    PaymentSaga(),
    DefaultPaymentSaga(),
    AddressBookSaga(),
    ProductListingPageSaga(),
    AddedToBagSaga(),
    CreateAccountSaga(),
    BagPageSaga(),
    CartPageSaga(),
  ]);
}
