import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import BAGPAGE_SELECTORS from '../../../../../../BagPage/container/BagPage.selectors';
import { getLabelsCartItemTile } from '../../../../../../CartItemTile/container/CartItemTile.selectors';
import CheckoutCartItemsList from '../views/CheckoutCartItemsList.view';

/**
 * @function categorizingItemsForStores
 * @summary This function categorizes items for stores
 */
const categorizingItemsForStores = ({
  currentStore,
  currentStoreAddress,
  item,
  orderType,
  bossStartDate,
  bossEndDate,
  bopisDate,
  bucket,
  deliveryType,
  bucketReference,
  CheckoutConstants,
  currencySymbol,
  labels,
}) => {
  const bucketReferenceTemp = bucketReference;
  const {
    storePhoneNumber,
    storeTodayOpenRange,
    storeTomorrowOpenRange,
    orderItemType,
  } = item.miscInfo;
  const orderItem = {
    store: currentStore,
    storeAddress: currentStoreAddress,
    storePhoneNumber: storePhoneNumber || '',
    storeTodayOpenRange: storeTodayOpenRange || '',
    storeTomorrowOpenRange: storeTomorrowOpenRange || '',
    orderType,
    duration:
      orderItemType === CheckoutConstants.ORDER_ITEM_TYPE.BOSS
        ? `${bossStartDate.day}. ${bossStartDate.month} ${bossStartDate.date} - ${
            bossEndDate.day
          }. ${bossEndDate.month} ${bossEndDate.date}`
        : `${labels.today}, ${bopisDate.month} ${bopisDate.date}`,
  };
  if (bucket[deliveryType]) {
    bucketReferenceTemp[deliveryType][currentStore] = bucket[deliveryType][currentStore] || {};
    const bucketStore = bucket[deliveryType][currentStore];
    bucketStore[orderType] = bucketStore[orderType] || orderItem;
    bucketStore[orderType].list = bucketStore[orderType].list || [];
    bucketStore[orderType].list.push({ item, currencySymbol });
  } else {
    bucketReferenceTemp[deliveryType] = {};
    bucketReferenceTemp[deliveryType][currentStore] = {};
    const bucketStore = bucketReferenceTemp[deliveryType][currentStore];

    bucketStore[orderType] = orderItem;
    bucketStore[orderType].list = [];
    bucketStore[orderType].list.push({ item, currencySymbol });
  }
};

const gettingSortedItemList = ({
  sortedItem,
  CheckoutConstants,
  currencySymbol,
  bopisDate,
  labels,
}) => {
  if (sortedItem) {
    return sortedItem.reduce((bucket, item) => {
      const orderType = item.miscInfo.orderItemType;
      const currentStore = item.miscInfo.store || CheckoutConstants.CHECKOUT_ORDER.ECOM_NO_STORE;
      const currentStoreAddress = item.miscInfo.storeAddress || '';
      const { bossStartDate, bossEndDate } = item.miscInfo;
      const bucketReference = bucket;
      const {
        CHECKOUT_ORDER: {
          ORDER_BOPIS_LABEL,
          ORDER_BOSS_LABEL,
          ORDER_PICKUP_LABEL,
          ORDER_SHIPIT_LABEL,
        },
      } = CheckoutConstants;
      const deliveryType =
        orderType === ORDER_BOPIS_LABEL || orderType === ORDER_BOSS_LABEL
          ? ORDER_PICKUP_LABEL
          : ORDER_SHIPIT_LABEL;

      if (deliveryType === ORDER_SHIPIT_LABEL) {
        bucketReference[deliveryType] = bucket[deliveryType] || {};
        bucketReference[deliveryType].list = bucket[deliveryType].list || [];
        bucket[deliveryType].list.push({ item, currencySymbol });
      } else {
        categorizingItemsForStores({
          currentStore,
          currentStoreAddress,
          item,
          orderType,
          bossStartDate,
          bossEndDate,
          bopisDate,
          bucket,
          deliveryType,
          bucketReference,
          labels,
          currencySymbol,
          CheckoutConstants,
        });
      }
      return bucket;
    }, {});
  }
  return {};
};

/**
 *
 *
 * @param {*} {
 *   itemsCount,
 *   items,
 *   currencySymbol,
 *   labels,
 *   bagPageLabels,
 * }
 * @returns
 */
export const CheckoutCartItemList = ({
  itemsCount,
  items,
  currencySymbol,
  labels,
  bagPageLabels,
}) => {
  return (
    <CheckoutCartItemsList
      itemsCount={itemsCount}
      items={items}
      currencySymbol={currencySymbol}
      labels={labels}
      bagPageLabels={bagPageLabels}
      gettingSortedItemList={gettingSortedItemList}
    />
  );
};

const mapStateToProps = state => {
  return {
    itemsCount: BAGPAGE_SELECTORS.getTotalItems(state),
    items: BAGPAGE_SELECTORS.getOrderItems(state),
    currencySymbol: BAGPAGE_SELECTORS.getCurrentCurrency(state) || '$',
    labels: getLabelsCartItemTile(state),
    bagPageLabels: BAGPAGE_SELECTORS.getBagPageLabels(state),
  };
};

CheckoutCartItemList.propTypes = {
  itemsCount: PropTypes.number.isRequired,
  items: PropTypes.shape({}).isRequired,
  currencySymbol: PropTypes.string.isRequired,
  labels: PropTypes.shape({}),
  bagPageLabels: PropTypes.shape({}),
};

CheckoutCartItemList.defaultProps = {
  labels: {},
  bagPageLabels: {},
};

export default connect(mapStateToProps)(CheckoutCartItemList);
