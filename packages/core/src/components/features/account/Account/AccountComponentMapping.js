/* eslint-disable */
import AddressBook from '../AddressBook/container/AddressBook.container';
import AccountOverview from '../AccountOverview/container/AccountOverview.container';
import AddEditAddress from '../AddEditAddress/container/AddEditAddress.container';
import Payment from '../Payment/container/Payment.container';
import { MyPrefrenceContainer } from '../MyPrefrence/container/MyPreference.container';
import AddEditCreditCardContainer from '../AddEditCreditCard/container/AddEditCreditCard.container';
import MailingInformationContainer from '../MyProfile/organism/MailingInformation';
import AddGiftCardContainer from '../Payment/AddGiftCard/container/AddGiftCard.container'; //eslint-disable-line
import PlaceRewards from '../PlaceRewards/container/PlaceRewards.container';
import Wallet from '../Wallet/container/Wallet.container';
import MyProfile from '../MyProfile/container/MyProfile.container';
import ChangePassword from '../ChangePassword';
import AddEditPersonalInformationContainer from '../AddEditPersonalInformation';
import AboutYouInformationContainer from '../AboutYouInformation';
import BirthdaySavingsPage from '../BirthdaySavingsPage';
import PointHistoryPage from '../PointHistory';
import EarnPoints from '../ExtraPoints';
import PointsClaimPage from '../PointsClaim';
import Orders from '../Orders';
import FavoritesContainer from '../../browse/Favorites/container/Favorites.container';

const AccountComponentMapping = {
  'address-book': AddressBook,
  'account-overview': AccountOverview,
  'add-new-address': AddEditAddress,
  'edit-address': AddEditAddress,
  'add-gift-card': AddGiftCardContainer,
  payment: Payment,
  'add-credit-card': AddEditCreditCardContainer,
  'edit-credit-card': AddEditCreditCardContainer,
  'place-rewards': PlaceRewards,
  wallet: Wallet,
  profile: MyProfile,
  'change-password': ChangePassword,
  'edit-personal-info': AddEditPersonalInformationContainer,
  'birthday-savings': BirthdaySavingsPage,
  'edit-mailing-address': MailingInformationContainer,
  'edit-aboutyou-info': AboutYouInformationContainer,
  'my-preference': FavoritesContainer,
  'points-history': PointHistoryPage,
  'extra-points': EarnPoints,
  'points-claim': PointsClaimPage,
  orders: Orders,
  favorites: FavoritesContainer,
};

export default AccountComponentMapping;
