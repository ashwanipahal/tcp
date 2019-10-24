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
    defaultNavigationOptions: ({ navigation }) => ({
      header: props => (checkNavigation(navigation) === true ? <Header {...props} /> : null),
      headerBackground: 'transparent',
    }),
  }
);

BagStack.navigationOptions = {
  headerMode: 'float',
  tabBarLabel: 'home',
  tabBarIcon: props => (
    <NavBarIcon iconActive="home-active" iconInactive="home-inactive" {...props} />
  ),
  headerVisible: false,
};

const checkNavigation = nav => {
  return !nav.getParam('headerMode');
};

export default BagStack;
