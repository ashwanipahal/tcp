import React from 'react';
import { PropTypes } from 'prop-types';
import { View, Text } from 'react-native';

// Dummy placeholder component for navigation L2
// This will be replaced with the L2 navigation data with the L2 story
const NavigationMenu = props => {
  const {
    navigation: { getParam },
  } = props;
  const l1NavKey = getParam('navigationKey');

  return (
    <View>
      <Text>{l1NavKey}</Text>
    </View>
  );
};

NavigationMenu.propTypes = {
  navigation: PropTypes.shape({
    getParam: PropTypes.func.isRequired,
  }).isRequired,
};

export default NavigationMenu;
