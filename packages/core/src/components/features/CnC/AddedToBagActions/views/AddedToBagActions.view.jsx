import React from 'react';
import PropTypes from 'prop-types';
import VenmoPaymentButton from '@tcp/core/src/components/common/atoms/VenmoPaymentButton';
import RenderPerf from '@tcp/web/src/components/common/molecules/RenderPerf';
import { CALL_TO_ACTION_VISIBLE } from '@tcp/core/src/constants/rum.constants';
import Button from '../../../../common/atoms/Button';
import withStyles from '../../../../common/hoc/withStyles';
import style from '../styles/AddedToBagActions.style';
import PayPalButton from '../../common/organism/PayPalButton';
import Row from '../../../../common/atoms/Row';
import Col from '../../../../common/atoms/Col';
import BodyCopy from '../../../../common/atoms/BodyCopy';
import { getLocator } from '../../../../../utils';
import ErrorMessage from '../../common/molecules/ErrorMessage';

class AddedToBagActions extends React.PureComponent<Props> {
  getPaypalButton() {
    const {
      showAddTobag,
      containerId,
      isBagPageStickyHeader,
      isPayPalHidden,
      paypalButtonHeight,
    } = this.props;
    let containerID = containerId;
    if (isBagPageStickyHeader) {
      containerID = 'paypal-button-container-bag-header';
    }
    return (
      !isPayPalHidden && (
        <div className={`${showAddTobag ? 'paypal-wrapper-atb' : 'paypal-wrapper'}`}>
          <PayPalButton
            className="payPal-button"
            containerId={containerID}
            height={paypalButtonHeight}
          />
        </div>
      )
    );
  }

  getHeaderPaypalButton() {
    const { isBagPageStickyHeader, isInternationalShipping } = this.props;
    if (!isInternationalShipping && isBagPageStickyHeader) {
      return this.getPaypalButton();
    }
    return null;
  }

  getCheckoutButton() {
    const { labels, handleCartCheckout, isEditingItem } = this.props;
    return (
      <Button
        data-locator={getLocator('addedtobag_btncheckout')}
        className="checkout"
        onClick={() => handleCartCheckout({ isEditingItem })}
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
    );
  }

  getVenmoPaymentButton() {
    const {
      isInternationalShipping,
      isVenmoEnabled,
      showVenmo,
      handleCartCheckout,
      isEditingItem,
      isUSSite,
    } = this.props;
    if (!isInternationalShipping && isVenmoEnabled && showVenmo && isUSSite) {
      return (
        <div className="venmo-wrapper">
          <VenmoPaymentButton
            className="venmo-container"
            onSuccess={() => handleCartCheckout(isEditingItem)}
          />
        </div>
      );
    }
    return null;
  }

  render() {
    const {
      className,
      labels,
      onClickViewBag,
      showAddTobag,
      isInternationalShipping,
      isBagPageStickyHeader,
      checkoutServerError,
      venmoError,
    } = this.props;
    return (
      <div className={className}>
        {showAddTobag && (
          <Row className="view-bag-container">
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
        <Row
          className={`checkout-button ${isBagPageStickyHeader ? 'checkout-button-bagHeader' : ''}`}
          id={`${!isBagPageStickyHeader ? 'checkout-button-section' : ''}`}
        >
          <div className={`paypal-venmo ${isBagPageStickyHeader ? 'checkout-sticky-header' : ''}`}>
            {!isInternationalShipping && !isBagPageStickyHeader && this.getPaypalButton()}
            {this.getHeaderPaypalButton()}
            {this.getVenmoPaymentButton()}
          </div>
          {this.getCheckoutButton()}
          <RenderPerf.Measure name={CALL_TO_ACTION_VISIBLE} />
        </Row>
        {(checkoutServerError || venmoError) && (
          <Row className="elem-mt-MED">
            <ErrorMessage
              error={venmoError || checkoutServerError.errorMessage}
              className="addBagActions-error"
            />
          </Row>
        )}
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
  showVenmo: PropTypes.bool,
  isBagPageStickyHeader: PropTypes.bool,
  isUSSite: PropTypes.bool,
  checkoutServerError: PropTypes.shape({}).isRequired,
  venmoError: PropTypes.string,
  paypalButtonHeight: PropTypes.number,
};
AddedToBagActions.defaultProps = {
  showAddTobag: true,
  showVenmo: true,
  isBagPageStickyHeader: false,
  isUSSite: true,
  venmoError: '',
  paypalButtonHeight: 48,
};

export default withStyles(AddedToBagActions, style);
export { AddedToBagActions as AddedToBagActionsVanilla };
