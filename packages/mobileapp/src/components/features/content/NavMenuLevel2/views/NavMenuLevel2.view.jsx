import React from 'react';
import { PropTypes } from 'prop-types';
import { Text, TouchableOpacity } from 'react-native';

// Dummy placeholder component for navigation L2
// This will be replaced with the L2 navigation data with the L2 story
const NavigationMenu = props => {
  const {
    navigation: { getParam },
  } = props;
  const l1NavKey = getParam('navigationKey');
  const ShowProductListingPage = () => {
    const {
      navigation: { navigate },
    } = props;

    navigate('productListingPage');
  };

  return (
    <TouchableOpacity accessibilityRole="button" onPress={() => ShowProductListingPage()}>
      <Text>{l1NavKey}</Text>
    </TouchableOpacity>
  );
};

NavigationMenu.propTypes = {
  navigation: PropTypes.shape({
    getParam: PropTypes.func.isRequired,
  }).isRequired,
};

export default NavigationMenu;
