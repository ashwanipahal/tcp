import React from 'react';
import { createStackNavigator } from 'react-navigation';
import checkout from '@tcp/core/src/components/features/CnC/Checkout';
import pickupPage from '@tcp/core/src/components/features/CnC/Checkout/organisms/PickupPage';
import shippingPage from '@tcp/core/src/components/features/CnC/Checkout/organisms/ShippingPage';
import NavBarIcon from '../components/common/atoms/NavBarIcon';
import Header from '../components/common/molecules/Header/CheckoutHeader';

const CheckoutStack = createStackNavigator(
  {
    checkout,
    pickupPage,
    shippingPage,
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
