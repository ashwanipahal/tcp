import React from 'react';
import ConfirmationItemTitleDisplay from '../../../molecules/ConfirmationItemTitleDisplay';
import ConfirmationOrderNumberDisplay from '../../../molecules/ConfirmationOrderNumberDisplay';

/**
 * @function ConfirmationFulfillmentCenterItemDisplay
 * @description renders the fullfillment center item.
 */
const ConfirmationFulfillmentCenterItemDisplay = ({
  isGuest,
  index,
  center,
  labels,
  className,
}) => {
  return (
    center && (
      <div className={className}>
        {/* Display title outside container as a common title, when the pickup store is same for BOPIS/BOSS */}
        {center.isSamePickUpStore && index === 0 && (
          <ConfirmationItemTitleDisplay center={center} labels={labels} />
        )}
        <div className="confirmation-item-wrapper">
          {!center.isSamePickUpStore && (
            <ConfirmationItemTitleDisplay center={center} labels={labels} />
          )}
          <ConfirmationOrderNumberDisplay center={center} isGuest={isGuest} labels={labels} />
        </div>
      </div>
    )
  );
};

export default ConfirmationFulfillmentCenterItemDisplay;
