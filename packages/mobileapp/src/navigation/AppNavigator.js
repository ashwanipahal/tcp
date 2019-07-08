import {
  createAppContainer,
  createSwitchNavigator,
  createBottomTabNavigator,
} from 'react-navigation';
import HomeStack from '../pages/home';
import PlpStack from '../pages/plp';
import PlpDeltaSyncStack from '../pages/plpDeltaSync';
import SettingsStack from '../pages/settings';
import Login from '../pages/login';

export default createAppContainer(
  createSwitchNavigator({
    // You could add another route here for authentication.
    // Read more at https://reactnavigation.org/docs/en/auth-flow.html
    Main: createBottomTabNavigator({
      HomeStack,
      PlpStack,
      PlpDeltaSyncStack,
      SettingsStack,
      Login,
    }),
  })
);
