import React from 'react';
import { createStackNavigator } from 'react-navigation';
import { Text } from 'react-native';
import NavBarIcon from '../components/common/atoms/NavBarIcon';
import Header from '../components/common/molecules/Header';

const styles = { margin: 10 };
const Plp = () => <Text style={styles}>PLP Page</Text>;

const PlpStack = createStackNavigator(
  {
    Plp,
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
