import CreateAccount from '../../account/CreateAccount';
import LoginPage from '../../account/LoginPage';
import AccountDrawer from '../../account/AccountDrawer';
import TrackOrder from '../../account/TrackOrder';

const OverlayModalComponentMapping = {
  login: LoginPage,
  createAccount: CreateAccount,
  accountDrawer: AccountDrawer,
  trackOrder: TrackOrder,
};

export default OverlayModalComponentMapping;
