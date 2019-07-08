import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import LoginSync from '../screens/LoginSync';
import TabBarIcon from '../components/common/atoms/TabBarIcon';

const Login = createStackNavigator({
  LoginSync,
});

Login.navigationOptions = {
  tabBarLabel: 'Login',
  // eslint-disable-next-line react/prop-types
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'} />
  ),
};

export default Login;
