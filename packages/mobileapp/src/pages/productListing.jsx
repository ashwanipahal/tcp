import React from 'react';
import { createStackNavigator, SafeAreaView } from 'react-navigation';
import ProductListingPage from '@tcp/core/src/components/features/browse/ProductListingPage';
import ProductListing from '@tcp/core/src/components/features/browse/ProductListing';
import OutfitListing from '@tcp/core/src/components/features/browse/OutfitListing';
import OutfitDetail from '@tcp/core/src/components/features/browse/OutfitDetails';

import ProductDetail from '@tcp/core/src/components/features/browse/ProductDetail';
import SearchDetail from '@tcp/core/src/components/features/browse/SearchDetail';
import Confirmation from '@tcp/core/src/components/features/CnC/Confirmation';
import ProductBundleContainer from '@tcp/core/src/components/features/browse/BundleProduct';
import GetCandidGallery from '@tcp/core/src/components/common/molecules/GetCandidGallery/views/GetCandidGallery.native';

import NavBarIcon from '../components/common/atoms/NavBarIcon';
import Header from '../components/common/molecules/Header';
import HeaderNew from '../components/common/molecules/Header/HeaderNew';
import Navigation from '../components/features/content/Navigation';
// import CategoryListing from '@tcp/core/src/components/features/browse/CategoryListing'; // @TODO when clp can link to PLP
import NavMenuLevel2 from '../components/features/content/Navigation/molecules/NavMenuLevel2';
import NavMenuLevel3 from '../components/features/content/Navigation/molecules/NavMenuLevel3';
import ROUTE_NAMES from '../reduxStore/routes';
import { headerStyle } from '../components/common/molecules/Header/Header.style';

const getNewHeader = (navigation, showSearch, navTitle) => {
  const title = navTitle || (navigation && navigation.getParam('title'));
  const capitalizedTitle = title && title.toUpperCase();
  return {
    header: props => (
      <SafeAreaView style={headerStyle} forceInset={{ top: 'always' }}>
        <HeaderNew {...props} title={capitalizedTitle} showSearch={showSearch} />
      </SafeAreaView>
    ),
    headerBackground: 'transparent',
  };
};

const PlpStack = createStackNavigator(
  {
    [ROUTE_NAMES.NAV_MENU_LEVEL_1]: {
      screen: Navigation, // CategoryListing
    },
    OutfitDetail: {
      screen: OutfitDetail,
      navigationOptions: ({ navigation }) => {
        return getNewHeader(navigation);
      },
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
        return getNewHeader(navigation, false);
      },
    },
    [ROUTE_NAMES.PRODUCT_DETAIL_PAGE]: {
      screen: ProductDetail,
      navigationOptions: ({ navigation }) => {
        return getNewHeader(navigation);
      },
    },
    [ROUTE_NAMES.OUTFIT_LISTING]: {
      screen: OutfitListing,
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
    [ROUTE_NAMES.BUNDLE_DETAIL]: {
      screen: ProductBundleContainer,
      navigationOptions: ({ navigation }) => {
        return getNewHeader(navigation, false);
      },
    },
    GetCandidGallery: {
      screen: GetCandidGallery,
      navigationOptions: ({ navigation }) => {
        return getNewHeader(navigation, false);
      },
    },
  },
  {
    defaultNavigationOptions: {
      header: props => (
        <SafeAreaView style={headerStyle} forceInset={{ top: 'always', bottom: 'never' }}>
          <Header {...props} showSearch />
        </SafeAreaView>
      ),
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
