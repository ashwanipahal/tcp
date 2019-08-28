import React from 'react';
import PropTypes from 'prop-types';
import Button from '../../../../common/atoms/Button';
import withStyles from '../../../../common/hoc/withStyles';
import OpenLoginModal from '../../../account/LoginPage/views/LoginModal';
import style from '../styles/AddedToBagActions.style';
import PayPalButton from '../../../../common/atoms/PaypalButton';
import Row from '../../../../common/atoms/Row';
import Col from '../../../../common/atoms/Col';
import BodyCopy from '../../../../common/atoms/BodyCopy';
import { getLocator, routerPush } from '../../../../../utils';

class AddedToBagActions extends React.PureComponent<Props> {
  routeToCheckout = e => {
    const { orderHasPickup } = this.props;
    if (e) {
      e.preventDefault();
    }
    let section = '/shipping';
    if (orderHasPickup) {
      section = '/pickup';
    }
    routerPush(`/checkout${section}`, `/checkout${section}`);
  };

  render() {
    const {
      className,
      labels,
      onClickViewBag,
      showAddTobag,
      checkoutModalMountedState,
      handleCartCheckout,
      closeCheckoutModalMountState,
    } = this.props;
    return (
      <div className={className}>
        {showAddTobag && (
          <Row>
            <Col colSize={{ medium: 8, large: 12, small: 6 }}>
              <Button
                onClick={onClickViewBag}
                data-locator={getLocator('addedtobag_btnviewbag')}
                className="view-bag"
              >
                <BodyCopy
                  component="span"
                  color="white"
                  fontWeight="extrabold"
                  fontFamily="secondary"
                  fontSize="fs14"
                >
                  {labels.viewBag}
                </BodyCopy>
              </Button>
            </Col>
          </Row>
        )}
        <Row className="checkout-button">
          <PayPalButton className="payPal-button" />
          <Button
            data-locator={getLocator('addedtobag_btncheckout')}
            className="checkout"
            onClick={handleCartCheckout}
          >
            <BodyCopy
              component="span"
              color="white"
              fontWeight="extrabold"
              fontFamily="secondary"
              fontSize="fs14"
            >
              {labels.checkout}
            </BodyCopy>
          </Button>
        </Row>
        <OpenLoginModal
          variation="checkout"
          openState={checkoutModalMountedState}
          setLoginModalMountState={closeCheckoutModalMountState}
          handleContinueAsGuest={this.routeToCheckout}
          handleAfterLogin={this.routeToCheckout}
        />
      </div>
    );
  }
}

AddedToBagActions.propTypes = {
  className: PropTypes.string.isRequired,
  onClickViewBag: PropTypes.func.isRequired,
  labels: PropTypes.shape.isRequired,
  showAddTobag: PropTypes.bool,
  handleCartCheckout: PropTypes.func.isRequired,
};
AddedToBagActions.defaultProps = {
  showAddTobag: true,
};

export default withStyles(AddedToBagActions, style);
export { AddedToBagActions as AddedToBagActionsVanilla };
