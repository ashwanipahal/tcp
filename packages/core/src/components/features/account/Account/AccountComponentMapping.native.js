import AddressBookMobile from '../AddressBook/container/AddressBook.container';
import PaymentViewContainer from '../Payment/container/Payment.container';
import PlaceRewardsContainer from '../PlaceRewards/container/PlaceRewards.container';
import AccountOverviewViewContainer from '../AccountOverview/container/AccountOverview.container';
import MyProfile from '../MyProfile/container/MyProfile.container';
import Wallet from '../Wallet/container/Wallet.container';
import ExtraPoints from '../ExtraPoints/container/ExtraPoints.container';
import PointHistoryPage from '../PointHistory';
import { MyPrefrenceContainer } from '../MyPrefrence/container/MyPreference.container';
import PointsClaimPage from '../PointsClaim';
import Orders from '../Orders';
import OrderDetails from '../OrderDetails';

const AccountComponentNativeMapping = {
  addressBookMobile: AddressBookMobile,
  paymentGiftCardsPageMobile: PaymentViewContainer,
  myPlaceRewardsMobile: PlaceRewardsContainer,
  accountOverviewMobile: AccountOverviewViewContainer,
  profileInformationMobile: MyProfile,
  myWalletPageMobile: Wallet,
  earnExtraPointsPageMobile: ExtraPoints,
  pointHistoryPageMobile: PointHistoryPage,
  myPreferencePageMobile: MyPrefrenceContainer,
  PointsClaimPageMobile: PointsClaimPage,
  myOrdersPageMobile: Orders,
  orderDetailsPageMobile: OrderDetails,
};

export default AccountComponentNativeMapping;
