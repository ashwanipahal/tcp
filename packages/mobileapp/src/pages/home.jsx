/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { createStackNavigator } from 'react-navigation';
import Home from '../components/features/content/HomePage';
import NavBarIcon from '../components/common/atoms/NavBarIcon';

const HomeStack = createStackNavigator({
  Home,
});

HomeStack.navigationOptions = {
  tabBarLabel: 'home',
  tabBarIcon: props => <NavBarIcon iconActive="shop" iconInactive="shop" {...props} />,
};

export default HomeStack;
