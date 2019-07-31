import ProductListingPageSaga from '@tcp/core/src/components/features/browse/ProductListingPage/container/ProductListingPage.saga';
import LoginPageSaga from '@tcp/core/src/components/features/account/LoginPage/container/LoginPage.saga';
import AddressBookSaga from '@tcp/core/src/components/features/account/AddressBook/container/AddressBook.saga';
import DeleteAddressSaga from '@tcp/core/src/components/features/account/AddressBook/container/DeleteAddress.saga';
import { SetDefaultShippingAddressSaga } from '@tcp/core/src/components/features/account/AddressBook/container/DefaultShippingAddress.saga';
import CartPageSaga from '@tcp/core/src/components/features/CnC/CartItemTile/container/CartItemTile.saga';
import BootstrapSaga from './bootstrap';

export {
  ProductListingPageSaga,
  LoginPageSaga,
  CartPageSaga,
  AddressBookSaga,
  DeleteAddressSaga,
  SetDefaultShippingAddressSaga,
  BootstrapSaga,
};

export default {
  ProductListingPageSaga,
  LoginPageSaga,
  CartPageSaga,
  AddressBookSaga,
  DeleteAddressSaga,
  SetDefaultShippingAddressSaga,
  BootstrapSaga,
};
