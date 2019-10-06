import React from 'react';
import PropTypes from 'prop-types';
import { BodyCopy } from '@tcp/core/src/components/common/atoms';
import constants from '../../../OrderDetails.constants';
import OrderItem from '../../OrderItem';

/**
 * This function component use for return the OrderItemsWithStatus
 * can be passed in the component.
 * @param otherProps - otherProps object used pass params to other component
 */

const OrderItemsWithStatus = ({ className, ...otherProps }) => {
  /**
   * @function return  Used to render the JSX of the component
   * @param    {[Void]} function does not accept anything.
   * @return   {[Object]} JSX of the component
   */

  const { orderGroup } = otherProps;
  const { items, status } = orderGroup;

  const isShowWriteReview =
    status === constants.STATUS_CONSTANTS.ORDER_SHIPPED ||
    status === constants.STATUS_CONSTANTS.PARTIALLY_SHIPPED;

  return (
    <BodyCopy component="div" className={className}>
      {items.map((item, index) => (
        <OrderItem
          key={index.toString()}
          {...{ item, isShowWriteReview, orderGroup }}
          {...otherProps}
        />
      ))}
    </BodyCopy>
  );
};
OrderItemsWithStatus.propTypes = {
  className: PropTypes.string,
  currencySymbol: PropTypes.string.isRequired,
  isBopisOrder: PropTypes.bool.isRequired,
  orderGroup: PropTypes.shape({}).isRequired,
};

OrderItemsWithStatus.defaultProps = {
  className: '',
};

export default OrderItemsWithStatus;