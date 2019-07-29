import React from 'react';
import { PropTypes } from 'prop-types';
import { Text } from 'react-native';
import { BodyCopy } from '@tcp/core/src/components/common/atoms';
import { ArrowBackIcon, HeadingView, TouchableOpacityArrow } from '../NavMenuLevel3.style';

const BackIcon = require('../../../../../../../../../core/src/assets/carrot-large-left.png');

/**
 * The Navigation menu level3 is created by this component
 * @param {object} props Props passed from Stack navigator screen and the parent L1
 */
const NavMenuLevel3 = props => {
  const {
    navigation: { goBack },
  } = props;

  return (
    <HeadingView>
      <TouchableOpacityArrow accessibilityRole="button" onPress={() => goBack()}>
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

NavMenuLevel3.propTypes = {
  navigation: PropTypes.shape({
    getParam: PropTypes.func.isRequired,
  }).isRequired,
};

export default NavMenuLevel3;
