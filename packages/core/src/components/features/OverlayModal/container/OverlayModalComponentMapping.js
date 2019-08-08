import CreateAccount from '../../account/CreateAccount';
import LoginPage from '../../account/LoginPage';
import AccountDrawer from '../../account/AccountDrawer';

const OverlayModalComponentMapping = {
  login: LoginPage,
  createAccount: CreateAccount,
  accountDrawer: AccountDrawer,
};

export default OverlayModalComponentMapping;
