import React from 'react';
import { createStackNavigator, SafeAreaView } from 'react-navigation';
import { getNewHeader } from '@tcp/core/src/utils';
import PointsPage from '@tcp/core/src/components/features/account/PointsClaim';
import PointsHistory from '@tcp/core/src/components/features/account/PointHistory';
import ProductDetail from '@tcp/core/src/components/features/browse/ProductDetail';
import TrackOrderContainer from '@tcp/core/src/components/features/account/TrackOrder';
import OrderDetail from '@tcp/core/src/components/features/account/OrderDetails';
import PurchaseGiftsCard from '@tcp/core/src/components/features/account/PurchaseGiftsCard';
import LoginSync from '../screens/LoginSync';
import NavBarIcon from '../components/common/atoms/NavBarIcon';
import Account from '../components/features/account/account';
import Header from '../components/common/molecules/Header';
import ROUTE_NAMES from '../reduxStore/routes';
import { headerStyle } from '../components/common/molecules/Header/Header.style';

const AccountStack = createStackNavigator(
  {
    Account,
    LoginSync,
    PointsClaimPage: {
      screen: PointsPage,
      navigationOptions: ({ navigation }) => {
        return getNewHeader(navigation);
      },
    },
    GiftCardPage: {
      screen: PurchaseGiftsCard,
      navigationOptions: ({ navigation }) => {
        return getNewHeader(navigation);
      },
    },
    PointsHistoryPage: {
      screen: PointsHistory,
      navigationOptions: ({ navigation }) => {
        return getNewHeader(navigation);
      },
    },
    TrackOrder: {
      // eslint-disable-next-line react/prop-types
      screen: ({ navigation }) => {
        const handleToggle = navigation.getParam('handleToggle');
        return <TrackOrderContainer handleToggle={handleToggle} navigation={navigation} />;
      },
      navigationOptions: ({ navigation }) => {
        return getNewHeader(navigation);
      },
    },
    OrderDetailPage: {
      // eslint-disable-next-line react/prop-types
      screen: ({ navigation }) => {
        const router = navigation.getParam('router');
        return <OrderDetail navigation={navigation} router={router} />;
      },
      navigationOptions: ({ navigation }) => {
        return getNewHeader(navigation);
      },
    },
    [ROUTE_NAMES.PRODUCT_DETAIL_PAGE]: {
      screen: ProductDetail,
      navigationOptions: ({ navigation }) => {
        return getNewHeader(navigation);
      },
    },
  },
  {
    defaultNavigationOptions: {
      header: props => (
        <SafeAreaView style={headerStyle} forceInset={{ top: 'always' }}>
          <Header {...props} />
        </SafeAreaView>
      ),
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
