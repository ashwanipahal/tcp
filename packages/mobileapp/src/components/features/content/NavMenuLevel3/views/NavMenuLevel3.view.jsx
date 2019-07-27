import React from 'react';
import { PropTypes } from 'prop-types';
import { Text, TouchableOpacity, Image } from 'react-native';

const BackIcon = require('../../../../../../../core/src/assets/carrot-large-left.png');

const NavigationMenu = props => {
  const {
    navigation: { goBack },
  } = props;

  const navigateBack = () => {
    return goBack();
  };

  return (
    <TouchableOpacity accessibilityRole="button" onPress={() => navigateBack()}>
      <Image source={BackIcon} />
      <Text>L3</Text>
    </TouchableOpacity>
  );
};

NavigationMenu.propTypes = {
  navigation: PropTypes.shape({
    getParam: PropTypes.func.isRequired,
  }).isRequired,
};

export default NavigationMenu;
