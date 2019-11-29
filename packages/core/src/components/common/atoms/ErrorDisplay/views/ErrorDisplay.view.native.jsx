import React from 'react';
import PropTypes from 'prop-types';
import { BodyCopy, Image } from '../..';
import { ErrorContainer, errorIconStyle, TextWrapper } from '../styles/ErrorDisplay.style.native';

const errorIcon = require('../../../../../assets/alert-triangle.png');

const ErrorDisplay = ({ error, margins, isBorder, width, paddings }) => {
  if (!error) return null;
  return (
    <ErrorContainer margins={margins} isBorder={isBorder} width={width} paddings={paddings}>
      <Image source={errorIcon} alt="Error" style={errorIconStyle} />
      <TextWrapper>
        <BodyCopy
          fontWeight="extrabold"
          fontFamily="secondary"
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
  margins: PropTypes.string,
  isBorder: PropTypes.bool,
  width: PropTypes.string,
  paddings: PropTypes.string,
};

ErrorDisplay.defaultProps = {
  margins: '5px 0 0 0',
  isBorder: false,
  width: null,
  paddings: null,
};

export default ErrorDisplay;
