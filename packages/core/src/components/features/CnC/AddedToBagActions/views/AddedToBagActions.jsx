import React from 'react';
import PropTypes from 'prop-types';
import Button from '../../../../common/atoms/Button';
import withStyles from '../../../../common/hoc/withStyles';
import style from '../styles/AddedToBagActions.style';
import PayPalButton from '../../../../common/atoms/PaypalButton';

const AddedToBagActions = props => {
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

AddedToBagActions.propTypes = {
  className: PropTypes.string.isRequired,
  onClickCartCheckout: PropTypes.func.isRequired,
};

export default withStyles(AddedToBagActions, style);
export { AddedToBagActions as AddedToBagActionsVanilla };
