import AddressBook from '../AddressBook/container/AddressBook.container';
import AddressBookMobile from '../AddressBook/container/AddressBook.container.native';
import AccountOverviewContainer from '../AccountOverview/container/AccountOverview.container';

const AccountComponentMapping = {
  addressBook: AddressBook,
  addressBookMobile: AddressBookMobile,
  accountOverview: AccountOverviewContainer,
};

export default AccountComponentMapping;
