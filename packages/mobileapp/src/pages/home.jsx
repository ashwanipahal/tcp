import React from 'react';
import { createStackNavigator } from 'react-navigation';
import ProductListingPageContainer from '@tcp/core/src/components/features/browse/ProductListingPage';
import LoginPageContainer from '@tcp/core/src/components/features/account/LoginPage';
import GetCandidGallery from '@tcp/core/src/components/common/molecules/GetCandidGallery/views/GetCandidGallery.native';
import StoreLanding from '@tcp/core/src/components/features/storeLocator/StoreLanding/container/StoreLanding.container';
import StoreDetails from '@tcp/core/src/components/features/storeLocator/StoreDetail';
import ProductListing from '@tcp/core/src/components/features/browse/ProductListing';
import ProductDetail from '@tcp/core/src/components/features/browse/ProductDetail';
import OutfitDetail from '@tcp/core/src/components/features/browse/OutfitDetails';
import SearchDetail from '@tcp/core/src/components/features/browse/SearchDetail';

import Home from '../components/features/content/HomePage';
import account from '../components/features/account/account';
import NavBarIcon from '../components/common/atoms/NavBarIcon';
import Header from '../components/common/molecules/Header';
import Navigation from '../components/features/content/Navigation';
import ProductLanding from '../components/features/browse/ProductLanding/ProductLanding';
import HeaderNew from '../components/common/molecules/Header/HeaderNew';

const getNewHeader = (navigation, navTitle) => {
  const title = navTitle || (navigation && navigation.getParam('title'));
  return {
    header: props => <HeaderNew {...props} title={title} />,
    headerBackground: 'transparent',
  };
};

const getDefaultHeaderWithSearch = navigation => {
  return {
    header: props => <Header {...props} showSearch navigation={navigation} />,
    headerBackground: 'transparent',
  };
};

const HomeStack = createStackNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: ({ navigation }) => {
        return getDefaultHeaderWithSearch(navigation);
      },
    },
    account,
    Navigation,
    ProductLanding,
    ProductListingPageContainer,
    LoginPageContainer,
    GetCandidGallery: {
      screen: GetCandidGallery,
      navigationOptions: ({ navigation }) => {
        return getNewHeader(navigation);
      },
    },
    ProductDetail: {
      screen: ProductDetail,
      navigationOptions: ({ navigation }) => {
        return getNewHeader(navigation);
      },
    },
    OutfitDetail: {
      screen: OutfitDetail,
      navigationOptions: ({ navigation }) => {
        return getNewHeader(navigation);
      },
    },
    ProductListing: {
      screen: ProductListing,
      navigationOptions: ({ navigation }) => {
        return getNewHeader(navigation);
      },
    },
    StoreDetails: {
      screen: StoreDetails,
      path: 'store-details/:storeId',
      navigationOptions: ({ navigation }) => {
        return getNewHeader(navigation);
      },
    },
    StoreLanding: {
      screen: StoreLanding,
      path: 'store-landing',
      navigationOptions: ({ navigation }) => {
        return getNewHeader(navigation);
      },
    },
    SearchDetail: {
      screen: SearchDetail,
      navigationOptions: ({ navigation }) => {
        const title = navigation && navigation.getParam('title');
        const navTitle = (title && `"${title.toUpperCase()}"`) || '';
        return getNewHeader(navigation, navTitle);
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

HomeStack.navigationOptions = {
  initialRouteName: 'Home',
  headerMode: 'float',
  tabBarLabel: 'home',
  tabBarIcon: props => (
    <NavBarIcon iconActive="home-active" iconInactive="home-inactive" {...props} />
  ),
};

export default HomeStack;
