import React from 'react';
import { createStackNavigator } from 'react-navigation';
import walletPage from '../screens/walletPage';
import NavBarIcon from '../components/common/atoms/NavBarIcon';
import Header from '../components/common/molecules/Header';

const Login = createStackNavigator(
  {
    walletPage,
  },
  {
    defaultNavigationOptions: {
      header: props => <Header {...props} />,
      headerBackground: 'transparent',
    },
  }
);

Login.navigationOptions = {
  tabBarLabel: 'wallet',
  // eslint-disable-next-line react/prop-types
  tabBarIcon: props => (
    <NavBarIcon iconActive="wallet-active" iconInactive="wallet-inactive" {...props} />
  ),
};

export default Login;
