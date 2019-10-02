import ProductListingPageSaga from '@tcp/core/src/components/features/browse/ProductListingPage/container/ProductListingPage.saga';
import SearchListingPageSaga from '@tcp/core/src/components/features/browse/SearchDetail/container/SearchDetail.saga';
import LoginPageSaga from '@tcp/core/src/components/features/account/LoginPage/container/LoginPage.saga';
import LogOutPageSaga from '@tcp/core/src/components/features/account/Logout/container/LogOut.saga';
import ForgotPasswordSaga from '@tcp/core/src/components/features/account/ForgotPassword/container/ForgotPassword.saga';
import SocialAccountSaga from '@tcp/core/src/components/common/organisms/SocialAccount/container/Social.saga';
import AddressBookSaga from '@tcp/core/src/components/features/account/AddressBook/container/AddressBook.saga';
import DeleteAddressSaga from '@tcp/core/src/components/features/account/AddressBook/container/DeleteAddress.saga';
import { SetDefaultShippingAddressSaga } from '@tcp/core/src/components/features/account/AddressBook/container/DefaultShippingAddress.saga';
import CartPageSaga from '@tcp/core/src/components/features/CnC/CartItemTile/container/CartItemTile.saga';
import CouponSaga from '@tcp/core/src/components/features/CnC/common/organism/CouponAndPromos/container/Coupon.saga';
import CheckoutSaga from '@tcp/core/src/components/features/CnC/Checkout/container/Checkout.saga';
import GiftCardsSaga from '@tcp/core/src/components/features/CnC/Checkout/organisms/GiftCardsSection/container/GiftCards.saga';
import BagPageSaga from '@tcp/core/src/components/features/CnC/BagPage/container/BagPage.saga';
import BootstrapSaga from './bootstrap';
import LabelsSaga from './labels';
import LayoutSaga from './layout';

export {
  ProductListingPageSaga,
  LoginPageSaga,
  LogOutPageSaga,
  ForgotPasswordSaga,
  CartPageSaga,
  BagPageSaga,
  AddressBookSaga,
  DeleteAddressSaga,
  SetDefaultShippingAddressSaga,
  CouponSaga,
  CheckoutSaga,
  BootstrapSaga,
  LabelsSaga,
  GiftCardsSaga,
  SocialAccountSaga,
  SearchListingPageSaga,
  LayoutSaga,
};

export default {
  ProductListingPageSaga,
  LoginPageSaga,
  LogOutPageSaga,
  ForgotPasswordSaga,
  CartPageSaga,
  BagPageSaga,
  AddressBookSaga,
  DeleteAddressSaga,
  SetDefaultShippingAddressSaga,
  CouponSaga,
  CheckoutSaga,
  BootstrapSaga,
  LabelsSaga,
  GiftCardsSaga,
  SocialAccountSaga,
  SearchListingPageSaga,
  LayoutSaga,
};
