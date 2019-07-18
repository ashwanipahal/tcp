import React from 'react';
import { createStackNavigator } from 'react-navigation';
import { Text } from 'react-native';
import NavBarIcon from '../components/common/atoms/NavBarIcon';

const Plp = () => <Text>PLP Page</Text>;

const ProductList = Props => {
  const { navigation: props } = Props;
  const { getParam } = props;
  const productName = getParam('product');
  return (
    <React.Fragment>
      <Text>
        Product List Page
        {productName}
      </Text>
    </React.Fragment>
  );
};

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
