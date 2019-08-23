import React from 'react';
import { createStackNavigator } from 'react-navigation';
import ProductListingPage from '@tcp/core/src/components/features/browse/ProductListingPage';
import ProductListing from '@tcp/core/src/components/features/browse/ProductListing';
import NavBarIcon from '../components/common/atoms/NavBarIcon';
import Header from '../components/common/molecules/Header';
import Navigation from '../components/features/content/Navigation';
import NavMenuLevel2 from '../components/features/content/Navigation/molecules/NavMenuLevel2';
import NavMenuLevel3 from '../components/features/content/Navigation/molecules/NavMenuLevel3';

const PlpStack = createStackNavigator(
  {
    Navigation,
    NavMenuLevel2,
    NavMenuLevel3,
    ProductListing,
    ProductListingPage,
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
