import React from 'react';
import { createStackNavigator } from 'react-navigation';
import LoginSync from '../screens/LoginSync';
import NavBarIcon from '../components/common/atoms/NavBarIcon';
import Header from '../components/common/molecules/Header';

const Login = createStackNavigator(
  {
    LoginSync,
  },
  {
    defaultNavigationOptions: {
      header: props => <Header {...props} />,
      headerBackground: 'transparent',
    },
  }
);

// LoginSync.navigationOptions = {
//   header: props => <Header {...props} />,
// };

Login.navigationOptions = {
  tabBarLabel: 'wallet',
  // eslint-disable-next-line react/prop-types
  tabBarIcon: props => (
    <NavBarIcon iconActive="wallet-active" iconInactive="wallet-inactive" {...props} />
  ),
};

export default Login;
