import AddressBook from '../AddressBook/container/AddressBook.container';
import AddressBookMobile from '../AddressBook/container/AddressBook.container.native';
import AccountOverviewContainer from '../AccountOverview/container/AccountOverview.container';
import AddNewAddress from '../AddressBook/container/AddAddress/AddAddress.container';
import Payment from '../Payment/container/Payment.container';

const AccountComponentMapping = {
  addressBook: AddressBook,
  addressBookMobile: AddressBookMobile,
  accountOverview: AccountOverviewContainer,
  'add-new-address': AddNewAddress,
  payment: Payment,
};

export default AccountComponentMapping;
