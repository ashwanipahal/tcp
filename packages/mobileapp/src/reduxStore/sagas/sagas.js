import { all } from 'redux-saga/effects';
import BootstrapSaga from '@tcp/core/src/reduxStore/sagas/bootstrap';
import LoginPageSaga from '@tcp/core/src/components/features/account/LoginPage/container/LoginPage.saga';
import PaymentSaga from '@tcp/core/src/components/features/account/Payment/container/Payment.saga';
import DefaultPaymentSaga from '@tcp/core/src/components/features/account/Payment/container/DefaultPayment.saga';
import AddressBookSaga from '@tcp/core/src/components/features/account/AddressBook/container/AddressBook.saga';
import ProductListingPageSaga from '@tcp/core/src/components/features/browse/ProductListingPage/container/ProductListingPage.saga';
import AddedToBagSaga from '@tcp/core/src/components/features/CnC/AddedToBag/container/AddedToBag.saga';
import CartPageSaga from '@tcp/core/src/components/features/CnC/CartItemTile/container/CartItemTile.saga';
import CartReducer from '@tcp/core/src/components/features/CnC/Cart/containers/Cart.saga';
import HomePageSaga from '../../components/features/content/HomePage/container/HomePage.saga';

export default function* rootSaga() {
  yield all([
    BootstrapSaga(),
    HomePageSaga(),
    LoginPageSaga(),
    PaymentSaga(),
    DefaultPaymentSaga(),
    AddressBookSaga(),
    ProductListingPageSaga(),
    AddedToBagSaga(),
    CartPageSaga(),
    CartReducer(),
  ]);
}
