import React from 'react';
import { createStackNavigator } from 'react-navigation';
import { Text } from 'react-native';
import NavBarIcon from '../components/common/atoms/NavBarIcon';

const Plp = () => <Text>PLP Page</Text>;

const PlpStack = createStackNavigator({
  Plp,
});

PlpStack.navigationOptions = {
  tabBarLabel: 'shop',
  tabBarIcon: props => <NavBarIcon iconActive="shop" iconInactive="shop" {...props} />,
};

export default PlpStack;
