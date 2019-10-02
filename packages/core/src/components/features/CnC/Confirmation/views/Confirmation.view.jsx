import React from 'react';
import PropTypes from 'prop-types';
import CardImage from '../../../../common/molecules/CardImage';
import withStyles from '../../../../common/hoc/withStyles';
import styles from '../styles/Confirmation.styles';
import Row from '../../../../common/atoms/Row';
import Col from '../../../../common/atoms/Col';
import CheckoutOrderInfo from '../../Checkout/molecules/CheckoutOrderInfoMobile';
import VenmoConfirmation from '../../common/molecules/VenmoConfirmation';
import { constants as VenmoConstants } from '../../../../common/atoms/VenmoPaymentButton/container/VenmoPaymentButton.util';
import ConfirmationAccountFormContainer from '../../common/organism/ConfirmationAccountForm';

/** The hard coded values are just to show the template. these will be removed once the components are are in place */
/**
 * @function ConfirmationView
 * @description component to render confirmation component.
 */
const ConfirmationView = ({ className, isVenmoPaymentInProgress, venmoPayment, isGuest }) => {
  return (
    <div className={className}>
      <Row fullBleed className="placeholder sms-sign-up">
        <Col colSize={{ small: 6, medium: 8, large: 12 }}>
          <div>SMS SIGN UP</div>
        </Col>
      </Row>
      <Row fullBleed className="placeholder thank-you-component">
        <Col colSize={{ small: 6, medium: 8, large: 12 }}>
          <div>THANK YOU COMPONENT</div>
          {isVenmoPaymentInProgress && (
            <VenmoConfirmation isVenmoPaymentInProgress={isVenmoPaymentInProgress} />
          )}
          {isVenmoPaymentInProgress && venmoPayment && (
            <div>
              <section className="venmo-payment-method-wrapper">
                <CardImage card={venmoPayment} cardNumber={venmoPayment.userName} />
              </section>
            </div>
          )}
        </Col>
      </Row>
      <Row fullBleed className="placeholder loyalty-banner">
        <Col colSize={{ small: 6, medium: 8, large: 12 }}>
          <div>LOYALTY BANNER</div>
        </Col>
      </Row>
      {isGuest && (
        <Row fullBleed>
          <Col colSize={{ small: 6, medium: 8, large: 12 }}>
            <ConfirmationAccountFormContainer />
          </Col>
        </Row>
      )}
      <CheckoutOrderInfo isConfirmationPage />
    </div>
  );
};

ConfirmationView.propTypes = {
  className: PropTypes.string,
  isVenmoPaymentInProgress: PropTypes.bool,
  isGuest: PropTypes.bool.isRequired,
  venmoPayment: PropTypes.shape({
    userName: PropTypes.string,
    ccBrand: PropTypes.string,
    ccType: PropTypes.string,
  }),
};
ConfirmationView.defaultProps = {
  className: '',
  isVenmoPaymentInProgress: false,
  venmoPayment: {
    userName: '',
    ccBrand: VenmoConstants.VENMO,
    ccType: VenmoConstants.VENMO,
  },
};
export default withStyles(ConfirmationView, styles);
export { ConfirmationView as ConfirmationViewVanilla };
