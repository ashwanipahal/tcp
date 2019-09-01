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

class AddedToBagActions extends React.PureComponent<Props> {
  routeToCheckout = e => {
    const { navigation, closeCheckoutModalMountState } = this.props;
    if (e) {
      e.preventDefault();
    }
    navigation.navigate('Checkout', { nextToRoot: 'pickupPage' });
    closeCheckoutModalMountState({ state: false });
  };

  render() {
    const {
      labels,
      showAddTobag,
      // checkoutModalMountedState,
      // handleCartCheckout,
      // navigation,
      // closeCheckoutModalMountState,
      isUserLoggedIn,
    } = this.props;
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
};

AddedToBagActions.defaultProps = {
  showAddTobag: true,
};

export default AddedToBagActions;
