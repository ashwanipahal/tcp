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

class AddedToBagActions extends React.PureComponent<Props> {
  routeToCheckout = e => {
    const { navigation, closeCheckoutModalMountState, orderHasPickup } = this.props;
    if (e) {
      e.preventDefault();
    }
    if (orderHasPickup) {
      navigation.navigate(CheckoutConstants.CHECKOUT_PAGES_NAMES.CHECKOUT, {
        nextToRoot: CheckoutConstants.CHECKOUT_PAGES_NAMES.PICKUP,
      });
    } else {
      navigation.navigate(CheckoutConstants.CHECKOUT_PAGES_NAMES.CHECKOUT, {
        nextToRoot: CheckoutConstants.CHECKOUT_PAGES_NAMES.SHIPPING,
      });
    }
    closeCheckoutModalMountState({ state: false });
  };

  closeModalAndHandleCheckout = () => {
    const { closeCheckoutConfirmationModal, handleCartCheckout } = this.props;
    closeCheckoutConfirmationModal();
    return handleCartCheckout();
  };

  render() {
    const {
      labels,
      showAddTobag,
      checkoutModalMountedState,
      handleCartCheckout,
      closeCheckoutConfirmationModal,
      closeCheckoutModalMountState,
      removeUnqualifiedItemsAndCheckout,
      isEditingItem,
      modalInfo,
    } = this.props;
    const { showModal, isEditingItem: modalEditingItem } = modalInfo;
    if (modalEditingItem) {
      labels.confirmationText = labels.editConfirmationText;
    }
    return (
      <ActionsWrapper>
        {showAddTobag && (
          <ButtonWrapper>
            <ViewBagButton>
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
          <CheckoutButton>
            {/* {!isUserLoggedIn && ( */}
            <BodyCopy
              color="white"
              fontWeight="extrabold"
              fontFamily="secondary"
              fontSize="fs13"
              text={labels.checkout && labels.checkout.toUpperCase()}
              onPress={() => handleCartCheckout(isEditingItem)}
              // onPress={this.routeToCheckout}
            />
            {/* )} */}

            {/* {!isUserLoggedIn && (
              <BodyCopy
                color="white"
                fontWeight="extrabold"
                fontFamily="secondary"
                fontSize="fs13"
                text={labels.checkout && labels.checkout.toUpperCase()}
                // onPress={handleCartCheckout}
                onPress={() => {
                  navigateToNestedRoute(navigation, 'HomeStack', 'Checkout');
                }}
              />
            )} */}
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
          closeCheckoutConfirmationModal={closeCheckoutConfirmationModal}
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
};

AddedToBagActions.defaultProps = {
  showAddTobag: true,
};

export default AddedToBagActions;
