import React from 'react';
import { createStackNavigator } from 'react-navigation';
import BagPage from '@tcp/core/src/components/features/CnC/BagPage';
import NavBarIcon from '../components/common/atoms/NavBarIcon';
import { ProductDetailPage } from './home';
import Header from '../components/common/molecules/Header/BagPageHeader';

const checkNavigation = nav => {
  return !nav.getParam('headerMode');
};

const BagStack = createStackNavigator(
  {
    BagPage: {
      screen: BagPage,
    },
    BagProductDetail: ProductDetailPage,
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      header: props => (checkNavigation(navigation) === true ? <Header {...props} /> : null),
      headerBackground: 'transparent',
    }),
  }
);

BagStack.navigationOptions = {
  headerMode: 'float',
  tabBarLabel: 'home',
  tabBarIcon: props => (
    <NavBarIcon iconActive="home-active" iconInactive="home-inactive" {...props} />
  ),
  headerVisible: false,
};

export default BagStack;
