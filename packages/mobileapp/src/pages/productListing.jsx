import React from 'react';
import { createStackNavigator } from 'react-navigation';
import ProductListingPage from '@tcp/core/src/components/features/browse/ProductListingPage';
import ProductListing from '@tcp/core/src/components/features/browse/ProductListing';
import ProductDetail from '@tcp/core/src/components/features/browse/ProductDetail';
import SearchDetail from '@tcp/core/src/components/features/browse/SearchDetail';
import Confirmation from '@tcp/core/src/components/features/CnC/Confirmation';

import NavBarIcon from '../components/common/atoms/NavBarIcon';
import Header from '../components/common/molecules/Header';
import HeaderNew from '../components/common/molecules/Header/HeaderNew';
import Navigation from '../components/features/content/Navigation';
import NavMenuLevel2 from '../components/features/content/Navigation/molecules/NavMenuLevel2';
import NavMenuLevel3 from '../components/features/content/Navigation/molecules/NavMenuLevel3';
import ROUTE_NAMES from '../reduxStore/routes';

const getNewHeader = (navigation, showSearch, navTitle) => {
  const title = navTitle || (navigation && navigation.getParam('title'));
  return {
    header: props => <HeaderNew {...props} title={title} showSearch={showSearch} />,
    headerBackground: 'transparent',
  };
};

const PlpStack = createStackNavigator(
  {
    [ROUTE_NAMES.NAV_MENU_LEVEL_1]: {
      screen: Navigation,
    },
    [ROUTE_NAMES.NAV_MENU_LEVEL_2]: {
      screen: NavMenuLevel2,
    },
    [ROUTE_NAMES.NAV_MENU_LEVEL_3]: {
      screen: NavMenuLevel3,
    },
    [ROUTE_NAMES.PRODUCT_LISTING]: {
      screen: ProductListing,
      navigationOptions: ({ navigation }) => {
        return getNewHeader(navigation, true);
      },
    },
    [ROUTE_NAMES.PRODUCT_DETAIL_PAGE]: {
      screen: ProductDetail,
      navigationOptions: ({ navigation }) => {
        return getNewHeader(navigation);
      },
    },
    [ROUTE_NAMES.PRODUCT_LISTING_PAGE]: {
      screen: ProductListingPage,
    },
    [ROUTE_NAMES.SEARCH_RESULTS_PAGE]: {
      screen: SearchDetail,
      navigationOptions: ({ navigation }) => {
        const title = navigation && navigation.getParam('title');
        const navTitle = (title && `"${title.toUpperCase()}"`) || '';
        return getNewHeader(navigation, false, navTitle);
      },
    },
    [ROUTE_NAMES.CONFIRMATION]: {
      screen: Confirmation,
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
