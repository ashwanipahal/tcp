import React from 'react';
import { Field } from 'redux-form';
import { Col, Row } from '../../../../../../common/atoms';
import CreditCardNumber from '../../../molecule/CreditCardNumber';

export const CreditCardFields = ({ labels }) => (
  <Row>
    <Col colSize={{
    small: 6,
    medium: 4,
    large: 6
  }}
    >
      <Field
        placeholder={labels.acc_lbl_last_name}
        name="cardNumber"
        id="cardNumber"
        component={CreditCardNumber}
        dataLocator=""
      />
    </Col>
  </Row>
);

CreditCardFields.propTypes = {
  labels: PropTypes.,
}

CreditCardFields.defaultTypes = {
  labels: {},
}

export default CreditCardFields;
