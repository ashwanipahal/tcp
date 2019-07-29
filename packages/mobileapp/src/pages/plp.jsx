import React from 'react';
import productListingPage from '@tcp/core/src/components/features/browse/ProductListingPage';
import { createStackNavigator } from 'react-navigation';
import NavBarIcon from '../components/common/atoms/NavBarIcon';
import Header from '../components/common/molecules/Header';
import NavMenuLevel1 from '../components/features/content/NavMenuLevel1';
import NavMenuLevel2 from '../components/features/content/NavMenuLevel2';
import ProductLanding from '../components/features/browse/ProductLanding';

const PlpStack = createStackNavigator(
  {
    NavMenuLevel1,
    NavMenuLevel2,
    ProductLanding,
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
