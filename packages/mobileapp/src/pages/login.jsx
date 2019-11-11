import React from 'react';
import { createStackNavigator } from 'react-navigation';
import { navigateToNestedRoute, resetNavigationStack } from '@tcp/core/src/utils/utils.app';
import ProductDetail from '@tcp/core/src/components/features/browse/ProductDetail';
import walletPage from '../screens/walletPage';
import NavBarIcon from '../components/common/atoms/NavBarIcon';
import Header from '../components/common/molecules/Header';
import HeaderNew from '../components/common/molecules/Header/HeaderNew';

const getNewHeader = navigation => {
  const title = navigation && navigation.getParam('title');
  const showHeader = navigation && navigation.getParam('noHeader');
  return {
    header: props => (!showHeader ? <HeaderNew {...props} title={title} /> : null),
    headerBackground: 'transparent',
  };
};

const Login = createStackNavigator(
  {
    walletPage,
    GiftCardPage: {
      screen: ProductDetail,
      navigationOptions: ({ navigation }) => {
        return getNewHeader(navigation);
      },
    },
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
  tabBarOnPress: ({ navigation }) => {
    resetNavigationStack(navigation);
    navigateToNestedRoute(navigation, 'WalletStack', 'walletPage');
  },
};

export default Login;
