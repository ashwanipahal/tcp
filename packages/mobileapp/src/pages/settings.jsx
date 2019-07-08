import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import SettingsScreen from '../screens/SettingsScreen';
import TabBarIcon from '../components/common/atoms/TabBarIcon';

const Settings = createStackNavigator({
  Settings: SettingsScreen,
});

Settings.navigationOptions = {
  tabBarLabel: 'Settings',
  // eslint-disable-next-line react/prop-types
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'} />
  ),
};

export default Settings;
