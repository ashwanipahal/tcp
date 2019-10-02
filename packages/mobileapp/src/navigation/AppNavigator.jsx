import {
  createAppContainer,
  createStackNavigator,
  createSwitchNavigator,
  createBottomTabNavigator,
} from 'react-navigation';
import React from 'react';
import NavBar from '../components/common/molecules/NavBar';
import HomeStack from '../pages/home';
import PlpStack from '../pages/productListing';
import AccountStack from '../pages/account';
import WalletStack from '../pages/login';
import BrandSwitchStack from '../pages/brandSwitch';
import Header from '../components/common/molecules/Header';
import CheckoutStack from '../pages/checkout';
import BagStack from '../pages/bag';

const TabNavigator = createBottomTabNavigator(
  {
    HomeStack,
    PlpStack,
    BrandSwitchStack,
    AccountStack,
    WalletStack,
  },
  {
    header: props => <Header {...props} />,
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
  },
  {
    mode: 'modal',
    headerMode: 'none',
  }
);

export default createAppContainer(
  createSwitchNavigator({
    // You could add another route here for authentication.
    // Read more at https://reactnavigation.org/docs/en/auth-flow.html
    Main: {
      screen: RootStack,
    },
  })
);
