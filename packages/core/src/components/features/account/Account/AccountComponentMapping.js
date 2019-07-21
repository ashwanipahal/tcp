import AddressBook from '../AddressBook/container/AddressBook.container';
import AccountOverviewContainer from '../AccountOverview/container/AccountOverview.container';
import AddEditAddress from '../AddEditAddress/container/AddEditAddress.container';
import Payment from '../Payment/container/Payment.container';
import AddEditCreditCardContainer from '../AddEditCreditCard/container/AddEditCreditCard.container';

const AccountComponentMapping = {
  addressBook: AddressBook,
  accountOverview: AccountOverviewContainer,
  'add-new-address': AddEditAddress,
  'edit-address': AddEditAddress,
  payment: Payment,
  'add-credit-card': AddEditCreditCardContainer,
  'edit-credit-card': AddEditCreditCardContainer,
};

export default AccountComponentMapping;
