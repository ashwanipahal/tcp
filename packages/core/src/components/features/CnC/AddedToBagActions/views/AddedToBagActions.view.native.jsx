import React from 'react';
import PropTypes from 'prop-types';
import BodyCopy from '../../../../common/atoms/BodyCopy';
// import OpenLoginModal from '../../../account/LoginPage/views/LoginModal.native';
import {
  ButtonWrapper,
  ActionsWrapper,
  ViewBagButton,
  CheckoutButton,
} from '../styles/AddedToBagActions.style.native';
import CheckoutConstants from '../../Checkout/Checkout.constants';
import ADDEDTOBAG_CONSTANTS from '../../AddedToBag/AddedToBag.constants';

class AddedToBagActions extends React.PureComponent<Props> {
  routeToCheckout = e => {
    const { navigation, closeCheckoutModalMountState } = this.props;
    if (e) {
      e.preventDefault();
    }
    navigation.navigate(CheckoutConstants.CHECKOUT_PAGES_NAMES.CHECKOUT, {
      nextToRoot: CheckoutConstants.CHECKOUT_PAGES_NAMES.PICKUP,
    });
    closeCheckoutModalMountState({ state: false });
  };

  render() {
    const {
      labels,
      showAddTobag,
      // checkoutModalMountedState,
      // handleCartCheckout,
      navigation,
      // closeCheckoutModalMountState,
      isUserLoggedIn,
      closeModal,
    } = this.props;
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
          <CheckoutButton>
            {!isUserLoggedIn && (
              <BodyCopy
                color="white"
                fontWeight="extrabold"
                fontFamily="secondary"
                fontSize="fs13"
                text={labels.checkout && labels.checkout.toUpperCase()}
                onPress={this.routeToCheckout}
              />
            )}

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
        {/* <OpenLoginModal
          variation="checkout"
          openState={checkoutModalMountedState}
          setLoginModalMountState={closeCheckoutModalMountState}
          handleContinueAsGuest={this.routeToCheckout}
          handleAfterLogin={this.routeToCheckout}
        /> */}
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
