import AddressBook from '../AddressBook/container/AddressBook.container';
import AccountOverviewContainer from '../AccountOverview/container/AccountOverview.container';
import AddNewAddress from '../AddressBook/container/AddAddress/AddAddress.container';
import EditAddress from '../AddressBook/container/EditAddress/EditAddress.container';
import Payment from '../Payment/container/Payment.container';

const AccountComponentMapping = {
  addressBook: AddressBook,
  accountOverview: AccountOverviewContainer,
  'add-new-address': AddNewAddress,
  'edit-address': EditAddress,
  payment: Payment,
};

export default AccountComponentMapping;
