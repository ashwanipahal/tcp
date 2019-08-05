import AddressBook from '../AddressBook/container/AddressBook.container';
import AccountOverviewContainer from '../AccountOverview/container/AccountOverview.container';
import AddEditAddress from '../AddEditAddress/container/AddEditAddress.container';
import Payment from '../Payment/container/Payment.container';
import AddEditCreditCardContainer from '../AddEditCreditCard/container/AddEditCreditCard.container';
import AddGiftCardContainer from '../Payment/AddGiftCard/container/AddGiftCard.container'; //eslint-disable-line
import PlaceRewards from '../PlaceRewards/container/PlaceRewards.container';

const AccountComponentMapping = {
  'address-book': AddressBook,
  'account-overview': AccountOverviewContainer,
  'add-new-address': AddEditAddress,
  'edit-address': AddEditAddress,
  'add-gift-card': AddGiftCardContainer,
  payment: Payment,
  'add-credit-card': AddEditCreditCardContainer,
  'edit-credit-card': AddEditCreditCardContainer,
  'place-rewards': PlaceRewards,
};

export default AccountComponentMapping;
