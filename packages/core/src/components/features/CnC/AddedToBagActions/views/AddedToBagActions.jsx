import React from 'react';
import PropTypes from 'prop-types';
import Button from '../../../../common/atoms/Button';
import withStyles from '../../../../common/hoc/withStyles';
import style from '../styles/AddedToBagActions.style';
import PayPalButton from '../../../../common/atoms/PayPalButton';
import Row from '../../../../common/atoms/Row';
import Col from '../../../../common/atoms/Col';
import { getLocator } from '../../../../../utils';

const AddedToBagActions = props => {
  const { className, onClickCartCheckout } = props;
  return (
    <div className={className}>
      <Row>
        <Col colSize={{ medium: 8, large: 12, small: 6 }}>
          <Button data-locator={getLocator('addedtobag_btnviewbag')} className="view-bag">
            View Bag
          </Button>
        </Col>
      </Row>
      <Row className="checkout-button">
        <Col colSize={{ medium: 4, large: 6, small: 3 }}>
          <PayPalButton className="payPal-button" />
        </Col>
        <Col colSize={{ medium: 4, large: 6, small: 3 }}>
          <Button
            data-locator={getLocator('addedtobag_btncheckout')}
            onClick={onClickCartCheckout}
            className="checkout"
          >
            Checkout
          </Button>
        </Col>
      </Row>
    </div>
  );
};

AddedToBagActions.propTypes = {
  className: PropTypes.string.isRequired,
  onClickCartCheckout: PropTypes.func.isRequired,
};

export default withStyles(AddedToBagActions, style);
export { AddedToBagActions as AddedToBagActionsVanilla };
