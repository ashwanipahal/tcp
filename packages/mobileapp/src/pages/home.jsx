import React from 'react';
import { createStackNavigator } from 'react-navigation';
import Home from '../components/features/content/HomePage';
import NavBarIcon from '../components/common/atoms/NavBarIcon';

const HomeStack = createStackNavigator({
  Home,
});

HomeStack.navigationOptions = {
  tabBarLabel: 'home',
  tabBarIcon: props => (
    <NavBarIcon iconActive="home-active" iconInactive="home-inactive" {...props} />
  ),
};

export default HomeStack;
