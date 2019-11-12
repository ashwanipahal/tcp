import React from 'react';
import { createStackNavigator, SafeAreaView } from 'react-navigation';
import { navigateToNestedRoute, resetNavigationStack } from '@tcp/core/src/utils/utils.app';
import walletPage from '../screens/walletPage';
import NavBarIcon from '../components/common/atoms/NavBarIcon';
import Header from '../components/common/molecules/Header';
import { headerStyle } from '../components/common/molecules/Header/Header.style';

const Login = createStackNavigator(
  {
    walletPage,
  },
  {
    defaultNavigationOptions: {
      header: props => (
        <SafeAreaView style={headerStyle} forceInset={{ top: 'always', bottom: 'never' }}>
          <Header {...props} />
        </SafeAreaView>
      ),
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
  tabBarOnPress: ({ navigation }) => {
    resetNavigationStack(navigation);
    navigateToNestedRoute(navigation, 'WalletStack', 'walletPage');
  },
};

export default Login;
