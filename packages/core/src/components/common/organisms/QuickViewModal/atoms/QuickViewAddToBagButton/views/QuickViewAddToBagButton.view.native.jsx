import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '../../../../../atoms';

export const QuickViewAddToBagButton = ({ buttonLabel, onClickActn }) => {
  return (
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
      locator="pdp_color_swatch"
      accessibilityLabel={buttonLabel}
    />
  );
};

QuickViewAddToBagButton.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
  onClickActn: PropTypes.func.isRequired,
};

export default QuickViewAddToBagButton;
