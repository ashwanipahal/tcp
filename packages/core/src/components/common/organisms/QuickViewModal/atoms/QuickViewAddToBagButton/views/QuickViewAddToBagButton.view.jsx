import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '../../../../../atoms';

export const QuickViewAddToBagButton = ({ buttonLabel, onClickActn }) => {
  return (
    <div className="add-to-bag-button-wrapper">
      <Button
        className="add-to-bag-button"
        type="submit"
        buttonVariation="fixed-width"
        fill="BLUE"
        onClick={onClickActn}
      >
        {buttonLabel}
      </Button>
    </div>
  );
};

QuickViewAddToBagButton.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
  onClickActn: PropTypes.func.isRequired,
};

export default QuickViewAddToBagButton;
