import React from 'react';
import PropTypes from 'prop-types';
import { NavigationActions } from 'react-navigation';
import BodyCopy from '../../../../common/atoms/BodyCopy';
import {
  ButtonWrapperAddedToBag,
  ButtonWrapper,
  ActionsWrapper,
  ViewBagButton,
  CheckoutButton,
  PaymentsButtonWrapper,
  ButtonViewWrapper,
  VenmoPaypalWrapper,
  PaypalPaymentsButtonWrapper,
} from '../styles/AddedToBagActions.style.native';
import ADDEDTOBAG_CONSTANTS from '../../AddedToBag/AddedToBag.constants';
import CheckoutModals from '../../common/organism/CheckoutModals';
import VenmoPaymentButton from '../../../../common/atoms/VenmoPaymentButton';
import PayPalButton from '../../common/organism/PayPalButton';

class AddedToBagActions extends React.PureComponent<Props> {
  constructor(props) {
    super(props);
    this.closeModal = this.closeModal.bind(this);

    this.state = {
      venmoEnable: true,
    };
  }

  getVenmoButton = () => {
    const { handleCartCheckout, isEditingItem, navigation, closeModal } = this.props;
    return (
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
    );
  };

  getPaypalButton = (addWrapper, fullWidth) => {
    const {
      getPayPalSettings,
      payPalTop,
      navigation,
      orderId,
      isPayPalEnabled,
      isPayPalWebViewEnable,
      hideHeader,
      fromAddedToBagModal,
    } = this.props;
    if (orderId && isPayPalEnabled) {
      if (addWrapper) {
        return (
          <PaypalPaymentsButtonWrapper isPayPalWebViewEnable={isPayPalWebViewEnable}>
            <PayPalButton
              getPayPalSettings={getPayPalSettings}
              navigation={navigation}
              setVenmoState={() => {
                if (fromAddedToBagModal) hideHeader(!isPayPalWebViewEnable);
              }}
              closeModal={this.closeModal}
              top={payPalTop}
              fullWidth
            />
          </PaypalPaymentsButtonWrapper>
        );
      } else {
        return (
          <PayPalButton
            getPayPalSettings={getPayPalSettings}
            navigation={navigation}
            setVenmoState={() => {
              if (fromAddedToBagModal) hideHeader(!isPayPalWebViewEnable);
            }}
            closeModal={this.closeModal}
            top={payPalTop}
            fullWidth
          />
        );
      }
    } else {
      return null;
    }
  };

  /**
   * @description - render paypal and venmo CTAs
   */
  getVenmoPaypalPaymentButton(isVenmoFlag, showVenmoPayPalButton, isPayPalWebViewEnable) {
    return (
      isVenmoFlag &&
      showVenmoPayPalButton && (
        <VenmoPaypalWrapper isPayPalWebViewEnable={isPayPalWebViewEnable}>
          {this.getPaypalButton(true, true)}
          <PaymentsButtonWrapper>{this.getVenmoButton()}</PaymentsButtonWrapper>
        </VenmoPaypalWrapper>
      )
    );
  }

  closeModal = close => {
    const { closeModal } = this.props;
    if (close) {
      closeModal();
    }
  };

  /**
   * @description - condition to show venmo and paypal CTA on next line
   */
  showVenmoPaypalButton = () => {
    const { venmoEnable } = this.state;
    const { isNoNEmptyBag, fromAddedToBagModal, isPayPalEnabled, isVenmoEnabled } = this.props;
    return (
      isNoNEmptyBag && !fromAddedToBagModal && venmoEnable && isPayPalEnabled && isVenmoEnabled
    );
  };

  isBottomGap = (isVenmoFlag, showVenmoPayPalButton, showAddTobag) => {
    return !(isVenmoFlag && showVenmoPayPalButton) && !showAddTobag;
  };

  isAnyOneEnabled = (isVenmoFlag, isPayPalEnabled) => {
    return isVenmoFlag || isPayPalEnabled;
  };

  isCheckoutButtonHalf = (isVenmoFlag, isPayPalEnabled, showVenmoPayPalButton) => {
    return this.isAnyOneEnabled(isVenmoFlag, isPayPalEnabled) && !showVenmoPayPalButton;
  };

  getRowOneButtons = () => {
    const {
      labels,
      showAddTobag,
      handleCartCheckout,
      isEditingItem,
      navigation,
      closeModal,
      isNoNEmptyBag,
      fromAddedToBagModal,
      isVenmoEnabled,
      isPayPalEnabled,
      isPayPalWebViewEnable,
    } = this.props;

    const { venmoEnable } = this.state;
    const isVenmoFlag = isVenmoEnabled && venmoEnable;
    const showVenmoPayPalButton = this.showVenmoPaypalButton();

    if (isNoNEmptyBag || fromAddedToBagModal) {
      return (
        <ButtonViewWrapper
          isBottomGap={this.isBottomGap(isVenmoFlag, showVenmoPayPalButton, showAddTobag)}
          isPayPalWebViewEnable={isPayPalWebViewEnable}
        >
          <ButtonWrapper
            isBothDisabled={this.isAnyOneEnabled(isVenmoFlag, isPayPalEnabled)}
            isPayPalWebViewEnable={isPayPalWebViewEnable}
          >
            {!showVenmoPayPalButton && (
              <PaypalPaymentsButtonWrapper
                isAddedTobag={showAddTobag}
                isPayPalEnabled={isPayPalEnabled}
                isPayPalWebViewEnable={isPayPalWebViewEnable}
              >
                {this.getPaypalButton(false, !fromAddedToBagModal)}
                {!showAddTobag && this.getVenmoButton()}
              </PaypalPaymentsButtonWrapper>
            )}
            {!isPayPalWebViewEnable && (
              <CheckoutButton
                isHalf={this.isCheckoutButtonHalf(
                  isVenmoFlag,
                  isPayPalEnabled,
                  showVenmoPayPalButton
                )}
                isAddedTobag={showAddTobag}
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
            )}
          </ButtonWrapper>
        </ButtonViewWrapper>
      );
    } else {
      return null;
    }
  };

  render() {
    const { labels, showAddTobag, isVenmoEnabled, isPayPalWebViewEnable, navigation } = this.props;
    const { venmoEnable } = this.state;
    const isVenmoFlag = isVenmoEnabled && venmoEnable;
    const showVenmoPayPalButton = this.showVenmoPaypalButton();
    return (
      <ActionsWrapper isPayPalWebViewEnable={isPayPalWebViewEnable}>
        {showAddTobag && !isPayPalWebViewEnable && (
          <ButtonWrapperAddedToBag isPayPalWebViewEnable={!isVenmoFlag && !showAddTobag}>
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
          </ButtonWrapperAddedToBag>
        )}
        {this.getRowOneButtons()}
        {this.getVenmoPaypalPaymentButton(
          isVenmoFlag,
          showVenmoPayPalButton,
          isPayPalWebViewEnable
        )}
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
  hideHeader: PropTypes.func,
};

AddedToBagActions.defaultProps = {
  showAddTobag: true,
  closeModal: () => {},
  fromAddedToBagModal: false,
  payPalTop: 0,
  hideHeader: () => {},
};

export default AddedToBagActions;
