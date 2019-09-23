import React from 'react';
import PropTypes from 'prop-types';
import OpenLoginModal from '../../../../../account/LoginPage/views/LoginModal.native';
import CheckoutConstants from '../../../../Checkout/Checkout.constants';
import BagConfirmationModal from '../../../../BagPage/views/BagConfirmationModal.view';

class ModalsCheckout extends React.PureComponent<Props> {
  routeToCheckout = e => {
    const { navigation, closeCheckoutModalMountState, orderHasPickup, closeModal } = this.props;
    if (e) {
      e.preventDefault();
    }
    if (orderHasPickup) {
      navigation.navigate(CheckoutConstants.CHECKOUT_ROUTES_NAMES.CHECKOUT_PICKUP);
    } else {
      navigation.navigate(CheckoutConstants.CHECKOUT_ROUTES_NAMES.CHECKOUT_SHIPPING);
    }
    if (closeModal) {
      setTimeout(() => {
        closeModal();
      });
    }
    closeCheckoutModalMountState({ state: false });
  };

  closeModalAndHandleCheckout = () => {
    const { handleCartCheckout, navigation } = this.props;
    this.closeCheckoutConfirmationModal();
    return handleCartCheckout({ navigation });
  };

  closeCheckoutConfirmationModal = () => {
    const { closeCheckoutConfirmationModal, closeModal } = this.props;
    closeCheckoutConfirmationModal();
    if (closeModal) {
      setTimeout(() => {
        closeModal();
      });
    }
  };

  render() {
    const {
      labels,
      checkoutModalMountedState,
      closeCheckoutModalMountState,
      removeUnqualifiedItemsAndCheckout,
      modalInfo,
    } = this.props;
    const { showModal, isEditingItem: modalEditingItem } = modalInfo;
    if (modalEditingItem) {
      labels.confirmationText = labels.editConfirmationText;
    }
    return (
      <>
        <OpenLoginModal
          variation="checkout"
          openState={checkoutModalMountedState}
          setLoginModalMountState={closeCheckoutModalMountState}
          handleContinueAsGuest={this.routeToCheckout}
          handleAfterLogin={this.routeToCheckout}
        />
        <BagConfirmationModal
          labels={labels}
          isOpen={showModal}
          closeCheckoutConfirmationModal={this.closeCheckoutConfirmationModal}
          removeUnqualifiedItemsAndCheckout={
            modalEditingItem ? this.closeModalAndHandleCheckout : removeUnqualifiedItemsAndCheckout
          }
        />
      </>
    );
  }
}

ModalsCheckout.propTypes = {
  labels: PropTypes.shape.isRequired,
  navigation: PropTypes.shape({}).isRequired,
  closeModal: PropTypes.func,
};

ModalsCheckout.defaultProps = {
  closeModal: () => {},
};

export default ModalsCheckout;
