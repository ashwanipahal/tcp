import AddressBook from '../AddressBook/container/AddressBook.container';
import AccountOverviewContainer from '../AccountOverview/container/AccountOverview.container';
import AddNewAddress from '../AddressBook/container/AddAddress/AddAddress.container';

const AccountComponentMapping = {
  addressBook: AddressBook,
  accountOverview: AccountOverviewContainer,
  'add-new-address': AddNewAddress
};

export default AccountComponentMapping;
