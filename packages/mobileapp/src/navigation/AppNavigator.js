import {
  createAppContainer,
  createSwitchNavigator,
  createBottomTabNavigator,
} from 'react-navigation';
import HomeStack from '../pages/home';
import PlpStack from '../pages/plp';
import SettingsStack from '../pages/settings';
import Login from '../pages/login';
import AccountStack from '../pages/account';

export default createAppContainer(
  createSwitchNavigator({
    // You could add another route here for authentication.
    // Read more at https://reactnavigation.org/docs/en/auth-flow.html
    Main: createBottomTabNavigator({
      HomeStack,
      PlpStack,
      AccountStack,
      SettingsStack,
      Login,
    }),
  })
);
