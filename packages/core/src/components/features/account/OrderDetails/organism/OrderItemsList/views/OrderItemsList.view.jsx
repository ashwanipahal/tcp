import React from 'react';
import PropTypes from 'prop-types';
import { BodyCopy, Row, Col } from '@tcp/core/src/components/common/atoms';
import OrderItem from '../../OrderItem';

/**
 * This function component use for return the OrderItemsWithStatus
 * can be passed in the component.
 * @param otherProps - otherProps object used pass params to other component
 */

const OrderItemsList = ({ className, ...otherProps }) => {
  /**
   * @function return  Used to render the JSX of the component
   * @param    {[Void]} function does not accept anything.
   * @return   {[Object]} JSX of the component
   */

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
