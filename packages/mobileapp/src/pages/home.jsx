import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import Home from '../components/features/content/HomePage';
import TabBarIcon from '../components/common/atoms/TabBarIcon';

const HomeStack = createStackNavigator({
  Home,
});

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  // eslint-disable-next-line react/prop-types
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  ),
};

export default HomeStack;
