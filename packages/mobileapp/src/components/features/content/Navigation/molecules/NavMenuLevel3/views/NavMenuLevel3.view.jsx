import React from 'react';
import { PropTypes } from 'prop-types';
import { Text } from 'react-native';
import { BodyCopy } from '@tcp/core/src/components/common/atoms';
import { ArrowBackIcon, HeadingView, TouchableOpacityArrow } from '../NavMenuLevel3.style';

const BackIcon = require('../../../../../../../../../core/src/assets/carrot-large-left.png');

const NavigationMenu = props => {
  const {
    navigation: { goBack },
  } = props;

  const navigateBack = () => {
    return goBack();
  };

  return (
    <HeadingView>
      <TouchableOpacityArrow accessibilityRole="button" onPress={() => navigateBack()}>
        <ArrowBackIcon source={BackIcon} />
      </TouchableOpacityArrow>
      <BodyCopy
        fontFamily="secondary"
        fontSize="fs16"
        textAlign="center"
        text="L3"
        color="text.primary"
        // eslint-disable-next-line react-native/no-inline-styles
        style={{ textTransform: 'uppercase' }}
      />
      <Text />
    </HeadingView>
  );
};

NavigationMenu.propTypes = {
  navigation: PropTypes.shape({
    getParam: PropTypes.func.isRequired,
  }).isRequired,
};

export default NavigationMenu;
