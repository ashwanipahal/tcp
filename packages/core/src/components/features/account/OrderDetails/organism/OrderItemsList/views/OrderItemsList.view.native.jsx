import React from 'react';
import PropTypes from 'prop-types';
import LineComp from '@tcp/core/src/components/common/atoms/Line';
import OrderItem from '../../OrderItem';

/**
 * This function component use for return the Order item list based on group
 * can be passed in the component.
 * @param otherProps - otherProps object used for showing Order Item list
 */
const OrderItemsList = ({ className, ...otherProps }) => {
  const { items } = otherProps;

  return (
    <>
      {items.map((item, index) => (
        <OrderItem key={index.toString()} {...{ item }} {...otherProps} />
      ))}
      <LineComp marginTop={32} borderWidth={0.5} borderColor="gray.1600" />
    </>
  );
};
OrderItemsList.propTypes = {
  className: PropTypes.string,
  items: PropTypes.shape({}).isRequired,
  currencySymbol: PropTypes.string.isRequired,
  isShowWriteReview: PropTypes.bool.isRequired,
  isCanceledList: PropTypes.bool,
};

OrderItemsList.defaultProps = {
  className: '',
  isCanceledList: false,
};

export default OrderItemsList;
