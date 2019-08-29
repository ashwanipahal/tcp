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
import { navigateToNestedRoute } from '../../../../../utils/utils.app';

class AddedToBagActions extends React.PureComponent<Props> {
  routeToCheckout = e => {
    const { navigation } = this.props;
    if (e) {
      e.preventDefault();
    }
    navigateToNestedRoute(navigation, 'HomeStack', 'Checkout');
  };

  render() {
    const {
      labels,
      showAddTobag,
      checkoutModalMountedState,
      handleCartCheckout,
      navigation,
      closeCheckoutModalMountState,
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
            {isUserLoggedIn && (
              <BodyCopy
                color="white"
                fontWeight="extrabold"
                fontFamily="secondary"
                fontSize="fs13"
                text={labels.checkout && labels.checkout.toUpperCase()}
                onPress={() => {
                  navigateToNestedRoute(navigation, 'HomeStack', 'Checkout');
                }}
              />
            )}

            {!isUserLoggedIn && (
              <BodyCopy
                color="white"
                fontWeight="extrabold"
                fontFamily="secondary"
                fontSize="fs13"
                text={labels.checkout && labels.checkout.toUpperCase()}
                onPress={handleCartCheckout}
              />
            )}
          </CheckoutButton>
        </ButtonWrapper>
        <OpenLoginModal
          variation="checkout"
          openState={checkoutModalMountedState}
          setLoginModalMountState={closeCheckoutModalMountState}
          handleContinueAsGuest={this.routeToCheckout}
          handleAfterLogin={this.routeToCheckout}
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
