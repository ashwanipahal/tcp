import React from 'react';
import { createStackNavigator } from 'react-navigation';
import Home from '../components/features/content/HomePage';
import account from '../components/features/account/account';
import NavBarIcon from '../components/common/atoms/NavBarIcon';
import Header from '../components/common/molecules/Header';

Home.navigationOptions = {
  header: props => <Header {...props} />,
};

account.navigationOptions = {
  header: props => <Header {...props} />,
};

const HomeStack = createStackNavigator({
  Home,
  account,
});

HomeStack.navigationOptions = {
  headerMode: 'float',
  tabBarLabel: 'home',
  tabBarIcon: props => (
    <NavBarIcon iconActive="home-active" iconInactive="home-inactive" {...props} />
  ),
};

export default HomeStack;
