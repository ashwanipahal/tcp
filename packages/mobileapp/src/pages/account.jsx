import React from 'react';
import { createStackNavigator } from 'react-navigation';
import PointsPage from '@tcp/core/src/components/features/account/PointsClaim';
import PointsHistory from '@tcp/core/src/components/features/account/PointHistory';
import TrackOrderContainer from '@tcp/core/src/components/features/account/TrackOrder';
import LoginSync from '../screens/LoginSync';
import NavBarIcon from '../components/common/atoms/NavBarIcon';
import Account from '../components/features/account/account';
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
