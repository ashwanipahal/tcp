import { all } from 'redux-saga/effects';
import ProductListingPageSaga from '@tcp/core/src/components/features/browse/ProductListingPage/container/ProductListingPage.saga';
import LoginPageSaga from '@tcp/core/src/components/features/account/LoginPage/container/LoginPage.saga';
import AddAddressSaga from '@tcp/core/src/components/features/account/AddressBook/container/AddAddress/AddAddress.saga';
import AddressBookSaga from '@tcp/core/src/components/features/account/AddressBook/container/AddressBook.saga';
import PaymentSaga from '@tcp/core/src/components/features/account/Payment/container/Payment.saga';
import DeleteAddressSaga from '@tcp/core/src/components/features/account/AddressBook/container/DeleteAddress.saga';
import { SetDefaultShippingAddressSaga } from '@tcp/core/src/components/features/account/AddressBook/container/DefaultShippingAddress.saga';
import BootstrapSaga from '@tcp/core/src/reduxStore/sagas/bootstrap';
import HomePageSaga from '../../components/features/content/HomePage/container/HomePage.saga';
import EmailSignupSaga from '../../components/common/molecules/SignupModal/container/SignupModal.saga';

export default function* rootSaga() {
  yield all([
    BootstrapSaga(),
    HomePageSaga(),
    ProductListingPageSaga(),
    LoginPageSaga(),
    AddAddressSaga(),
    AddressBookSaga(),
    DeleteAddressSaga(),
    SetDefaultShippingAddressSaga(),
    PaymentSaga(),
    EmailSignupSaga(),
  ]);
}
