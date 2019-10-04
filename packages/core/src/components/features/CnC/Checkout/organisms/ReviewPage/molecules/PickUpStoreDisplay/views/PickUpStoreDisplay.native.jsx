import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import withStyles from '../../../../../../../../common/hoc/withStyles';
import BodyCopy from '../../../../../../../../common/atoms/BodyCopy';
import { ORDER_ITEM_TYPE } from '../../../../../../../../../services/abstractors/CnC/CartItemTile';
import { Image } from '../../../../../../../../common/atoms';
import { getAPIConfig } from '../../../../../../../../../utils';
import { getTranslateDateInformation } from '../../../../../../../../../utils/utils';
import {
  PickupStoreDetails,
  PickupStoreIcon,
  PickupStoreMargin,
} from '../styles/PickUpStoreDisplay.style.native';

const pickupIcon = require('../../../../../../../../../assets/marker-icon.png');

const PickupStoreDisplay = props => {
  const {
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
    `${bossStartDate.day}. ${bossStartDate.month} ${bossStartDate.date} - ${bossEndDate.day}. ${
      bossEndDate.month
    } ${bossEndDate.date}`;
  const bopisDate = `${pickupToday} ${today.month} ${today.date}`;
  bossItems = bossItems || storeItemsCount;
  bopisItems = bopisItems || storeItemsCount;

  const bopisItemDisplay = bopisItems === 1 ? item : items;
  const bossItemDisplay = bossItems === 1 ? item : items;

  return (
    <PickupStoreDetails>
      <PickupStoreIcon>
        <Image source={pickupIcon} height="25px" width="19px" />
      </PickupStoreIcon>
      <View>
        <BodyCopy
          fontSize="fs14"
          dataLocator="pickup-section-store-name"
          color="gray.900"
          mobileFontFamily="secondary"
          fontWeight="semibold"
          text={store}
        />
        <BodyCopy
          fontSize="fs12"
          dataLocator="pickup-section-store-address"
          color="gray.900"
          mobileFontFamily="secondary"
          fontWeight="regular"
          text={addressLine1}
        />
        {orderType !== ORDER_ITEM_TYPE.BOSS && (
          <PickupStoreMargin>
            <BodyCopy
              fontSize="fs14"
              dataLocator="pickup-section-store-bopis-title"
              mobileFontFamily="secondary"
              fontWeight="semibold"
              color="gray.900"
              text={`${title} ${bopisItems} ${bopisItemDisplay}`}
            />

            <BodyCopy
              fontSize="fs12"
              dataLocator="pickup-section-store-bopis-date"
              color="gray.900"
              mobileFontFamily="secondary"
              fontWeight="regular"
              text={bopisDate}
            />
          </PickupStoreMargin>
        )}
        {orderType !== ORDER_ITEM_TYPE.BOPIS && (
          <PickupStoreMargin>
            <BodyCopy
              fontSize="fs14"
              dataLocator="pickup-section-store-boss-title"
              mobileFontFamily="secondary"
              fontWeight="semibold"
              color="gray.900"
              text={`${title} ${bopisItems} ${bossItemDisplay}`}
            />

            <BodyCopy
              fontSize="fs12"
              dataLocator="pickup-section-store-boss-date"
              color="gray.900"
              mobileFontFamily="secondary"
              fontWeight="regular"
              text={bossDate}
            />
          </PickupStoreMargin>
        )}
      </View>
    </PickupStoreDetails>
  );
};

PickupStoreDisplay.propTypes = {
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
  labels: {},
};

export default withStyles(PickupStoreDisplay);
export { PickupStoreDisplay as PickupStoreDisplayanilla };
