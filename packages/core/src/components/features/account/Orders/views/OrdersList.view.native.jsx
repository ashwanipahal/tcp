import React from 'react';
import PropTypes from 'prop-types';
import { getLabelValue } from '@tcp/core/src/utils/utils';
import { StyledHeading } from '@tcp/core/src/components/common/atoms/styledWrapper';
import LineComp from '@tcp/core/src/components/common/atoms/Line';
import RecentOrders from '../molecules/RecentOrders';
import PastOrders from '../molecules/PastOrders';
import OrderPreviewItemsList from '../molecules/OrderPreviewItemsList';

export const OrdersList = ({
  labels,
  ordersListItems,
  navigation,
  handleComponentChange,
  componentProps,
  orderDetailsData,
}) => {
  return (
    <React.Fragment>
      <StyledHeading>{getLabelValue(labels, 'lbl_orders_heading', 'orders')}</StyledHeading>
      <LineComp marginBottom={28} borderWidth={1} borderColor="black" />
      <RecentOrders
        labels={labels}
        ordersListItems={ordersListItems}
        navigation={navigation}
        handleComponentChange={handleComponentChange}
        componentProps={componentProps}
      />
      {orderDetailsData &&
        orderDetailsData.purchasedItems &&
        orderDetailsData.purchasedItems.length > 0 && (
          <OrderPreviewItemsList
            labels={labels}
            navigation={navigation}
            orderNumber={orderDetailsData.orderNumber}
            items={orderDetailsData.purchasedItems[0].items}
            canceledItems={orderDetailsData.canceledItems}
          />
        )}
      {ordersListItems && ordersListItems.length > 1 ? (
        <PastOrders
          labels={labels}
          ordersListItems={ordersListItems}
          navigation={navigation}
          handleComponentChange={handleComponentChange}
          componentProps={componentProps}
        />
      ) : null}
    </React.Fragment>
  );
};

OrdersList.propTypes = {
  labels: PropTypes.shape({}).isRequired,
  navigation: PropTypes.shape({}).isRequired,
  ordersListItems: PropTypes.shape([]).isRequired,
  handleComponentChange: PropTypes.func,
  componentProps: PropTypes.shape({}),
  orderDetailsData: PropTypes.shape({}),
};
OrdersList.defaultProps = {
  handleComponentChange: () => {},
  componentProps: {},
  orderDetailsData: {},
};

export default OrdersList;
