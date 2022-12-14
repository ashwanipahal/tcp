import {
  createAppContainer,
  createStackNavigator,
  createSwitchNavigator,
  createBottomTabNavigator,
} from 'react-navigation';
import ApplyNowWrapper from '@tcp/core/src/components/common/molecules/ApplyNowPLCCModal';

import NavBar from '../components/common/molecules/NavBar';
import HomeStack from '../pages/home';
import PlpStack from '../pages/productListing';
import AccountStack from '../pages/account';
import WalletStack from '../pages/login';
import BrandSwitchStack from '../pages/brandSwitch';
import CheckoutStack from '../pages/checkout';
import BagStack from '../pages/bag';
import QRScanner from '../components/common/molecules/QRScanner';
import NoInternetStack from '../pages/noInternet';

const TabNavigator = createBottomTabNavigator(
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
);

const RootStack = createStackNavigator(
  {
    Home: {
      screen: TabNavigator,
    },
    Bag: {
      screen: BagStack,
    },
    Checkout: {
      screen: CheckoutStack,
    },
    ApplyNow: {
      screen: ApplyNowWrapper,
    },
    QRScanner: {
      screen: QRScanner,
    },
  },
  {
    mode: 'modal',
    headerMode: 'none',
  }
);

export const NoInternetNavigator = createAppContainer(
  createSwitchNavigator({
    NoInternet: {
      screen: NoInternetStack,
    },
  })
);

export default createAppContainer(
  createSwitchNavigator({
    Main: {
      screen: RootStack,
    },
  })
);
