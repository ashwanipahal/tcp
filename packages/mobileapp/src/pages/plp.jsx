import React from 'react';
import { Text } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import NavBarIcon from '../components/common/atoms/NavBarIcon';
import Header from '../components/common/molecules/Header';
import ProductLanding from '../components/features/browse/ProductLanding';

const styles = { margin: 10 };
const Plp = () => <Text style={styles}>PLP Page</Text>;

const PlpStack = createStackNavigator(
  {
    Plp,
    ProductLanding,
  },
  {
    defaultNavigationOptions: {
      header: props => <Header {...props} />,
      headerBackground: 'transparent',
    },
  }
);

PlpStack.navigationOptions = {
  tabBarLabel: 'shop',
  tabBarIcon: props => (
    <NavBarIcon iconActive="shop-active" iconInactive="shop-inactive" {...props} />
  ),
};

export default PlpStack;
