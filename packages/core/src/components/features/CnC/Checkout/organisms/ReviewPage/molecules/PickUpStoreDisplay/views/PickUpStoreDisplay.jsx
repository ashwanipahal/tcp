import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '../../../../../../../../common/hoc/withStyles';
// import BodyCopy from '../../../../../../../../common/atoms/BodyCopy';
import { getDateInformation } from '../../../../../../../../../utils/badge.util';
import { ORDER_ITEM_TYPE } from '../../../../../../../../../services/abstractors/CnC/CartItemTile';
import { Image } from '../../../../../../../../common/atoms';
import { getIconPath } from '../../../../../../../../../utils';
import styles from '../styles/PickUpStoreDisplay.style';

const pickup = getIconPath('marker-icon');

const PickupStoreDisplay = props => {
  const {
    className,
    store: { bossEndDate, bossStartDate, store, storeItemsCount },
    orderType,
    labels,
  } = props;
  let {
    store: { bopisItems, bossItems },
  } = props;
  const today = getDateInformation('', false);
  const bossDate =
    !!(bossStartDate && bossEndDate) &&
    `${bossStartDate.day}. ${bossStartDate.month}
    ${bossStartDate.date} - ${bossEndDate.day}. ${bossEndDate.month} ${bossEndDate.date}`;
  const bopisDate = `Today, ${today.month} ${today.date}`;
  bossItems = bossItems || storeItemsCount;
  bopisItems = bopisItems || storeItemsCount;

  return (
    <div className={`${className}`}>
      <div className="pickup-store-details">
        <div className="pickup-store-icon">
          <Image src={pickup} className="back-link-image" />
        </div>
        <div className="pickup-store-content">
          <p className="pickup-store-name">{store}</p>
          {/* <p className="pickup-store-address">{storeAddress.addressLine1}</p> */}
          {orderType !== ORDER_ITEM_TYPE.BOSS && (
            <React.Fragment>
              <p className="pickup-store-items">
                {`PICK UP ${bopisItems} `}
                {bopisItems === 1 ? labels.ITEM : labels.ITEMS}
              </p>
              <p className="pickup-store-time">{bopisDate}</p>
            </React.Fragment>
          )}
          {orderType !== ORDER_ITEM_TYPE.BOPIS && (
            <React.Fragment>
              <p className="pickup-store-items">
                {`PICK UP ${bopisItems} `}
                {bossItems === 1 ? labels.ITEM : labels.ITEMS}
              </p>
              <p className="pickup-store-time">{bossDate}</p>
            </React.Fragment>
          )}
        </div>
      </div>
    </div>
  );
};

PickupStoreDisplay.propTypes = {
  className: PropTypes.string,
  labels: PropTypes.shape({}),
  orderType: PropTypes.string.isRequired,
  store: PropTypes.shape({
    bossEndDate: PropTypes.object.isRequired,
    bossStartDate: PropTypes.object.isRequired,
    store: PropTypes.string.isRequired,
    storeItemsCount: PropTypes.number,
    bossItems: PropTypes.number,
    bopisItems: PropTypes.number,
    storeAddress: PropTypes.object,
  }).isRequired,
};

PickupStoreDisplay.defaultProps = {
  className: '',
  labels: {},
};

export default withStyles(PickupStoreDisplay, styles);
