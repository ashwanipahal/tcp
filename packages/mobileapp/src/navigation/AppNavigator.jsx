import {
  createAppContainer,
  createSwitchNavigator,
  createBottomTabNavigator,
} from 'react-navigation';
import NavBar from '../components/common/molecules/NavBar';
import HomeStack from '../pages/home';
import PlpStack from '../pages/plp';
import AccountStack from '../pages/account';
import WalletStack from '../pages/login';
import BrandSwitchStack from '../pages/brandSwitch';

export default createAppContainer(
  createSwitchNavigator({
    // You could add another route here for authentication.
    // Read more at https://reactnavigation.org/docs/en/auth-flow.html
    Main: createBottomTabNavigator(
      {
        HomeStack,
        PlpStack,
        BrandSwitchStack,
        AccountStack,
        WalletStack,
      },
      {
        tabBarComponent: NavBar,
      }
    ),
  })
);
