import React from 'react';
import { PropTypes } from 'prop-types';
import LabeledRadioButton from '../../../atoms/LabeledRadioButton';
import BodyCopy from '../../../atoms/BodyCopy';

const PickStoreDetails = buttonLabel => {
  return (
    <BodyCopy fontSize="fs14" fontFamily="secondary">
      {buttonLabel}
    </BodyCopy>
  );
};

const PickStoreBOPISExtraDetails = buttonLabel => {
  return (
    <BodyCopy fontSize="fs12" fontFamily="secondary">
      {buttonLabel}
    </BodyCopy>
  );
};

const PickStoreBOSSExtraDetails = buttonLabel => {
  return (
    <BodyCopy>
      <BodyCopy
        as="span"
        fontSize={['fs12', 'fs10']}
        fontFamily="secondary"
        color={['text.primary', 'text.darkgray']}
      >
        {`${buttonLabel} `}
      </BodyCopy>
      <BodyCopy
        as="span"
        fontFamily="secondary"
        fontSize={['fs12', 'fs10']}
        fontWeight={['regular', 'extrabold']}
        color={['text.primary', 'text.darkgray']}
      >
        {buttonLabel}
      </BodyCopy>
    </BodyCopy>
  );
};

export const PickupRadioButton = props => {
  const { buttonLabel, handleClick, isSelected, radioGroupName, className } = props;
  const isBossPickupButton = true;
  return (
    <LabeledRadioButton
      className={className}
      name={radioGroupName}
      onChange={handleClick}
      checked={isSelected}
      disabled={false}
    >
      {PickStoreDetails(buttonLabel)}
      {isBossPickupButton && PickStoreBOSSExtraDetails(buttonLabel)}
      {!isBossPickupButton && PickStoreBOPISExtraDetails(buttonLabel)}
    </LabeledRadioButton>
  );
};

PickupRadioButton.propTypes = {
  handleClick: PropTypes.func.isRequired,
  buttonLabel: PropTypes.string.isRequired,
  radioGroupName: PropTypes.string.isRequired,
  isSelected: PropTypes.bool,
  className: PropTypes.string.isRequired,
};

PickupRadioButton.defaultProps = {
  isSelected: false,
};

export default PickupRadioButton;
