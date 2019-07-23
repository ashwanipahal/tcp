import React from 'react';
import { createStackNavigator } from 'react-navigation';
import NavBarIcon from '../components/common/atoms/NavBarIcon';
import Account from '../components/features/account/account';
import Header from '../components/common/molecules/Header';

const AccountStack = createStackNavigator(
  {
    Account,
  },
  {
    defaultNavigationOptions: {
      header: props => <Header {...props} />,
      headerBackground: 'transparent',
    },
  }
);

AccountStack.navigationOptions = {
  tabBarLabel: 'account',
  tabBarIcon: props => (
    <NavBarIcon iconActive="account-active" iconInactive="account-inactive" {...props} />
  ),
};

export default AccountStack;
