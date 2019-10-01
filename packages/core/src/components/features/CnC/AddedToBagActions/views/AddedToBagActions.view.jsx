import React from 'react';
import PropTypes from 'prop-types';
import VenmoPaymentButton from '@tcp/core/src/components/common/atoms/VenmoPaymentButton';
import RenderPerf from '@tcp/web/src/components/common/molecules/RenderPerf';
import Button from '../../../../common/atoms/Button';
import withStyles from '../../../../common/hoc/withStyles';
import style from '../styles/AddedToBagActions.style';
import PayPalButton from '../../common/organism/PayPalButton';
import Row from '../../../../common/atoms/Row';
import Col from '../../../../common/atoms/Col';
import BodyCopy from '../../../../common/atoms/BodyCopy';
import { getLocator } from '../../../../../utils';

class AddedToBagActions extends React.PureComponent<Props> {
  render() {
    const {
      className,
      labels,
      onClickViewBag,
      showAddTobag,
      handleCartCheckout,
      isEditingItem,
      isInternationalShipping,
      isVenmoEnabled,
      showVenmo,
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
          <div className="paypal-venmo">
            {!isInternationalShipping && (
              <div className={`${showAddTobag ? 'paypal-wrapper-atb' : 'paypal-wrapper'}`}>
                <PayPalButton className="payPal-button" />
              </div>
            )}
            {!isInternationalShipping && isVenmoEnabled && showVenmo && (
              <div className="venmo-wrapper">
                <VenmoPaymentButton
                  className="venmo-container"
                  onSuccess={() => handleCartCheckout(isEditingItem)}
                />
              </div>
            )}
          </div>
          <Button
            data-locator={getLocator('addedtobag_btncheckout')}
            className="checkout"
            onClick={() => handleCartCheckout(isEditingItem)}
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
          <RenderPerf.Measure name="render_checkout_cta" />
        </Row>
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
};
AddedToBagActions.defaultProps = {
  showAddTobag: true,
  showVenmo: true,
};

export default withStyles(AddedToBagActions, style);
export { AddedToBagActions as AddedToBagActionsVanilla };
