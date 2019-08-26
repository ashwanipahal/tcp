import AddressBookMobile from '../AddressBook/container/AddressBook.container';
import PaymentViewContainer from '../Payment/container/Payment.container';
import PlaceRewardsContainer from '../PlaceRewards/container/PlaceRewards.container';
import { AccountOverviewContainer } from '../AccountOverview/container/AccountOverview.container';
import MyProfile from '../MyProfile/container/MyProfile.container';

const AccountComponentNativeMapping = {
  addressBookMobile: AddressBookMobile,
  paymentGiftCardsPageMobile: PaymentViewContainer,
  myPlaceRewardsMobile: PlaceRewardsContainer,
  accountOverview: AccountOverviewContainer,
  profile: MyProfile,
};

export default AccountComponentNativeMapping;
