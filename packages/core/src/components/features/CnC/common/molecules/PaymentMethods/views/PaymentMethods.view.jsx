import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import LabeledRadioButton from '../../../../../../common/atoms/LabeledRadioButton';
import Row from '../../../../../../common/atoms/Row';
import Col from '../../../../../../common/atoms/Col';
import BodyCopy from '../../../../../../common/atoms/BodyCopy';
import styles from '../styles/PaymentMethods.style';
import withStyles from '../../../../../../common/hoc/withStyles';
import { getIconPath } from '../../../../../../../utils';

const PaymentMethods = ({ className, paymentHeader, isMobile, labels }) => {
  return (
    <>
      <BodyCopy
        fontFamily="secondary"
        fontSize="fs16"
        fontWeight="extrabold"
        className="elem-mb-XXS"
      >
        {paymentHeader}
      </BodyCopy>
      <Row fullBleed className={className}>
        <Col
          colSize={{ small: 2, medium: 4, large: 6 }}
          className="radio-method payment-method-box credit-card"
        >
          <Field
            component={LabeledRadioButton}
            key="Credit Card"
            selectedValue="creditCard"
            title={labels.lbl_billing_creditCard}
            subtitle=""
            name="paymentMethodId"
            hideSubtitleOnMobile
            variation="secondary"
          />
        </Col>
        <Col
          colSize={{ small: 2, medium: 4, large: 6 }}
          className="radio-method payment-method-box"
        >
          <Field
            component={LabeledRadioButton}
            key="PayPal"
            selectedValue="payPal"
            title="Pay Pal"
            subtitle=""
            name="paymentMethodId"
            hideSubtitleOnMobile
            variation="secondary"
          />
          <img
            alt="paypal"
            className="payment-mothod-paypal-img"
            src={getIconPath('paypal-icon')}
            data-locator="payment-mothod-paypal"
          />
        </Col>
        {isMobile && (
          <Col
            colSize={{ small: 2, medium: 4, large: 6 }}
            className="radio-method payment-method-box"
          >
            <Field
              component={LabeledRadioButton}
              key="Venmo"
              selectedValue="Venmo"
              title="Venmo"
              subtitle=""
              name="paymentMethodId"
              variation="secondary"
            />
            <img
              alt="venmo"
              className="payment-mothod-venmo-img"
              src={getIconPath('venmo-blue-acceptance-mark')}
              data-locator="payment-mothod-venmo"
            />
          </Col>
        )}
      </Row>
    </>
  );
};

PaymentMethods.propTypes = {
  className: PropTypes.string,
  paymentHeader: PropTypes.string,
  isMobile: PropTypes.bool.isRequired,
  labels: PropTypes.shape({}).isRequired,
};
PaymentMethods.defaultProps = {
  className: '',
  paymentHeader: '',
};

export default withStyles(PaymentMethods, styles);
export { PaymentMethods as PaymentMethodsVanilla };
