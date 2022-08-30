import React from 'react';
import { string, shape } from 'prop-types';
import { BodyCopy, Image } from '../../../atoms';
import {
  ImageWrapper,
  VenmoBannerContainer,
  VenmoBannerTextContainer,
} from '../styles/VenmoBanner.style.native';

const venmoIconBlue = require('../../../../../assets/venmo_logo_blue.png');

const VenmoBanner = ({ labels }) => {
  const { venmoBannerText, venmoIconAltText } = labels;
  return (
    <VenmoBannerContainer>
      <ImageWrapper>
        <Image source={venmoIconBlue} alt={venmoIconAltText} width="80px" height="15px" />
      </ImageWrapper>
      <VenmoBannerTextContainer>
        <BodyCopy
          color="gray.900"
          fontFamily="secondary"
          fontSize="fs14"
          textAlign="center"
          text={venmoBannerText}
        />
      </VenmoBannerTextContainer>
    </VenmoBannerContainer>
  );
};

VenmoBanner.propTypes = {
  labels: shape({
    venmoBannerText: string,
    venmoIconAltText: string,
  }),
};

VenmoBanner.defaultProps = {
  labels: {
    venmoBannerText: '',
    venmoIconAltText: '',
  },
};

export default VenmoBanner;
