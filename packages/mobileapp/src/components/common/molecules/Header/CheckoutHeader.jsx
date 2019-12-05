import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import BodyCopy from '@tcp/core/src/components/common/atoms/BodyCopy';
import { getLocator } from '@tcp/core/src/utils';
import ToastContainer from '@tcp/core/src/components/common/atoms/Toast/container/Toast.container.native';
import { toastMessageInfo } from '@tcp/core/src/components/common/atoms/Toast/container/Toast.actions.native';
import CheckoutSelectors, {
  isExpressCheckout,
} from '@tcp/core/src/components/features/CnC/Checkout/container/Checkout.selector';
import { getSetCheckoutStage } from '@tcp/core/src/components/features/CnC/Checkout/container/Checkout.action';
import checkoutUtil from '@tcp/core/src/components/features/CnC/Checkout/util/utility';
import BagPageSelector from '@tcp/core/src/components/features/CnC/BagPage/container/BagPage.selectors';
import CHECKOUT_CONSTANTS from '@tcp/core/src/components/features/CnC/Checkout/Checkout.constants';
import { getLabelValue } from '@tcp/core/src/utils/utils';
import {
  MessageContainer,
  StoreContainer,
  SafeAreaViewStyle,
  ImageColor,
  CheckoutHeaderContainer,
  CheckoutHeaderTextSection,
  BackIcon,
  BackIconTouchable,
} from './Header.style';
import { INTERNET_OFF } from './Header.constants';

const { getCheckoutProgressBarLabels, getCurrentCheckoutStage } = CheckoutSelectors;

/**
 * This component creates Mobile Header
 * @param {*} props Props passed from Header screen
 */

const leftIcon = require('../../../../assets/images/carrot-large-left.png');

/**
 * This component creates Mobile Header.
 * 1. To Manage the store locator
 * 2. To Navigate the cart page & show cart quantity
 * 3. To show the welcome text for guest user
 *     and shoe the name fro register user
 */
class CheckoutHeader extends React.PureComponent {
  constructor(props) {
    super(props);
    const { cartOrderItems, checkoutProgressBarLabels, currentStage } = props;
    const { CHECKOUT_STAGES } = CHECKOUT_CONSTANTS;
    this.state = { currentStage: currentStage || 'Shipping' };
    this.availableStages =
      checkoutUtil.getAvailableStages(cartOrderItems, checkoutProgressBarLabels) || CHECKOUT_STAGES;
  }

  componentDidUpdate(prevProps) {
    const { currentStage: prevCurrentStage } = prevProps;
    const { currentStage } = this.props;
    if (prevCurrentStage !== currentStage) {
      this.updateState({ currentStage });
    }
    this.noInterNetHandle(prevProps);
  }

  onBackPress = () => {
    const { navigation, setCheckoutStage } = this.props;
    const { currentStage } = this.state;
    const currentStageIndex = this.availableStages.indexOf(currentStage.toLowerCase());
    if (currentStageIndex > 0) {
      const stageToRoute = this.availableStages[currentStageIndex - 1];
      setCheckoutStage(stageToRoute);
    } else {
      navigation.goBack();
    }
  };

  updateState({ currentStage }) {
    this.setState({ currentStage });
  }

  noInterNetHandle(prevProps) {
    const {
      screenProps: {
        network: { isConnected },
      },
      toastMessage,
    } = this.props;
    const {
      screenProps: {
        network: { isConnected: PrevIsConnected },
      },
    } = prevProps;
    if (isConnected !== PrevIsConnected && !isConnected) {
      toastMessage(INTERNET_OFF);
    }
  }

  render() {
    const { isExpressCheckoutPage, checkoutHeaderLabels, isPayPalWebViewEnable } = this.props;
    const { expressCheckoutLbl, checkoutHeaderLabel } = checkoutHeaderLabels;
    return (
      <SafeAreaViewStyle>
        {!isPayPalWebViewEnable && (
          <>
            <ToastContainer />
            <CheckoutHeaderContainer data-locator={getLocator('global_headerpanel')}>
              <MessageContainer>
                <StoreContainer>
                  <BackIconTouchable onPress={this.onBackPress}>
                    <BackIcon
                      source={leftIcon}
                      style={ImageColor}
                      data-locator={getLocator('global_headerpanelcollapsedicon')}
                      accessibilityRole="button"
                    />
                  </BackIconTouchable>
                </StoreContainer>
              </MessageContainer>
              <CheckoutHeaderTextSection>
                <BodyCopy
                  fontFamily="primary"
                  fontSize="fs12"
                  fontWeight="semibold"
                  text={isExpressCheckoutPage ? expressCheckoutLbl : checkoutHeaderLabel}
                  color="gray.900"
                />
              </CheckoutHeaderTextSection>
            </CheckoutHeaderContainer>
          </>
        )}
      </SafeAreaViewStyle>
    );
  }
}

const mapStateToProps = state => {
  return {
    checkoutHeaderLabels: {
      checkoutHeaderLabel: getLabelValue(
        state.Labels,
        'lbl_checkoutheader_checkout',
        'checkoutHeader',
        'checkout'
      ),
      expressCheckoutLbl: getLabelValue(
        state.Labels,
        'lbl_checkoutHeader_expressCheckout',
        'checkoutHeader',
        'checkout'
      ),
    },
    isExpressCheckoutPage: isExpressCheckout(state),
    cartOrderItems: BagPageSelector.getOrderItems(state),
    checkoutProgressBarLabels: getCheckoutProgressBarLabels(state),
    currentStage: getCurrentCheckoutStage(state),
    isPayPalWebViewEnable: BagPageSelector.getPayPalWebViewStatus(state),
  };
};

export const mapDispatchToProps = dispatch => {
  return {
    setCheckoutStage: payload => {
      dispatch(getSetCheckoutStage(payload));
    },
    toastMessage: payload => {
      dispatch(toastMessageInfo(payload));
    },
  };
};

CheckoutHeader.propTypes = {
  cartOrderItems: PropTypes.shape([]).isRequired,
  checkoutProgressBarLabels: PropTypes.shape({}).isRequired,
  currentStage: PropTypes.string.isRequired,
  navigation: PropTypes.shape({}).isRequired,
  setCheckoutStage: PropTypes.func.isRequired,
  isExpressCheckoutPage: PropTypes.bool,
  checkoutHeaderLabels: PropTypes.shape({}),
  isPayPalWebViewEnable: PropTypes.bool,
  screenProps: PropTypes.shape({}),
  toastMessage: PropTypes.func,
};

CheckoutHeader.defaultProps = {
  isExpressCheckoutPage: false,
  checkoutHeaderLabels: {
    lbl_checkoutheader_checkout: '',
    lbl_checkoutHeader_expressCheckout: '',
  },
  isPayPalWebViewEnable: false,
  screenProps: {},
  toastMessage: () => {},
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CheckoutHeader);
export { CheckoutHeader as CheckoutHeaderVanilla };
