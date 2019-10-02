import React from 'react';
import PropTypes from 'prop-types';
import CONFIRMATION_CONSTANTS from '../../../Confirmation.constants';
import { getIconPath } from '../../../../../../../utils';
import { Image, BodyCopy } from '../../../../../../common/atoms';
import ReactTooltip from '../../../../../../common/atoms/ReactToolTip';
import styles from '../styles/ConfirmationItemTitleDisplay.styles';
import withStyles from '../../../../../../common/hoc/withStyles';
import Anchor from '../../../../../../common/atoms/Anchor';

const pickupIcon = getIconPath('marker-icon-svg');
const shippingIcon = getIconPath('fast-shipping');

/**
 * @function getAddress
 * @description returns the react tool tip data.
 */
const getAddress = (address, labels, todayOpenRange, tomorrowOpenRange, phoneNumber) => {
  return address ? (
    <BodyCopy fontFamily="secondary" fontSize="fs14" textAlign="center">
      {address.addressLine1}
      <br />
      {address.addressLine2 && [address.addressLine2, <br />]}
      {[address.city, ', ', address.state, ' ', address.zipCode]}
      <br />
      <br />
      <em>{labels.today}</em>
      {todayOpenRange}
      <br />
      <em>{labels.tomorrow}</em>
      {tomorrowOpenRange}
      <br />
      <em>{labels.phone}</em>
      {phoneNumber}
    </BodyCopy>
  ) : (
    ''
  );
};

/**
 * @function ConfirmationItemTitleDisplay
 * @description renders the order tile component.
 */
const ConfirmationItemTitleDisplay = ({ center, labels, className }) => {
  if (center) {
    const {
      storeName,
      storeLink,
      address,
      shippingFullname,
      todayOpenRange,
      tomorrowOpenRange,
      phoneNumber,
      orderType,
    } = center;
    let locationStr = '';
    if (shippingFullname) {
      locationStr = (
        <BodyCopy
          fontSize="fs22"
          fontFamily="secondary"
          fontWeight="semibold"
          textAlign="center"
          component="span"
        >
          {labels.shippingTo}
          <BodyCopy component="span" fontWeight="extrabold" className="elem-ml-XS">
            {shippingFullname}
          </BodyCopy>
        </BodyCopy>
      );
    } else {
      locationStr = (
        <BodyCopy
          fontSize="fs22"
          fontFamily="secondary"
          fontWeight="semibold"
          textAlign="center"
          component="span"
        >
          {labels.pickupAt}
        </BodyCopy>
      );
    }

    const infoMsg = getAddress(address, labels, todayOpenRange, tomorrowOpenRange, phoneNumber);
    return (
      <div className={className}>
        {(orderType === CONFIRMATION_CONSTANTS.ORDER_ITEM_TYPE.BOSS ||
          orderType === CONFIRMATION_CONSTANTS.ORDER_ITEM_TYPE.BOPIS) && (
          <Image src={pickupIcon} alt="Pickup" />
        )}
        {(orderType === CONFIRMATION_CONSTANTS.ORDER_ITEM_TYPE.ECOM || shippingFullname) && (
          <Image src={shippingIcon} alt="Shipping" />
        )}
        <div className="confirmation-fullfillment-type">
          <div>
            {locationStr}

            {storeName && storeLink && (
              <span>
                <Anchor
                  className="confirmation-fullfillment-store elem-ml-XS"
                  asPath={storeLink.asPath}
                  to={storeLink.to}
                  title={storeName}
                >
                  {storeName}
                </Anchor>
              </span>
            )}
          </div>
          <div className="confirmation-fullfillment-details">
            {storeName && (
              <ReactTooltip fontFamily="secondary" message={infoMsg} aligned="right">
                <Image height="15" width="15" src={getIconPath('info-icon')} />
              </ReactTooltip>
            )}
          </div>
        </div>
      </div>
    );
  }
  return null;
};

ConfirmationItemTitleDisplay.propTypes = {
  className: PropTypes.string,
  center: PropTypes.shape({}),
  labels: PropTypes.shape({}).isRequired,
};
ConfirmationItemTitleDisplay.defaultProps = {
  className: '',
  center: null,
};

export default withStyles(ConfirmationItemTitleDisplay, styles);
export { ConfirmationItemTitleDisplay as ConfirmationItemTitleDisplayVanilla };
