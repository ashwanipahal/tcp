import React from 'react';
import PropTypes from 'prop-types';
import BodyCopy from '../../../../common/atoms/BodyCopy';
import OpenLoginModal from '../../../account/LoginPage/views/LoginModal.native';
import {
  ButtonWrapper,
  ActionsWrapper,
  ViewBagButton,
  CheckoutButton,
} from '../styles/AddedToBagActions.style.native';
import CheckoutConstants from '../../Checkout/Checkout.constants';
import BagConfirmationModal from '../../BagPage/views/BagConfirmationModal.view';
import ADDEDTOBAG_CONSTANTS from '../../AddedToBag/AddedToBag.constants';

class AddedToBagActions extends React.PureComponent<Props> {
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
      showAddTobag,
      checkoutModalMountedState,
      handleCartCheckout,
      closeCheckoutModalMountState,
      removeUnqualifiedItemsAndCheckout,
      isEditingItem,
      modalInfo,
      navigation,
      closeModal,
    } = this.props;
    const { showModal, isEditingItem: modalEditingItem } = modalInfo;
    if (modalEditingItem) {
      labels.confirmationText = labels.editConfirmationText;
    }
    return (
      <ActionsWrapper>
        {showAddTobag && (
          <ButtonWrapper>
            <ViewBagButton
              onPress={() => {
                navigation.navigate(ADDEDTOBAG_CONSTANTS.BAG_PAGE);
                if (closeModal) {
                  closeModal();
                }
              }}
            >
              <BodyCopy
                textTransform="uppercase"
                color="white"
                fontWeight="extrabold"
                fontFamily="secondary"
                fontSize="fs13"
                text={labels.viewBag && labels.viewBag.toUpperCase()}
              />
            </ViewBagButton>
          </ButtonWrapper>
        )}
        <ButtonWrapper>
          <CheckoutButton
            onPress={() => {
              handleCartCheckout({ isEditingItem, navigation, closeModal });
            }}
          >
            <BodyCopy
              color="white"
              fontWeight="extrabold"
              fontFamily="secondary"
              fontSize="fs13"
              text={labels.checkout && labels.checkout.toUpperCase()}
            />
          </CheckoutButton>
        </ButtonWrapper>
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
      </ActionsWrapper>
    );
  }
}

AddedToBagActions.propTypes = {
  labels: PropTypes.shape.isRequired,
  showAddTobag: PropTypes.shape,
  navigation: PropTypes.shape({}).isRequired,
  closeModal: PropTypes.func,
};

AddedToBagActions.defaultProps = {
  showAddTobag: true,
  closeModal: () => {},
};

export default AddedToBagActions;
