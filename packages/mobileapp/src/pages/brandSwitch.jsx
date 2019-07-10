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
        wrapper: {
          borderLeftWidth: 1,
          borderRightWidth: 1,
          borderTopWidth: 1,
          borderColor: '#d8d8d8',
          width: 100,
          height: 42,
          borderTopLeftRadius: 75,
          borderTopRightRadius: 75,
          backgroundColor: 'white',
        },
        icon: {
          width: 67,
          height: 24,
          position: 'relative',
          top: 25,
          left: 15,
        },
      }}
    />
  ),
};

export default BrandSwitchStack;
