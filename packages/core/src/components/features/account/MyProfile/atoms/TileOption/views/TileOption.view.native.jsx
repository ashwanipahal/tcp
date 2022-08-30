import React from 'react';
import PropTypes from 'prop-types';
import BodyCopy from '@tcp/core/src/components/common/atoms/BodyCopy';
import { TileContainer, TextWrapper } from '../styles/TileOption.style.native';

export const TileOption = ({ optionText, optionValue, onSelection, questionId, isSelected }) => {
  return (
    <TileContainer onPress={() => onSelection(optionValue, questionId)} isSelected={isSelected}>
      <TextWrapper>
        <BodyCopy fontSize="fs14" fontWeight="regular" fontFamily="secondary" text={optionText} />
      </TextWrapper>
    </TileContainer>
  );
};

TileOption.propTypes = {
  optionText: PropTypes.string,
  optionValue: PropTypes.string,
  onSelection: PropTypes.func,
  questionId: PropTypes.string.isRequired,
  isSelected: PropTypes.bool,
};

TileOption.defaultProps = {
  optionText: '',
  optionValue: '',
  onSelection: () => {},
  isSelected: false,
};

export default TileOption;
