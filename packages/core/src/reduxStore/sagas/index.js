import ProductListingPageSaga from '@tcp/core/src/components/features/browse/ProductListingPage/container/ProductListingPage.saga';
import LoginPageSaga from '@tcp/core/src/components/features/account/LoginPage/container/LoginPage.saga';
import ForgotPasswordSaga from '@tcp/core/src/components/features/account/ForgotPassword/container/ForgotPassword.saga';
import AddressBookSaga from '@tcp/core/src/components/features/account/AddressBook/container/AddressBook.saga';
import DeleteAddressSaga from '@tcp/core/src/components/features/account/AddressBook/container/DeleteAddress.saga';
import { SetDefaultShippingAddressSaga } from '@tcp/core/src/components/features/account/AddressBook/container/DefaultShippingAddress.saga';
import BootstrapSaga from './bootstrap';

export {
  ProductListingPageSaga,
  LoginPageSaga,
  ForgotPasswordSaga,
  AddressBookSaga,
  DeleteAddressSaga,
  SetDefaultShippingAddressSaga,
  BootstrapSaga,
};

export default {
  ProductListingPageSaga,
  LoginPageSaga,
  ForgotPasswordSaga,
  AddressBookSaga,
  DeleteAddressSaga,
  SetDefaultShippingAddressSaga,
  BootstrapSaga,
};
