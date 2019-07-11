import React from 'react';
import { createStackNavigator } from 'react-navigation';
import { Text } from 'react-native';
import NavBarIcon from '../components/common/atoms/NavBarIcon';
import AnimatedBrandChangeIcon from '../components/features/AnimatedBrandChangeIcon/AnimatedBrandChangeIcon';

const BrandSwitch = () => <Text>Brand Switching happens here</Text>;

const BrandSwitchStack = createStackNavigator({
  BrandSwitch,
});

BrandSwitchStack.navigationOptions = {
  title: 'brand_logo',
  showLabel: false,
  tabBarIcon: (
    <NavBarIcon
      brandChangeAnimator
      animatedComponent={<AnimatedBrandChangeIcon />}
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
