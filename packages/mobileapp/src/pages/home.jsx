import React from 'react';
import { createStackNavigator, SafeAreaView } from 'react-navigation';
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
import { headerStyle } from '../components/common/molecules/Header/Header.style';

const getNewHeader = (navigation, navTitle) => {
  const title = navTitle || (navigation && navigation.getParam('title'));
  return {
    header: props => (
      <SafeAreaView style={headerStyle} forceInset={{ top: 'always', bottom: 'never' }}>
        <HeaderNew {...props} title={title} />
      </SafeAreaView>
    ),
    headerBackground: 'transparent',
  };
};

const getDefaultHeaderWithSearch = navigation => {
  return {
    header: props => (
      <SafeAreaView style={headerStyle} forceInset={{ top: 'always', bottom: 'never' }}>
        <Header {...props} showSearch navigation={navigation} />
      </SafeAreaView>
    ),
    headerBackground: 'transparent',
  };
};

const getDefaultHeaderForStore = (navigation, navTitle) => {
  const title = navTitle || (navigation && navigation.getParam('title'));
  return {
    header: props => (
      <SafeAreaView style={headerStyle} forceInset={{ top: 'always', bottom: 'never' }}>
        <Header {...props} title={title} navigation={navigation} headertype="store" />
      </SafeAreaView>
    ),
    headerBackground: 'transparent',
  };
};

export const ProductDetailPage = {
  screen: ProductDetail,
  navigationOptions: ({ navigation }) => {
    return getNewHeader(navigation);
  },
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
    ProductDetail: ProductDetailPage,
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
        const title = navigation && navigation.getParam('title');
        const navTitle = (title && `${title.toUpperCase()}`) || '';
        return getDefaultHeaderForStore(navigation, navTitle);
      },
    },
    StoreLanding: {
      screen: StoreLanding,
      path: 'store-landing',
      // eslint-disable-next-line sonarjs/no-identical-functions
      navigationOptions: ({ navigation }) => {
        const title = navigation && navigation.getParam('title');
        const navTitle = (title && `${title.toUpperCase()}`) || '';
        return getDefaultHeaderForStore(navigation, navTitle);
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
      header: props => (
        <SafeAreaView style={headerStyle} forceInset={{ top: 'always', bottom: 'never' }}>
          <Header {...props} />
        </SafeAreaView>
      ),
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
