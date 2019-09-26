import React from 'react';
import { createStackNavigator } from 'react-navigation';
import { View, Text } from 'react-native';
import ProductListingPageContainer from '@tcp/core/src/components/features/browse/ProductListingPage';
import BagPage from '@tcp/core/src/components/features/CnC/BagPage';
import LoginPageContainer from '@tcp/core/src/components/features/account/LoginPage';
import GetCandidGallery from '@tcp/core/src/components/common/molecules/GetCandidGallery/views/GetCandidGallery.native';
import ProductListingPage from '@tcp/core/src/components/features/browse/ProductListing';
import StoreLanding from '@tcp/core/src/components/features/storeLocator/StoreLanding/container/StoreLanding.container';
import Home from '../components/features/content/HomePage';
import account from '../components/features/account/account';
import NavBarIcon from '../components/common/atoms/NavBarIcon';
import Header from '../components/common/molecules/Header';
import Navigation from '../components/features/content/Navigation';
import ProductLanding from '../components/features/browse/ProductLanding/ProductLanding';
import HeaderNew from '../components/common/molecules/Header/HeaderNew';

const getNewHeader = navigation => {
  const title = navigation && navigation.getParam('title');
  return {
    header: props => <HeaderNew {...props} title={title} />,
    headerBackground: 'transparent',
  };
};

const HomeStack = createStackNavigator(
  {
    Home,
    account,
    Navigation,
    ProductLanding,
    ProductListingPageContainer,
    BagPage,
    LoginPageContainer,
    GetCandidGallery: {
      screen: GetCandidGallery,
      navigationOptions: ({ navigation }) => {
        return getNewHeader(navigation);
      },
    },
    ProductListingPage,
    StoreDetails: {
      screen: () => (
        <View>
          <Text>Store Details</Text>
        </View>
      ),
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
