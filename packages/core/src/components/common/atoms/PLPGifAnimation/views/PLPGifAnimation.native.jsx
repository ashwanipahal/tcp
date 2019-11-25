import React from 'react';
import { PropTypes } from 'prop-types';
import { StyledView } from '../styles/PLPGifAnimation.native.style';
import Image from '../../Image';
// import {View} from 'react-native';

const PLPGifAnimation = ({ className, url }) => {
  return (
    <StyledView>
      <Image url={url} />
    </StyledView>
  );
};

PLPGifAnimation.propTypes = {
  url: PropTypes.string,
  className: PropTypes.string,
};

PLPGifAnimation.defaultProps = {
  url: '',
  className: '',
};

export default PLPGifAnimation;
export { PLPGifAnimation as PLPGifAnimationVanilla };
