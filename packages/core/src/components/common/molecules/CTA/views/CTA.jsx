import React from 'react';
import PropTypes from 'prop-types';
import Button from '../../../atoms/Button';
import withStyles from '../../../hoc/withStyles';
import style from '../styles/CTA.style';
import PayPalButton from '../../../atoms/PaypalButton';

const CTA = props => {
  const { className, onClickCartCheckout } = props;
  return (
    <div className={className}>
      <Button className="view-bag">View Bag</Button>
      <div className="check-out-container">
        <PayPalButton className="paypal-button" />
        <Button onClick={onClickCartCheckout} className="checkout">
          Checkout
        </Button>
      </div>
    </div>
  );
};

CTA.propTypes = {
  className: PropTypes.string.isRequired,
  onClickCartCheckout: PropTypes.func.isRequired,
};

export default withStyles(CTA, style);
export { CTA as CTAVanilla };
