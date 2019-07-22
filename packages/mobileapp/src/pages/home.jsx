import React from 'react';
import { createStackNavigator } from 'react-navigation';
import Home from '../components/features/content/HomePage';
import account from '../components/features/account/account';
import NavBarIcon from '../components/common/atoms/NavBarIcon';
import Header from '../components/common/molecules/Header';

const HomeStack = createStackNavigator(
  {
    Home,
    account,
  },
  {
    defaultNavigationOptions: {
      header: props => <Header {...props} />,
      headerBackground: 'transparent',
    },
  }
);

HomeStack.navigationOptions = {
  headerMode: 'float',
  tabBarLabel: 'home',
  tabBarIcon: props => (
    <NavBarIcon iconActive="home-active" iconInactive="home-inactive" {...props} />
  ),
};

export default HomeStack;
