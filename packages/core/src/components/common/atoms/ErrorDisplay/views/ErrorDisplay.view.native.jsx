import React from 'react';
import PropTypes from 'prop-types';
import { BodyCopy, Image } from '../..';
import { ErrorContainer, errorIconStyle, TextWrapper } from '../styles/ErrorDisplay.style.native';

const errorIcon = require('../../../../../assets/alert-triangle.png');

const ErrorDisplay = ({ error }) => {
  if (!error) return null;
  return (
    <ErrorContainer>
      <Image source={errorIcon} style={errorIconStyle} />
      <TextWrapper>
        <BodyCopy
          fontWeight="extrabold"
          mobileFontFamily="secondary"
          fontSize="fs10"
          text={error}
          color="error"
        />
      </TextWrapper>
    </ErrorContainer>
  );
};

ErrorDisplay.propTypes = {
  error: PropTypes.string.isRequired,
};

export default ErrorDisplay;
