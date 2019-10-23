import React from 'react';
import PropTypes from 'prop-types';
import { getLabelValue } from '@tcp/core/src/utils/utils';
import { StyledHeading } from '@tcp/core/src/components/common/atoms/styledWrapper';
import BodyCopy from '@tcp/core/src/components/common/atoms/BodyCopy';
import UnderlineStyle from '../styles/OrdersList.style.native';
import RecentOrders from '../molecules/RecentOrders';
import PastOrders from '../molecules/PastOrders';
import OrderPreviewItemsList from '../molecules/OrderPreviewItemsList';

export const OrdersList = ({
  labels,
  ordersListItems,
  navigation,
  handleComponentChange,
  componentProps,
  orderItems,
}) => {
  return (
    <React.Fragment>
      <StyledHeading>
        <BodyCopy
          fontSize="fs16"
          fontWeight="extrabold"
          text={getLabelValue(labels, 'lbl_orders_heading', 'orders')}
        />
      </StyledHeading>
      <UnderlineStyle />
      <RecentOrders
        labels={labels}
        ordersListItems={ordersListItems}
        navigation={navigation}
        handleComponentChange={handleComponentChange}
        componentProps={componentProps}
      />
      {orderItems && orderItems.length > 0 && (
        <OrderPreviewItemsList
          labels={labels}
          navigation={navigation}
          items={orderItems[0]}
          orderNumber={ordersListItems[0].orderNumber}
        />
      )}
      {ordersListItems && ordersListItems.length ? (
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
  orderItems: PropTypes.shape([]).isRequired,
};
OrdersList.defaultProps = {
  handleComponentChange: () => {},
  componentProps: {},
};

export default OrdersList;
