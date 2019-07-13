import { all } from 'redux-saga/effects';
import ProductListingPageSaga from '@tcp/core/src/components/features/browse/ProductListingPage/container/ProductListingPage.saga';
import LoginPageSaga from '@tcp/core/src/components/features/account/LoginPage/container/LoginPage.saga';
import AddEditAddressSaga from '@tcp/core/src/components/features/account/AddEditAddress/container/AddEditAddress.saga';
import AddressBookSaga from '@tcp/core/src/components/features/account/AddressBook/container/AddressBook.saga';
import PaymentSaga from '@tcp/core/src/components/features/account/Payment/container/Payment.saga';
import DefaultPaymentSaga from '@tcp/core/src/components/features/account/Payment/container/DefaultPayment.saga';
import DeleteAddressSaga from '@tcp/core/src/components/features/account/AddressBook/container/DeleteAddress.saga';
import { SetDefaultShippingAddressSaga } from '@tcp/core/src/components/features/account/AddressBook/container/DefaultShippingAddress.saga';
import AddressVerificationSaga from '@tcp/core/src/components/features/account/AddressVerification/container/AddressVerification.saga';
import BootstrapSaga from '@tcp/core/src/reduxStore/sagas/bootstrap';
import HomePageSaga from '../../components/features/content/HomePage/container/HomePage.saga';
import EmailSignupSaga from '../../components/common/molecules/EmailSignupModal/container/EmailSignupModal.saga';
import SmsSignupSaga from '../../components/common/molecules/SmsSignupModal/container/SmsSignupModal.saga';

export default function* rootSaga() {
  yield all([
    BootstrapSaga(),
    HomePageSaga(),
    ProductListingPageSaga(),
    LoginPageSaga(),
    AddEditAddressSaga(),
    AddressBookSaga(),
    DeleteAddressSaga(),
    SetDefaultShippingAddressSaga(),
    AddressVerificationSaga(),
    PaymentSaga(),
    EmailSignupSaga(),
    SmsSignupSaga(),
    DefaultPaymentSaga(),
  ]);
}
