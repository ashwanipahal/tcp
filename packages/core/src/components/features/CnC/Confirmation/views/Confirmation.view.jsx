import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '../../../../common/hoc/withStyles';
import styles from '../styles/Confirmation.styles';
import Row from '../../../../common/atoms/Row';
import Col from '../../../../common/atoms/Col';
import CheckoutOrderInfo from '../../Checkout/molecules/CheckoutOrderInfoMobile';

/** The hard coded values are just to show the template. these will be removed once the components are are in place */
/**
 * @function ConfirmationView
 * @description component to render confirmation component.
 */
const ConfirmationView = ({ className }) => {
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
        </Col>
      </Row>
      <Row fullBleed className="placeholder loyalty-banner">
        <Col colSize={{ small: 6, medium: 8, large: 12 }}>
          <div>LOYALTY BANNER</div>
        </Col>
      </Row>
      <CheckoutOrderInfo isConfirmationPage />
    </div>
  );
};

ConfirmationView.propTypes = {
  className: PropTypes.string,
};
ConfirmationView.defaultProps = {
  className: '',
};
export default withStyles(ConfirmationView, styles);
export { ConfirmationView as ConfirmationViewVanilla };
