import React from 'react';
import { createStackNavigator } from 'react-navigation';
import NavBarIcon from '../components/common/atoms/NavBarIcon';
import Header from '../components/common/molecules/Header';
import NavMenuLevel1 from '../components/features/content/NavMenuLevel1';
import NavMenuLevel2 from '../components/features/content/NavMenuLevel2';

const PlpStack = createStackNavigator(
  {
    NavMenuLevel1,
    NavMenuLevel2,
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
