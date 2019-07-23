import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { Col, Row } from '../../../../../../common/atoms';
import Select from '../../../../../../common/atoms/Select';
import CreditCardNumber from '../../CreditCardNumber';

export const CreditCardFields = ({
  labels,
  cardTypeImgUrl,
  isExpirationRequired,
  isPLCCEnabled,
  cardType,
  expMonthOptionsMap,
  expYearOptionsMap,
}) => (
  <Row fullBleed>
    <Col
      colSize={{
        small: 6,
        medium: 8,
        large: 6,
      }}
    >
      <Row fullBleed>
        <Col
          colSize={{
            small: 6,
            medium: 4,
            large: 12,
          }}
        >
          <Field
            placeholder={labels.ACC_LBL_CARD_NUMBER}
            name="cardNumber"
            id="cardNumber"
            component={CreditCardNumber}
            dataLocator="payment-cardtextfield"
            cardTypeImgUrl={cardTypeImgUrl}
            isPLCCEnabled={isPLCCEnabled}
            cardType={cardType}
          />
        </Col>
      </Row>
    </Col>
    {isExpirationRequired && (
      <React.Fragment>
        <Col
          colSize={{
            small: 6,
            medium: 2,
            large: 3,
          }}
          ignoreGutter={{
            small: true,
          }}
        >
          <Field
            placeholder={labels.ACC_LBL_EXP_MONTH}
            name="expMonth"
            id="expMonth"
            component={Select}
            dataLocator="payment-expmonthdd"
            options={expMonthOptionsMap}
          />
        </Col>
        <Col
          colSize={{
            small: 6,
            medium: 2,
            large: 3,
          }}
        >
          <Field
            placeholder={labels.ACC_LBL_EXP_YEAR}
            name="expYear"
            id="expYear"
            component={Select}
            dataLocator="payment-expyeardd"
            options={expYearOptionsMap}
          />
        </Col>
      </React.Fragment>
    )}
  </Row>
);

CreditCardFields.propTypes = {
  labels: PropTypes.shape({
    ACC_LBL_CARD_NUMBER: '',
    ACC_LBL_EXP_MONTH: '',
    ACC_LBL_EXP_YEAR: '',
  }),
  isExpirationRequired: PropTypes.bool,
  cardTypeImgUrl: PropTypes.string,
  isPLCCEnabled: PropTypes.bool,
  cardType: PropTypes.string,
  expMonthOptionsMap: PropTypes.shape([]).isRequired,
  expYearOptionsMap: PropTypes.shape([]).isRequired,
};

CreditCardFields.defaultProps = {
  labels: {},
  isExpirationRequired: true,
  cardTypeImgUrl: '',
  cardType: '',
  isPLCCEnabled: true,
};

export default CreditCardFields;
