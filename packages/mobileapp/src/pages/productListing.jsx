import React from 'react';
import { View, Text } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import ProductListingPage from '@tcp/core/src/components/features/browse/ProductListingPage';
import ProductListing from '@tcp/core/src/components/features/browse/ProductListing';
import NavBarIcon from '../components/common/atoms/NavBarIcon';
import Header from '../components/common/molecules/Header';
import HeaderNew from '../components/common/molecules/Header/HeaderNew';
import Navigation from '../components/features/content/Navigation';
import NavMenuLevel2 from '../components/features/content/Navigation/molecules/NavMenuLevel2';
import NavMenuLevel3 from '../components/features/content/Navigation/molecules/NavMenuLevel3';
import ROUTE_NAMES from '../reduxStore/routes/routes.constants';

const PlpStack = createStackNavigator(
  {
    [ROUTE_NAMES.NAV_MENU_LEVEL_1]: {
      screen: Navigation,
    },
    [ROUTE_NAMES.NAV_MENU_LEVEL_2]: {
      screen: NavMenuLevel2,
    },
    [ROUTE_NAMES.NavMenuLevel3]: {
      screen: NavMenuLevel3,
    },
    [ROUTE_NAMES.PRODUCT_LISTING]: {
      screen: ProductListing,
      navigationOptions: ({ navigation }) => {
        const l2Title = navigation && navigation.getParam('l2Title');
        return {
          header: props => <HeaderNew {...props} title={l2Title} />,
        };
      },
    },
    [ROUTE_NAMES.PRODUCT_LISTING_PAGE]: {
      screen: ProductListingPage,
    },
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
