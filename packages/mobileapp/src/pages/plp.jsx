import React from 'react';
import { createStackNavigator } from 'react-navigation';
import { Text } from 'react-native';
import NavBarIcon from '../components/common/atoms/NavBarIcon';

const Plp = () => <Text>PLP Page</Text>;

const ProductList = props => <Text>Product List Page {props.product} </Text>;

const PlpStack = createStackNavigator({
  Plp,
  ProductList: { screen: props => <ProductList {...props} /> },
});

PlpStack.navigationOptions = {
  tabBarLabel: 'shop',
  tabBarIcon: props => (
    <NavBarIcon iconActive="shop-active" iconInactive="shop-inactive" {...props} />
  ),
};

export default PlpStack;
