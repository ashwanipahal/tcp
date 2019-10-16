import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, BodyCopy } from '@tcp/core/src/components/common/atoms';

/**
 * This function component use for Order Group Header
 * can be passed in the component.
 * @param props - props object used pass params to other component
 */

const OrderGroupHeader = props => {
  const { label, message } = props;
  return (
    <Row>
      <Col className="elem-mb-MED" colSize={{ large: 12, medium: 8, small: 6 }}>
        <BodyCopy component="span" fontSize="fs14" fontFamily="secondary">
          {label}
        </BodyCopy>

        <BodyCopy fontWeight="extrabold" component="span" fontSize="fs14" fontFamily="secondary">
          {message}
        </BodyCopy>
      </Col>
    </Row>
  );
};
OrderGroupHeader.propTypes = {
  label: PropTypes.string,
  message: PropTypes.string,
};

OrderGroupHeader.defaultProps = {
  label: '',
  message: '',
};

export default OrderGroupHeader;
