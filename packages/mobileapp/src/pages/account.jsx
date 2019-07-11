import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import Account from '../components/features/account/account';
import TabBarIcon from '../components/common/atoms/TabBarIcon';

const AccountStack = createStackNavigator({
  Account,
});

AccountStack.navigationOptions = {
  tabBarLabel: 'Account',
  // eslint-disable-next-line react/prop-types
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  ),
};

export default AccountStack;
