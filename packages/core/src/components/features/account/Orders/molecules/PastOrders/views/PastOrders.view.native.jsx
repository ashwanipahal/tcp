import React from 'react';
import PropTypes from 'prop-types';
import { getLabelValue } from '@tcp/core/src/utils/utils';
import BodyCopy from '@tcp/core/src/components/common/atoms/BodyCopy';
import { ViewWithSpacing } from '@tcp/core/src/components/common/atoms/styledWrapper';
import OrdersListItem from '../../OrdersListItem';

const PastOrders = ({ labels, ordersListItems, navigation }) => {
  const pastOrdereList = ordersListItems.slice(1, ordersListItems.length);
  return (
    <>
      <ViewWithSpacing spacingStyles="margin-bottom-MED margin-top-LRG">
        <BodyCopy
          mobileFontFamily="secondary"
          fontSize="fs14"
          fontWeight="semibold"
          data-locator="no_rewards_msg"
          text={getLabelValue(labels, 'lbl_orders_pastOrders', 'orders')}
        />
      </ViewWithSpacing>

      {pastOrdereList &&
        pastOrdereList.map(orderItem => (
          <OrdersListItem
            labels={labels}
            orderItem={orderItem}
            key={orderItem.orderNumber}
            navigation={navigation}
          />
        ))}
    </>
  );
};

PastOrders.propTypes = {
  labels: PropTypes.shape({}).isRequired,
  ordersListItems: PropTypes.shape([]).isRequired,
  navigation: PropTypes.shape({}).isRequired,
};

export default PastOrders;
