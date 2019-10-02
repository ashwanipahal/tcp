import React from 'react';
import PropTypes from 'prop-types';
import { setTestId, getLocator } from '@tcp/core/src/utils';
import withStyles from '../../../hoc/withStyles.native';
import {
  PromotionalMessageContainer,
  PromotionalText,
  PromotionalMessagePostfix,
} from '../styles/PromotionalMessage.style.native';

export const getFormattedLoyaltyText = text => {
  return text
    .replace(/<[^>]*>/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .split('on');
};

const PromotionalMessage = ({ text, isPlcc, height, marginTop, dataLocator, fontSize }) => {
  return (
    <PromotionalMessageContainer
      height={height}
      marginTop={marginTop}
      {...setTestId(getLocator(dataLocator))}
      accessibilityRole="text"
      accessibilityLabel={text}
    >
      <PromotionalText
        isPlcc={isPlcc}
        accessibilityRole="text"
        numberOfLines={2}
        fontSize={fontSize}
      >
        {text && getFormattedLoyaltyText(text)[0]}
        {text && (
          <PromotionalMessagePostfix fontSize={fontSize}>
            {` on${getFormattedLoyaltyText(text)[1]}`}
          </PromotionalMessagePostfix>
        )}
      </PromotionalText>
    </PromotionalMessageContainer>
  );
};

PromotionalMessage.propTypes = {
  text: PropTypes.string.isRequired,
  isPlcc: PropTypes.bool,
  height: PropTypes.string,
  marginTop: PropTypes.number,
  dataLocator: PropTypes.string,
  fontSize: PropTypes.string,
};

PromotionalMessage.defaultProps = {
  isPlcc: false,
  height: null,
  marginTop: null,
  dataLocator: '',
  fontSize: null,
};

export default withStyles(PromotionalMessage);
export { PromotionalMessage as PromotionalMessageVanilla };
