import React from 'react';
import PropTypes from 'prop-types';
import { Col, BodyCopy } from '@tcp/core/src/components/common/atoms';

/**
 * This function component use for Order Group Notification
 * can be passed in the component.
 * @param props - props object used pass params to other component
 */

const OrderGroupNotification = props => {
  const { message } = props;
  return (
    <Col className="elem-mb-MED" colSize={{ large: 12, medium: 8, small: 6 }}>
      <BodyCopy fontSize="fs14" fontFamily="secondary">
        {message}
      </BodyCopy>
    </Col>
  );
};
OrderGroupNotification.propTypes = {
  message: PropTypes.string,
};

OrderGroupNotification.defaultProps = {
  message: '',
};

export default OrderGroupNotification;
