import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import LabeledRadioButton from '../../../../../../common/atoms/LabeledRadioButton';
import Row from '../../../../../../common/atoms/Row';
import Col from '../../../../../../common/atoms/Col';
import BodyCopy from '../../../../../../common/atoms/BodyCopy';
import styles from '../styles/PaymentMethods.style';
import withStyles from '../../../../../../common/hoc/withStyles';

const PaymentMethods = ({ className, paymentHeader, labels, isVenmoEnabled }) => {
  const { paymentMethod, paypal } = labels;
  const payPalLabel = `${paymentMethod} ${paypal}`;
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
            title={labels.creditCard}
            subtitle=""
            name="paymentMethodId"
            hideSubtitleOnMobile
            variation="secondary"
            data-locator="creditCardRadioBtn"
          />
        </Col>
        <Col
          colSize={{ small: 2, medium: 4, large: 6 }}
          className="radio-method payment-method-box payment-method-paypal-img"
        >
          <Field
            component={LabeledRadioButton}
            key="PayPal"
            selectedValue="payPal"
            aria-label={payPalLabel}
            title=""
            subtitle=""
            name="paymentMethodId"
            hideSubtitleOnMobile
            variation="secondary"
            data-locator="paypalRadioBtn"
          />
        </Col>
        {isVenmoEnabled && (
          <Col
            colSize={{ small: 2, medium: 4, large: 0 }}
            className="radio-method payment-method-box payment-method-venmo-img hideOnDesktop"
          >
            <Field
              component={LabeledRadioButton}
              key="Venmo"
              selectedValue="venmo"
              title=""
              subtitle=""
              name="paymentMethodId"
              variation="secondary"
              data-locator="venmoRadioBtn"
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
  labels: PropTypes.shape({}).isRequired,
  isVenmoEnabled: PropTypes.bool, // Venmo Kill Switch
};
PaymentMethods.defaultProps = {
  className: '',
  paymentHeader: '',
  isVenmoEnabled: false,
};

export default withStyles(PaymentMethods, styles);
export { PaymentMethods as PaymentMethodsVanilla };
