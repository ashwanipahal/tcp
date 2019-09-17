import AddressBookMobile from '../AddressBook/container/AddressBook.container';
import PaymentViewContainer from '../Payment/container/Payment.container';
import PlaceRewardsContainer from '../PlaceRewards/container/PlaceRewards.container';
import AccountOverviewViewContainer from '../AccountOverview/container/AccountOverview.container';
import MyProfile from '../MyProfile/container/MyProfile.container';
import Wallet from '../Wallet/container/Wallet.container';
import PointHistoryPage from '../PointHistory';

const AccountComponentNativeMapping = {
  addressBookMobile: AddressBookMobile,
  paymentGiftCardsPageMobile: PaymentViewContainer,
  myPlaceRewardsMobile: PlaceRewardsContainer,
  accountOverview: AccountOverviewViewContainer,
  profile: MyProfile,
  myWalletPageMobile: Wallet,
  pointHistoryPageMobile: PointHistoryPage,
};

export default AccountComponentNativeMapping;
