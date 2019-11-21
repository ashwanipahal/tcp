import React from 'react';
import PropTypes from 'prop-types';
import OpenLoginModal from '../../../../../account/LoginPage/views/LoginModal.native';
import CheckoutConstants from '../../../../Checkout/Checkout.constants';
import BagConfirmationModal from '../../../../BagPage/views/BagConfirmationModal.view';
import ItemDeleteConfirmationModal from '../../../../BagPage/views/ItemDeleteConfirmationModal.view';

class ModalsCheckout extends React.PureComponent {
  navigateToCheckout = stage => {
    const { setCheckoutStage, navigation, closeAddedToBagModal } = this.props;
    setTimeout(closeAddedToBagModal);
    setCheckoutStage(stage);
    navigation.navigate({ routeName: CheckoutConstants.CHECKOUT_ROOT });
  };

  routeToCheckout = e => {
    const {
      closeCheckoutModalMountState,
      orderHasPickup,
      closeModal,
      isExpressCheckoutPage,
    } = this.props;
    if (e) {
      e.preventDefault();
    }
    if (isExpressCheckoutPage) {
      this.navigateToCheckout(CheckoutConstants.REVIEW_DEFAULT_PARAM);
    } else if (orderHasPickup) {
      this.navigateToCheckout(CheckoutConstants.PICKUP_DEFAULT_PARAM);
    } else {
      this.navigateToCheckout(CheckoutConstants.SHIPPING_DEFAULT_PARAM);
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
      currentSelectItemInfo,
      closeItemDeleteModal,
      deleteConfirmationModalLabels,
      addItemToSflList,
      confirmRemoveCartItem,
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
        <ItemDeleteConfirmationModal
          isOpen={currentSelectItemInfo.showModal}
          closeCheckoutConfirmationModal={closeItemDeleteModal}
          labels={deleteConfirmationModalLabels}
          moveToSfl={() => addItemToSflList(currentSelectItemInfo)}
          confirmRemoveCartItem={() => confirmRemoveCartItem(currentSelectItemInfo.itemId)}
        />
      </>
    );
  }
}

ModalsCheckout.propTypes = {
  labels: PropTypes.shape.isRequired,
  navigation: PropTypes.shape({}).isRequired,
  closeModal: PropTypes.func,
  setCheckoutStage: PropTypes.func.isRequired,
  closeAddedToBagModal: PropTypes.func.isRequired,
  closeCheckoutModalMountState: PropTypes.func.isRequired,
  orderHasPickup: PropTypes.bool,
  isExpressCheckoutPage: PropTypes.bool,
  handleCartCheckout: PropTypes.func.isRequired,
  closeCheckoutConfirmationModal: PropTypes.func.isRequired,
  checkoutModalMountedState: PropTypes.bool,
  removeUnqualifiedItemsAndCheckout: PropTypes.func.isRequired,
  modalInfo: PropTypes.shape({}).isRequired,
  currentSelectItemInfo: PropTypes.shape({}).isRequired,
  closeItemDeleteModal: PropTypes.func.isRequired,
  deleteConfirmationModalLabels: PropTypes.shape({}).isRequired,
  addItemToSflList: PropTypes.func.isRequired,
  confirmRemoveCartItem: PropTypes.func.isRequired,
};

ModalsCheckout.defaultProps = {
  closeModal: () => {},
  orderHasPickup: false,
  isExpressCheckoutPage: false,
  checkoutModalMountedState: false,
};

export default ModalsCheckout;
