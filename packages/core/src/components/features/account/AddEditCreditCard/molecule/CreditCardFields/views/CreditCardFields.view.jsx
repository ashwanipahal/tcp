import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import { Field } from 'redux-form';
import { Col, Row } from '../../../../../../common/atoms';
import Select from '../../../../../../common/atoms/Select';
import CreditCardNumber from '../../CreditCardNumber';
import styles from '../styles/CreditCardFields.style';

export const CreditCardFields = ({
  labels,
  cardTypeImgUrl,
  isExpirationRequired,
  isPLCCEnabled,
  cardType,
  expMonthOptionsMap,
  expYearOptionsMap,
  className,
}) => (
  <Row fullBleed className={className}>
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
            placeholder={labels.paymentGC.lbl_payment_cardNumber}
            name="cardNumber"
            id="cardNumber"
            component={CreditCardNumber}
            dataLocator="payment-cardtextfield"
            cardTypeImgUrl={cardTypeImgUrl}
            isPLCCEnabled={isPLCCEnabled}
            cardType={cardType}
            className="field"
            enableSuccessCheck={false}
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
            placeholder={labels.paymentGC.lbl_payment_expMonth}
            name="expMonth"
            id="expMonth"
            component={Select}
            dataLocator="payment-expmonthdd"
            options={expMonthOptionsMap}
            className="field"
            enableSuccessCheck={false}
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
            placeholder={labels.paymentGC.lbl_payment_expYear}
            name="expYear"
            id="expYear"
            component={Select}
            dataLocator="payment-expyeardd"
            options={expYearOptionsMap}
            className="field"
            enableSuccessCheck={false}
          />
        </Col>
      </React.Fragment>
    )}
  </Row>
);

CreditCardFields.propTypes = {
  labels: PropTypes.shape({
    lbl_payment_cardNumber: '',
    lbl_payment_expMonth: '',
    lbl_payment_expYear: '',
  }),
  isExpirationRequired: PropTypes.bool,
  cardTypeImgUrl: PropTypes.string,
  isPLCCEnabled: PropTypes.bool,
  cardType: PropTypes.string,
  expMonthOptionsMap: PropTypes.shape([]).isRequired,
  expYearOptionsMap: PropTypes.shape([]).isRequired,
  className: PropTypes.string,
};

CreditCardFields.defaultProps = {
  labels: {},
  isExpirationRequired: true,
  cardTypeImgUrl: '',
  cardType: '',
  isPLCCEnabled: true,
  className: '',
};

export default withStyles(CreditCardFields, styles);
