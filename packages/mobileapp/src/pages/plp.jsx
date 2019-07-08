import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import Plp from '../screens/PLPScreen';
import TabBarIcon from '../components/common/atoms/TabBarIcon';

const PlpStack = createStackNavigator({
  Plp,
});

PlpStack.navigationOptions = {
  tabBarLabel: 'PLP',
  // eslint-disable-next-line react/prop-types
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'} />
  ),
};

export default PlpStack;
