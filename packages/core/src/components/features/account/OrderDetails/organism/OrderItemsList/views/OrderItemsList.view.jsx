import React from 'react';
import PropTypes from 'prop-types';
import { BodyCopy, Row, Col } from '@tcp/core/src/components/common/atoms';
import OrderItem from '../../OrderItem';

const OrderItemsList = ({ className, ...otherProps }) => {
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
