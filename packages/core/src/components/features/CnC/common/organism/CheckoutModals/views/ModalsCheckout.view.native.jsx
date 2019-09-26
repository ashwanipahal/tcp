import React from 'react';
import PropTypes from 'prop-types';
import OpenLoginModal from '../../../../../account/LoginPage/views/LoginModal.native';
import CheckoutConstants from '../../../../Checkout/Checkout.constants';
import BagConfirmationModal from '../../../../BagPage/views/BagConfirmationModal.view';
import ItemDeleteConfirmationModal from '../../../../BagPage/views/ItemDeleteConfirmationModal.view';
import { navigateToNestedRoute } from '../../../../../../../utils/utils.app';

class ModalsCheckout extends React.PureComponent<Props> {
  routeToCheckout = e => {
    const { navigation, closeCheckoutModalMountState, orderHasPickup, closeModal } = this.props;
    if (e) {
      e.preventDefault();
    }
    if (orderHasPickup) {
      navigateToNestedRoute(
        navigation,
        CheckoutConstants.CHECKOUT_ROOT,
        CheckoutConstants.CHECKOUT_ROUTES_NAMES.CHECKOUT_PICKUP,
        {
          routeTo: CheckoutConstants.PICKUP_DEFAULT_PARAM,
        }
      );
    } else {
      navigateToNestedRoute(
        navigation,
        CheckoutConstants.CHECKOUT_ROOT,
        CheckoutConstants.CHECKOUT_ROUTES_NAMES.CHECKOUT_SHIPPING,
        {
          routeTo: CheckoutConstants.SHIPPING_DEFAULT_PARAM,
        }
      );
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
};

ModalsCheckout.defaultProps = {
  closeModal: () => {},
};

export default ModalsCheckout;
