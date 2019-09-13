import React from 'react';
import { PropTypes } from 'prop-types';
import BodyCopy from '../../../atoms/BodyCopy';
import { PICKUP_CTA_LABELS } from '../PickUpStoreModal.constants';

export const PickupCTA = ({ isBoss, handleClick }) => {
  const title = isBoss ? PICKUP_CTA_LABELS.boss : PICKUP_CTA_LABELS.bops;
  return <BodyCopy onClick={handleClick}>{title}</BodyCopy>;
};

PickupCTA.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isBoss: PropTypes.bool,
};

PickupCTA.defaultProps = {
  isBoss: false,
};

export default PickupCTA;
