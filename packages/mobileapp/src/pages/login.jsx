import React from 'react';
import { createStackNavigator, SafeAreaView } from 'react-navigation';
import { navigateToNestedRoute } from '@tcp/core/src/utils/utils.app';
import PurchaseGiftsCard from '@tcp/core/src/components/features/account/PurchaseGiftsCard';
import HeaderNew from '../components/common/molecules/Header/HeaderNew';
import walletPage from '../screens/walletPage';
import NavBarIcon from '../components/common/atoms/NavBarIcon';
import Header from '../components/common/molecules/Header';
import { headerStyle } from '../components/common/molecules/Header/Header.style';

const getNewHeader = navigation => {
  const title = navigation && navigation.getParam('title');
  const showHeader = navigation && navigation.getParam('noHeader');
  return {
    header: props =>
      !showHeader ? (
        <SafeAreaView style={headerStyle} forceInset={{ top: 'always', bottom: 'never' }}>
          <HeaderNew {...props} title={title} />
        </SafeAreaView>
      ) : null,
    headerBackground: 'transparent',
  };
};

const Login = createStackNavigator(
  {
    walletPage,
    GiftCardPage: {
      screen: PurchaseGiftsCard,
      navigationOptions: ({ navigation }) => {
        return getNewHeader(navigation);
      },
    },
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
    navigateToNestedRoute(navigation, 'WalletStack', 'walletPage');
  },
};

export default Login;
