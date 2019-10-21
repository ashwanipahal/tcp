import React from 'react';
import PropTypes from 'prop-types';
import { BodyCopy, Row, Col } from '@tcp/core/src/components/common/atoms';
import OrderItem from '../../OrderPreviewItem';

/**
 * This function component use for return the Order item list based on group
 * can be passed in the component.
 * @param otherProps - otherProps object used for showing Order Item list
 */
const OrderPreviewItemsList = ({ className, ...otherProps }) => {
  const { items } = otherProps;

  return (
    <BodyCopy component="div" className={className}>
      <Row fullBleed>
        {items.map((item, index) => (
          <Col className="order-Item" colSize={{ large: 6, medium: 4, small: 6 }}>
            <OrderItem key={index.toString()} {...{ item }} {...otherProps} />
          </Col>
        ))}
      </Row>
    </BodyCopy>
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
