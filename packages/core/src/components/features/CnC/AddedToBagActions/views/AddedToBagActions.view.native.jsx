import React from 'react';
import PropTypes from 'prop-types';
import { NavigationActions } from 'react-navigation';
import BodyCopy from '../../../../common/atoms/BodyCopy';
import {
  ButtonWrapper,
  ActionsWrapper,
  ViewBagButton,
  CheckoutButton,
  PaymentsButtonWrapper,
  ButtonViewWrapper,
} from '../styles/AddedToBagActions.style.native';
import ADDEDTOBAG_CONSTANTS from '../../AddedToBag/AddedToBag.constants';
import CheckoutModals from '../../common/organism/CheckoutModals';
import VenmoPaymentButton from '../../../../common/atoms/VenmoPaymentButton';
import PayPalButton from '../../common/organism/PayPalButton';

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
    const { handleCartCheckout, isEditingItem, navigation, closeModal } = this.props;
    return (
      <PaymentsButtonWrapper>
        <VenmoPaymentButton
          className="venmo-container"
          onSuccess={() =>
            handleCartCheckout({
              isEditingItem,
              navigation,
              closeModal,
              navigationActions: NavigationActions,
              isVenmoProgress: true,
            })
          }
        />
      </PaymentsButtonWrapper>
    );
  }

  closeModal = close => {
    const { closeModal } = this.props;
    if (close) {
      closeModal();
    }
  };

  changeVenmoState = isVenmoEnable => {
    const { hideHeader } = this.props;
    this.setState({ venmoEnable: isVenmoEnable });
    hideHeader(!isVenmoEnable);
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
      orderId,
      payPalTop,
    } = this.props;

    const { venmoEnable } = this.state;
    return (
      <ActionsWrapper isPayPalWebViewEnable={!venmoEnable}>
        {showAddTobag && (
          <ButtonWrapper isPayPalWebViewEnable={!venmoEnable}>
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
          <ButtonViewWrapper isPayPalWebViewEnable={!venmoEnable}>
            <ButtonWrapper isPayPalWebViewEnable={!venmoEnable}>
              {orderId && (
                <PayPalButton
                  getPayPalSettings={getPayPalSettings}
                  navigation={navigation}
                  setVenmoState={this.changeVenmoState}
                  closeModal={this.closeModal}
                  top={payPalTop}
                />
              )}
              <CheckoutButton
                onPress={() => {
                  handleCartCheckout({
                    isEditingItem,
                    navigation,
                    closeModal,
                    navigationActions: NavigationActions,
                    isVenmoProgress: false,
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
          </ButtonViewWrapper>
        )}
        {(isNoNEmptyBag || fromAddedToBagModal) && venmoEnable && this.getVenmoPaymentButton()}
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
  payPalTop: PropTypes.number,
};

AddedToBagActions.defaultProps = {
  showAddTobag: true,
  closeModal: () => {},
  fromAddedToBagModal: false,
  payPalTop: 0,
};

export default AddedToBagActions;
