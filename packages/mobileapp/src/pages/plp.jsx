import React from 'react';
import { createStackNavigator } from 'react-navigation';
import NavBarIcon from '../components/common/atoms/NavBarIcon';
import Header from '../components/common/molecules/Header';
import Plp from '../screens/PLPScreen';

const PlpStack = createStackNavigator(
  {
    Plp,
  },
  {
    defaultNavigationOptions: {
      header: props => <Header {...props} />,
      headerBackground: 'transparent',
    },
  }
);

PlpStack.navigationOptions = {
  tabBarLabel: 'shop',
  tabBarIcon: props => (
    <NavBarIcon iconActive="shop-active" iconInactive="shop-inactive" {...props} />
  ),
};

export default PlpStack;
