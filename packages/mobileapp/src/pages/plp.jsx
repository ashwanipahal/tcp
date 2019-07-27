import React from 'react';
import { createStackNavigator } from 'react-navigation';
import productListingPage from '@tcp/core/src/components/features/browse/ProductListingPage';
import NavBarIcon from '../components/common/atoms/NavBarIcon';
import Header from '../components/common/molecules/Header';
import NavMenuLevel1 from '../components/features/content/NavMenuLevel1';
import NavMenuLevel2 from '../components/features/content/NavMenuLevel2';
import NavMenuLevel3 from '../components/features/content/NavMenuLevel3';

const PlpStack = createStackNavigator(
  {
    NavMenuLevel1,
    NavMenuLevel2,
    NavMenuLevel3,
    productListingPage,
  },
  {
    defaultNavigationOptions: {
      header: props => <Header {...props} />,
      headerBackground: 'transparent',
    },
  }
);

PlpStack.navigationOptions = {
  tabBarLabel: 'shop',
  tabBarIcon: props => (
    <NavBarIcon iconActive="shop-active" iconInactive="shop-inactive" {...props} />
  ),
};

export default PlpStack;
