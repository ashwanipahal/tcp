import React from 'react';
import { PropTypes } from 'prop-types';
import { StyledView } from '../styles/PLPGifAnimation.native.style';
import { getLocator } from '@tcp/core/src/utils';
import Image from '../../Image';
import {
  CloseIcon,
  CloseIconTouchable,
  CloseContainer,
} from '../../../../../../../mobileapp/src/components/common/molecules/Header/Header.style';

const closeIcon = require('@tcp/core/src/assets/close.png');

const closeIconAction = navigation => {
  if (navigation) {
    navigation.navigate('QRScanner');
  }
};

const PLPGifAnimation = ({ url, navigation }) => {
  return (
    <StyledView>
      <Image url={url} />
      <CloseContainer>
        <CloseIconTouchable onPress={() => closeIconAction(navigation)}>
          <CloseIcon
            source={closeIcon}
            data-locator={getLocator('qrscanner_plp_gif_animation')}
            accessibilityRole="button"
          />
        </CloseIconTouchable>
      </CloseContainer>
    </StyledView>
  );
};

PLPGifAnimation.propTypes = {
  url: PropTypes.string,
};

PLPGifAnimation.defaultProps = {
  url: '',
};

export default PLPGifAnimation;
export { PLPGifAnimation as PLPGifAnimationVanilla };
