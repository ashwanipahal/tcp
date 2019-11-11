import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, SafeAreaView } from 'react-navigation';
import PLPDeltaSync from '../screens/PLPDeltaSyncScreen';
import NavBarIcon from '../components/common/atoms/NavBarIcon';
import Header from '../components/common/molecules/Header';
import { headerStyle } from '../components/common/molecules/Header/Header.style';

const PlpDeltaSyncStack = createStackNavigator(
  {
    PLPDeltaSync,
  },
  {
    defaultNavigationOptions: {
      header: props => (
        <SafeAreaView style={headerStyle} forceInset={{ top: 'always', bottom: 'never' }}>
          <Header {...props} />
        </SafeAreaView>
      ),
      headerBackground: 'transparent',
    },
  }
);

PlpDeltaSyncStack.navigationOptions = {
  tabBarLabel: 'PLP-DeltaSync',
  // eslint-disable-next-line react/prop-types
  tabBarIcon: ({ focused }) => (
    <NavBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'} />
  ),
};

export default PlpDeltaSyncStack;
