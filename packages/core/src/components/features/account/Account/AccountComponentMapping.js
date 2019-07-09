import AddressBook from '../AddressBook/container/AddressBook.container';
import AccountOverviewContainer from '../AccountOverview/container/AccountOverview.container';
import Payment from '../Payment/container/Payment.container';

const AccountComponentMapping = {
  addressBook: AddressBook,
  accountOverview: AccountOverviewContainer,
  payment: Payment,
};

export default AccountComponentMapping;
