import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import PLPDeltaSync from '../screens/PLPDeltaSyncScreen';
import TabBarIcon from '../components/common/atoms/TabBarIcon';

const PlpDeltaSyncStack = createStackNavigator({
  PLPDeltaSync,
});

PlpDeltaSyncStack.navigationOptions = {
  tabBarLabel: 'PLP-DeltaSync',
  // eslint-disable-next-line react/prop-types
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'} />
  ),
};

export default PlpDeltaSyncStack;
