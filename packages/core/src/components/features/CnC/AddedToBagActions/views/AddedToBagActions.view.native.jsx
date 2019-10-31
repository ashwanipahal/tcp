import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { NavigationActions } from 'react-navigation';
import BodyCopy from '../../../../common/atoms/BodyCopy';
import {
  ViewBagButton,
  CheckoutButton,
  PaymentsButtonWrapper,
} from '../styles/AddedToBagActions.style.native';
import PayPalButton from '../../common/organism/PayPalButton';
import ADDEDTOBAG_CONSTANTS from '../../AddedToBag/AddedToBag.constants';
import CheckoutModals from '../../common/organism/CheckoutModals';
import VenmoPaymentButton from '../../../../common/atoms/VenmoPaymentButton';

class AddedToBagActions extends React.PureComponent<Props> {

  constructor(props) {
    super(props);
    this.changeVenmoState = this.changeVenmoState.bind(this);
    this.closeModal = this.closeModal.bind(this);

    this.state = {
      venmoEnable: true,
    };
  }

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



  closeModal = close => {
    if (close) {
      this.props.closeModal();
    }
  };

  getViewStyle(view) {
    if (!this.state.venmoEnable) {
      return { position: 'absolute', height: '100%', width: '100%', zIndex: 997 };
    } else if (view === 'Anchor') {
      return { display: 'flex' };
    } else if (view === 'ButtonView') {
      return { position: 'relative' };
    } else if (view === 'ButtonWrapper') {
      return {
        marginRight: 10,
        marginLeft: 10,
        display: 'flex',
        flexDirection: 'row',
        marginTop: 20,
      };
    }
  }

  changeVenmoState = isVenmoEnable => {
    this.setState({ venmoEnable: isVenmoEnable });
    if (isVenmoEnable) {
      this.props.hideHeader(false);
    } else {
      this.props.hideHeader(true);
    }
  };

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
      <View style={this.getViewStyle('Anchor')}>
        {showAddTobag && (
          <View style={this.getViewStyle('ButtonWrapper')}>
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
          </View>
        )}
        {(isNoNEmptyBag || fromAddedToBagModal) && (
          <View style={this.getViewStyle('ButtonView')}>
            <View style={this.getViewStyle('ButtonWrapper')}>
              <PayPalButton
                getPayPalSettings={getPayPalSettings}
                navigation={navigation}
                setVenmoState={this.changeVenmoState}
                closeModal={this.closeModal}
              />
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
            </View>
          </View>
        )}

        {(isNoNEmptyBag || fromAddedToBagModal) &&
          this.state.venmoEnable &&
          this.getVenmoPaymentButton()}
        <CheckoutModals navigation={navigation} />
      </View>
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
