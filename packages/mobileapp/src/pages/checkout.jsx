import React from 'react';
import { createStackNavigator } from 'react-navigation';
import Checkout from '@tcp/core/src/components/features/CnC/Checkout';
import NavBarIcon from '../components/common/atoms/NavBarIcon';
import Header from '../components/common/molecules/Header/CheckoutHeader';

const CheckoutStack = createStackNavigator(
  {
    CheckoutPickup: {
      screen: Checkout,
    },
    CheckoutShipping: {
      screen: Checkout,
    },
    CheckoutBilling: {
      screen: Checkout,
    },
    CheckoutReview: {
      screen: Checkout,
    },
  },
  {
    defaultNavigationOptions: {
      header: props => <Header {...props} />,
      headerBackground: 'transparent',
    },
  }
);

CheckoutStack.navigationOptions = {
  headerMode: 'float',
  tabBarLabel: 'home',
  tabBarIcon: props => (
    <NavBarIcon iconActive="home-active" iconInactive="home-inactive" {...props} />
  ),
};

export default CheckoutStack;
