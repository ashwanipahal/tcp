import React from 'react';
import PropTypes from 'prop-types';
import VenmoPaymentButton from '@tcp/core/src/components/common/atoms/VenmoPaymentButton';
import usePerfMeasure from '@tcp/web/src/hooks/usePerfMeasure';
import Button from '../../../../common/atoms/Button';
import withStyles from '../../../../common/hoc/withStyles';
import OpenLoginModal from '../../../account/LoginPage/views/LoginModal';
import style from '../styles/AddedToBagActions.style';
import PayPalButton from '../../common/organism/PayPalButton';
import Row from '../../../../common/atoms/Row';
import Col from '../../../../common/atoms/Col';
import BodyCopy from '../../../../common/atoms/BodyCopy';
import { getLocator } from '../../../../../utils';
import BagConfirmationModal from '../../BagPage/views/BagConfirmationModal.view';

/**
 * Client-side performance timer for the size options.
 *
 * NOTE: Need to use component w/ hook because AddedToBagActions
 * is a class component.
 *
 * @see https://reactjs.org/docs/hooks-rules.html#only-call-hooks-from-react-functions
 */
function PerfMeasure() {
  usePerfMeasure('render_checkout_cta');
  return null;
}

class AddedToBagActions extends React.PureComponent<Props> {
  routeToCheckout = e => {
    const { routeForBagCheckout, closeCheckoutModalMountState, closeMiniBag } = this.props;
    if (e) {
      e.preventDefault();
    }
    if (closeMiniBag) {
      closeMiniBag(false, false);
    }
    closeCheckoutModalMountState({ state: false });
    routeForBagCheckout();
  };

  closeModalAndHandleCheckout = () => {
    const { closeCheckoutConfirmationModal, handleCartCheckout } = this.props;
    closeCheckoutConfirmationModal();
    return handleCartCheckout();
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
      modalInfo,
      closeCheckoutConfirmationModal,
      removeUnqualifiedItemsAndCheckout,
      isEditingItem,
      isInternationalShipping,
    } = this.props;
    const { showModal, isEditingItem: modalEditingItem } = modalInfo;
    if (modalEditingItem) {
      labels.confirmationText = labels.editConfirmationText;
    }
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
          {!isInternationalShipping && (
            <VenmoPaymentButton
              className="venmo-container"
              onSuccess={() => handleCartCheckout(isEditingItem)}
            />
          )}
          {!isInternationalShipping && <PayPalButton className="payPal-button" />}
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
          <PerfMeasure />
        </Row>
        <BagConfirmationModal
          labels={labels}
          isOpen={showModal}
          closeCheckoutConfirmationModal={closeCheckoutConfirmationModal}
          removeUnqualifiedItemsAndCheckout={
            modalEditingItem ? this.closeModalAndHandleCheckout : removeUnqualifiedItemsAndCheckout
          }
        />
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
  routeForBagCheckout: PropTypes.func.isRequired,
};
AddedToBagActions.defaultProps = {
  showAddTobag: true,
};

export default withStyles(AddedToBagActions, style);
export { AddedToBagActions as AddedToBagActionsVanilla };
