import React from 'react';
import PropTypes from 'prop-types';
import { Button, BodyCopy } from '../../../../../atoms';

export const QuickViewAddToBagButton = ({
  buttonLabel,
  onClickActn,
  quickViewLabels,
  showAddProductValidation,
}) => {
  return (
    <>
      <div className="add-to-bag-button-wrapper">
        {showAddProductValidation && (
          <BodyCopy
            fontSize="fs12"
            component="div"
            fontFamily="secondary"
            fontWeight="bold"
            color="error"
            textAlign="center"
          >
            {quickViewLabels.noProductSelected}
          </BodyCopy>
        )}
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
    </>
  );
};

QuickViewAddToBagButton.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
  onClickActn: PropTypes.func.isRequired,
  quickViewLabels: PropTypes.string.isRequired,
  showAddProductValidation: PropTypes.bool.isRequired,
};

export default QuickViewAddToBagButton;
