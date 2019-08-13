import React from 'react';
import { createStackNavigator } from 'react-navigation';
import { Text } from 'react-native';
import NavBarIcon from '../components/common/atoms/NavBarIcon';

const BrandSwitch = () => <Text>Brand Switching happens here</Text>;

const BrandSwitchStack = createStackNavigator({
  BrandSwitch,
});

BrandSwitchStack.navigationOptions = {
  title: 'brand_logo',
  showLabel: false,
  tabBarIcon: props => (
    <NavBarIcon
      iconActive="brand-logo"
      iconInactive="brand-logo"
      {...props}
      style={{
        icon: {
          width: 100,
          height: 71,
        },
      }}
    />
  ),
};

export default BrandSwitchStack;
