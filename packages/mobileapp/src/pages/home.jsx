import React from 'react';
import { createStackNavigator } from 'react-navigation';
import ProductListingPageContainer from '@tcp/core/src/components/features/browse/ProductListingPage';
import BagPage from '@tcp/core/src/components/features/CnC/BagPage';
import LoginPageContainer from '@tcp/core/src/components/features/account/LoginPage';
import Home from '../components/features/content/HomePage';
import account from '../components/features/account/account';
import NavBarIcon from '../components/common/atoms/NavBarIcon';
import Header from '../components/common/molecules/Header';
import Navigation from '../components/features/content/Navigation';
import ProductLanding from '../components/features/browse/ProductLanding/ProductLanding';
// import CheckoutStack from './checkout';

const HomeStack = createStackNavigator(
  {
    Home,
    account,
    Navigation,
    ProductLanding,
    ProductListingPageContainer,
    BagPage,
    LoginPageContainer,
  },
  {
    defaultNavigationOptions: {
      header: props => <Header {...props} />,
      headerBackground: 'transparent',
    },
  }
);

HomeStack.navigationOptions = {
  initialRouteName: 'Home',
  headerMode: 'float',
  tabBarLabel: 'home',
  tabBarIcon: props => (
    <NavBarIcon iconActive="home-active" iconInactive="home-inactive" {...props} />
  ),
};

export default HomeStack;
