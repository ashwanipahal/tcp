import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '../../../../../../../../common/hoc/withStyles';
import BodyCopy from '../../../../../../../../common/atoms/BodyCopy';
import { ORDER_ITEM_TYPE } from '../../../../../../../../../services/abstractors/CnC/CartItemTile';
import { Image } from '../../../../../../../../common/atoms';
import {
  getIconPath,
  getAPIConfig,
  getTranslateDateInformation,
} from '../../../../../../../../../utils';
import styles from '../styles/PickUpStoreDisplay.style';

const pickup = getIconPath('marker-icon');

const PickupStoreDisplay = props => {
  const {
    className,
    store: { bossEndDate, bossStartDate, store, storeItemsCount, storeAddress },
    orderType,
    labels,
  } = props;
  const { addressLine1 } = storeAddress;
  let {
    store: { bopisItems, bossItems },
  } = props;
  const apiConfig = getAPIConfig();
  const {
    lbl_review_sectionPickupToday: pickupToday,
    lbl_review_sectionPickupOrderTitle: title,
    lbl_review_sectionPickupItem: item,
    lbl_review_sectionPickupItems: items,
  } = labels;
  const today = getTranslateDateInformation('', apiConfig.language);
  const bossDate =
    !!(bossStartDate && bossEndDate) &&
    `${bossStartDate.day}. ${bossStartDate.month}
    ${bossStartDate.date} - ${bossEndDate.day}. ${bossEndDate.month} ${bossEndDate.date}`;
  const bopisDate = `${pickupToday} ${today.month} ${today.date}`;
  bossItems = bossItems || storeItemsCount;
  bopisItems = bopisItems || storeItemsCount;

  return (
    <div className={`${className}`}>
      <div className="pickup-store-details">
        <div className="pickup-store-icon">
          <Image src={pickup} className="back-link-image" />
        </div>
        <div className="pickup-store-content">
          <BodyCopy
            fontSize="fs14"
            dataLocator=""
            color="gray.900"
            fontFamily="secondary"
            fontWeight="extrabold"
          >
            {store}
          </BodyCopy>
          <BodyCopy
            fontSize="fs12"
            dataLocator=""
            color="gray.900"
            fontFamily="secondary"
            fontWeight="regular"
          >
            {addressLine1}
          </BodyCopy>
          {orderType !== ORDER_ITEM_TYPE.BOSS && (
            <div className="pickup-store-margin">
              <BodyCopy
                fontSize="fs14"
                dataLocator=""
                fontFamily="secondary"
                fontWeight="extrabold"
                color="gray.900"
              >
                {`${title} ${bopisItems} `}
                {bopisItems === 1 ? item : items}
              </BodyCopy>
              <BodyCopy
                fontSize="fs12"
                dataLocator=""
                color="gray.900"
                fontFamily="secondary"
                fontWeight="regular"
              >
                {bopisDate}
              </BodyCopy>
            </div>
          )}
          {orderType !== ORDER_ITEM_TYPE.BOPIS && (
            <div className="pickup-store-margin">
              <BodyCopy
                fontSize="fs14"
                dataLocator=""
                fontFamily="secondary"
                fontWeight="extrabold"
                color="gray.900"
              >
                {`${title} ${bopisItems} `}
                {bossItems === 1 ? item : items}
              </BodyCopy>
              <BodyCopy
                fontSize="fs12"
                dataLocator=""
                color="gray.900"
                fontFamily="secondary"
                fontWeight="regular"
              >
                {bossDate}
              </BodyCopy>
            </div>
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
export { PickupStoreDisplay as PickupStoreDisplayanilla };
