import React from 'react';
import { createStackNavigator } from 'react-navigation';
import BagPage from '@tcp/core/src/components/features/CnC/BagPage';
import NavBarIcon from '../components/common/atoms/NavBarIcon';
import Header from '../components/common/molecules/Header/BagPageHeader';

const BagStack = createStackNavigator(
  {
    BagPage: {
      screen: BagPage,
    },
  },
  {
    defaultNavigationOptions: {
      header: props => <Header {...props} />,
      headerBackground: 'transparent',
    },
  }
);

BagStack.navigationOptions = {
  headerMode: 'float',
  tabBarLabel: 'home',
  tabBarIcon: props => (
    <NavBarIcon iconActive="home-active" iconInactive="home-inactive" {...props} />
  ),
};

export default BagStack;
