import React from 'react';
import { createStackNavigator } from 'react-navigation';
import { Text } from 'react-native';
import NavBarIcon from '../components/common/atoms/NavBarIcon';
// import AnimatedBrandChangeIcon from '../components/common/atoms/AnimatedBrandChangeIcon/AnimatedBrandChangeIcon';
import AnimatedBrandChangeIcon from '@tcp/core/src/components/common/atoms/AnimatedBrandChangeIcon/AnimatedBrandChangeIcon';

const BrandSwitch = () => <Text>Brand Switching happens here</Text>;

const BrandSwitchStack = createStackNavigator({
  BrandSwitch,
});

BrandSwitchStack.navigationOptions = {
  title: 'brand_logo',
  showLabel: false,
  tabBarIcon: props => (
    <AnimatedBrandChangeIcon>
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
    </AnimatedBrandChangeIcon>
  ),
};

export default BrandSwitchStack;
