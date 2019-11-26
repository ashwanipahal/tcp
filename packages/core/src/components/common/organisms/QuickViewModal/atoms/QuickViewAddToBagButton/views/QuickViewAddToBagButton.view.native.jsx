import React from 'react';
import PropTypes from 'prop-types';
import { QuickViewAddToBagButtonWrapper } from '../styles/QuickViewAddToBagButton.styles.native';
import { Button } from '../../../../../atoms';

export const QuickViewAddToBagButton = ({ buttonLabel, onClickActn, dataLocator }) => {
  return (
    <QuickViewAddToBagButtonWrapper>
      <Button
        margin="16px 0 0 0"
        color="white"
        fill="BLUE"
        buttonVariation="variable-width"
        text={buttonLabel}
        fontSize="fs10"
        fontWeight="extrabold"
        fontFamily="secondary"
        onPress={onClickActn}
        locator={dataLocator || 'SINGLE_QV_ATB'}
        accessibilityLabel={buttonLabel}
      />
    </QuickViewAddToBagButtonWrapper>
  );
};

QuickViewAddToBagButton.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
  onClickActn: PropTypes.func.isRequired,
};

export default QuickViewAddToBagButton;
