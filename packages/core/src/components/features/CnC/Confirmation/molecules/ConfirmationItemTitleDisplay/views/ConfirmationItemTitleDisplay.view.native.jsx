import React from 'react';
import PropTypes from 'prop-types';
import CONFIRMATION_CONSTANTS from '../../../Confirmation.constants';
import { getIconPath } from '../../../../../../../utils';
import { Image, BodyCopy } from '../../../../../../common/atoms';
import ReactTooltip from '../../../../../../common/atoms/ReactToolTip';
import Anchor from '../../../../../../common/atoms/Anchor';

const pickupIcon = getIconPath('marker-icon-svg');
const shippingIcon = getIconPath('fast-shipping');

/**
 * @function getAddress
 * @description returns the react tool tip data.
 * // {address.addressLine2 && [address.addressLine2]}
      // {[address.city, ', ', address.state, ' ', address.zipCode]}

      // {labels.today}
      // {todayOpenRange}

      // {labels.tomorrow}
      // {tomorrowOpenRange}

      // {labels.phone}
      // {phoneNumber}
      // labels, todayOpenRange, tomorrowOpenRange, phoneNumber
 */

const getAddress = address => {
  return address ? (
    <BodyCopy
      fontFamily="secondary"
      fontSize="fs14"
      textAlign="center"
      text={address.addressLine1}
    />
  ) : (
    ''
  );
};

/**
 * @function ConfirmationItemTitleDisplay
 * @description renders the order tile component.
 */
const ConfirmationItemTitleDisplay = ({ center, labels }) => {
  if (center) {
    const {
      storeName,
      storeLink,
      address,
      shippingFullname,
      // todayOpenRange,
      // tomorrowOpenRange,
      // phoneNumber,
      orderType,
    } = center;
    let locationStr = '';
    if (shippingFullname) {
      locationStr = (
        <>
          <BodyCopy
            fontSize="fs22"
            fontFamily="secondary"
            fontWeight="semibold"
            textAlign="center"
            component="span"
            text={labels.shippingTo}
          />

          <BodyCopy
            component="span"
            fontWeight="extrabold"
            className="elem-ml-XS"
            text={shippingFullname}
          />
        </>
      );
    } else {
      locationStr = (
        <BodyCopy
          fontSize="fs22"
          fontFamily="secondary"
          fontWeight="semibold"
          textAlign="center"
          component="span"
          text={labels.pickupAt}
        />
      );
    }

    const infoMsg = getAddress(address);
    return (
      <>
        {(orderType === CONFIRMATION_CONSTANTS.ORDER_ITEM_TYPE.BOSS ||
          orderType === CONFIRMATION_CONSTANTS.ORDER_ITEM_TYPE.BOPIS) && (
          <Image src={pickupIcon} alt="Pickup" />
        )}
        {(orderType === CONFIRMATION_CONSTANTS.ORDER_ITEM_TYPE.ECOM || shippingFullname) && (
          <Image src={shippingIcon} alt="Shipping" />
        )}
        <>
          <>
            {locationStr}

            {storeName && storeLink && (
              <>
                <Anchor
                  className="confirmation-fullfillment-store elem-ml-XS"
                  asPath={storeLink.asPath}
                  to={storeLink.to}
                  title={storeName}
                >
                  {storeName}
                </Anchor>
              </>
            )}
          </>
          <>
            {storeName && (
              <ReactTooltip fontFamily="secondary" message={infoMsg} aligned="right">
                <Image height="15" width="15" src={getIconPath('info-icon')} />
              </ReactTooltip>
            )}
          </>
        </>
      </>
    );
  }
  return null;
};

ConfirmationItemTitleDisplay.propTypes = {
  center: PropTypes.shape({}),
  labels: PropTypes.shape({}).isRequired,
};
ConfirmationItemTitleDisplay.defaultProps = {
  center: null,
};

export default ConfirmationItemTitleDisplay;
