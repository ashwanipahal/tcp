import React from 'react';
import { createStackNavigator } from 'react-navigation';
import Checkout from '@tcp/core/src/components/features/CnC/Checkout';
import NavBarIcon from '../components/common/atoms/NavBarIcon';
import Header from '../components/common/molecules/Header/CheckoutHeader';

const CheckoutStack = createStackNavigator(
  {
    CheckoutPickup: {
      screen: Checkout,
      params: {
        routeTo: 'PickupPage',
      },
    },
    CheckoutShipping: {
      screen: Checkout,
      params: {
        routeTo: 'ShippingPage',
      },
    },
    CheckoutBilling: {
      screen: Checkout,
      params: {
        routeTo: 'BillingPage',
      },
    },
    CheckoutReview: {
      screen: Checkout,
      params: {
        routeTo: 'ReviewPage',
      },
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
