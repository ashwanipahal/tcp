import React from 'react';
import PropTypes from 'prop-types';
import OrderPreviewItem from '../../OrderPreviewItem';

/**
 * This function component use for return the Order item list based on group
 * can be passed in the component.
 * @param otherProps - otherProps object used for showing Order Item list
 */
const OrderPreviewItemsList = ({ className, ...otherProps }) => {
  const { items } = otherProps;

  return (
    <>
      {items.map((item, index) => (
        <OrderPreviewItem key={index.toString()} {...{ item }} {...otherProps} />
      ))}
    </>
  );
};
OrderPreviewItemsList.propTypes = {
  className: PropTypes.string,
  items: PropTypes.shape({}).isRequired,
  currencySymbol: PropTypes.string.isRequired,
  isShowWriteReview: PropTypes.bool.isRequired,
  isCanceledList: PropTypes.bool,
};

OrderPreviewItemsList.defaultProps = {
  className: '',
  isCanceledList: false,
};

export default OrderPreviewItemsList;
