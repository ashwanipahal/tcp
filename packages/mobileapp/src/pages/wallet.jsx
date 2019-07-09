import React from 'react';
import { createStackNavigator } from 'react-navigation';
import { Text } from 'react-native';
import NavBarIcon from '../components/common/atoms/NavBarIcon';

const Wallet = () => <Text>Wallet Page</Text>;

const WalletStack = createStackNavigator({
  Wallet,
});

WalletStack.navigationOptions = {
  tabBarLabel: 'wallet',
  tabBarIcon: props => <NavBarIcon iconActive="wallet" iconInactive="wallet" {...props} />,
};

export default WalletStack;
