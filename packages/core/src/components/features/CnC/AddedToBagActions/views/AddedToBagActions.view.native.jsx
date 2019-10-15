import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { NavigationActions } from 'react-navigation';
import BodyCopy from '../../../../common/atoms/BodyCopy';
import {
  ButtonWrapper,
  ActionsWrapper,
  ViewBagButton,
  CheckoutButton,
  PaymentsButtonWrapper,
} from '../styles/AddedToBagActions.style.native';
import PayPalButton from '../../common/organism/PayPalButton';
import ADDEDTOBAG_CONSTANTS from '../../AddedToBag/AddedToBag.constants';
import CheckoutModals from '../../common/organism/CheckoutModals';
import VenmoPaymentButton from '../../../../common/atoms/VenmoPaymentButton';

class AddedToBagActions extends React.PureComponent<Props> {
  getVenmoPaymentButton() {
    const { isInternationalShipping, handleCartCheckout, isEditingItem } = this.props;
    if (!isInternationalShipping) {
      return (
        <PaymentsButtonWrapper>
          <VenmoPaymentButton
            className="venmo-container"
            onSuccess={() => handleCartCheckout(isEditingItem)}
          />
        </PaymentsButtonWrapper>
      );
    }
    return null;
  }

  render() {
    const {
      labels,
      showAddTobag,
      handleCartCheckout,
      isEditingItem,
      navigation,
      closeModal,
      isNoNEmptyBag,
      fromAddedToBagModal,
      getPayPalSettings,
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
        {(isNoNEmptyBag || fromAddedToBagModal) && (
          <View>
            <ButtonWrapper>
              <PayPalButton getPayPalSettings={getPayPalSettings} navigation={navigation} />
              <CheckoutButton
                onPress={() => {
                  handleCartCheckout({
                    isEditingItem,
                    navigation,
                    closeModal,
                    navigationActions: NavigationActions,
                  });
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
          </View>
        )}
        {(isNoNEmptyBag || fromAddedToBagModal) && this.getVenmoPaymentButton()}
        <CheckoutModals navigation={navigation} />
      </ActionsWrapper>
    );
  }
}

AddedToBagActions.propTypes = {
  labels: PropTypes.shape.isRequired,
  showAddTobag: PropTypes.shape,
  navigation: PropTypes.shape({}).isRequired,
  closeModal: PropTypes.func,
  isNoNEmptyBag: PropTypes.number.isRequired,
  fromAddedToBagModal: PropTypes.bool,
};

AddedToBagActions.defaultProps = {
  showAddTobag: true,
  closeModal: () => {},
  fromAddedToBagModal: false,
};

export default AddedToBagActions;
