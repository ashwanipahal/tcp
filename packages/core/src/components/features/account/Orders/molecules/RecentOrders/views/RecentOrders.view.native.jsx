import React from 'react';
import PropTypes from 'prop-types';
import { getLabelValue } from '@tcp/core/src/utils/utils';
import BodyCopy from '@tcp/core/src/components/common/atoms/BodyCopy';
import { ViewWithSpacing } from '@tcp/core/src/components/common/atoms/styledWrapper';
import Button from '@tcp/core/src/components/common/atoms/Button';
import { UrlHandler } from '@tcp/core/src/utils/utils.app';
import OrdersListItem from '../../OrdersListItem';
import EmptyOrdersList from '../../EmptyOrdersList';
import constants from '../../../../OrderDetails/OrderDetails.constants';

/**
 * This component will render RecentOrders component
 * @param { string, object, object }
 */
export const RecentOrders = ({
  ordersListItems,
  labels,
  navigation,
  handleComponentChange,
  componentProps,
}) => {
  return (
    <>
      <ViewWithSpacing spacingStyles="margin-bottom-MED">
        <BodyCopy
          mobileFontFamily="secondary"
          fontSize="fs14"
          fontWeight="semibold"
          data-locator="no_rewards_msg"
          className="elem-mb-LRG"
          dataLocator="recent-order_heading"
          fontFamily="secondary"
          text={getLabelValue(labels, 'lbl_orders_recentOrder', 'orders')}
        />
      </ViewWithSpacing>
      {ordersListItems && ordersListItems.length ? (
        <>
          <OrdersListItem
            labels={labels}
            orderItem={ordersListItems[0]}
            navigation={navigation}
            handleComponentChange={handleComponentChange}
            componentProps={componentProps}
          />
          {ordersListItems[0].orderTrackingUrl &&
            ordersListItems[0].orderTrackingUrl !== constants.STATUS_CONSTANTS.NA && (
              <Button
                buttonVariation="fixed-width"
                fill="BLUE"
                color="white"
                onPress={() => UrlHandler(ordersListItems[0].orderTrackingUrl)}
                data-locator="orders-shop-now-btn"
                text={getLabelValue(labels, 'lbl_orders_trackit', 'orders')}
              />
            )}
        </>
      ) : (
        <EmptyOrdersList labels={labels} navigation={navigation} />
      )}
    </>
  );
};

RecentOrders.propTypes = {
  labels: PropTypes.shape({}).isRequired,
  ordersListItems: PropTypes.shape([]).isRequired,
  navigation: PropTypes.shape({}).isRequired,
  handleComponentChange: PropTypes.func,
  componentProps: PropTypes.shape({}),
};

RecentOrders.defaultProps = {
  handleComponentChange: () => {},
  componentProps: {},
};

export default RecentOrders;
