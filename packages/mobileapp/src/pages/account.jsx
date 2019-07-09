import React from 'react';
import { createStackNavigator } from 'react-navigation';
import { Text } from 'react-native';
import NavBarIcon from '../components/common/atoms/NavBarIcon';

const Account = () => <Text>Accounts Page</Text>;

const AccountStack = createStackNavigator({
  Account,
});

AccountStack.navigationOptions = {
  tabBarLabel: 'account',
  tabBarIcon: () => <NavBarIcon iconActive="user-icon" iconInactive="user-icon" />,
};

export default AccountStack;
