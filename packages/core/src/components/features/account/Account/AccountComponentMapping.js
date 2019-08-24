import AddressBook from '../AddressBook/container/AddressBook.container';
import AccountOverview from '../AccountOverview/container/AccountOverview.container';
import AddEditAddress from '../AddEditAddress/container/AddEditAddress.container';
import Payment from '../Payment/container/Payment.container';
import AddEditCreditCardContainer from '../AddEditCreditCard/container/AddEditCreditCard.container';
import AddGiftCardContainer from '../Payment/AddGiftCard/container/AddGiftCard.container'; //eslint-disable-line
import PlaceRewards from '../PlaceRewards/container/PlaceRewards.container';
import WalletContainer from '../Wallet/container/Wallet.container';
import MyProfile from '../MyProfile/container/MyProfile.container';
import ChangePassword from '../ChangePassword';
import AddEditPersonalInformationContainer from '../AddEditPersonalInformation';

const AccountComponentMapping = {
  'address-book': AddressBook,
  'account-overview': AccountOverview,
  'add-new-address': AddEditAddress,
  'edit-address': AddEditAddress,
  'add-gift-card': AddGiftCardContainer,
  payment: Payment,
  'add-credit-card': AddEditCreditCardContainer,
  'edit-credit-card': AddEditCreditCardContainer,
  'place-rewards': PlaceRewards,
  wallet: WalletContainer,
  profile: MyProfile,
  'change-password': ChangePassword,
  'edit-personal-info': AddEditPersonalInformationContainer,
};

export default AccountComponentMapping;
