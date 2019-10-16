import React from 'react';
import { Text } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getLocator } from '@tcp/core/src/utils';
import ToastContainer from '@tcp/core/src/components/common/atoms/Toast/container/Toast.container.native';
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
  }

  onBackPress = () => {
    const { navigation, setCheckoutStage } = this.props;
    const { currentStage } = this.state;
    const currentStageIndex = this.availableStages.indexOf(currentStage);
    if (currentStageIndex) {
      const stageToRoute = this.availableStages[currentStageIndex - 1];
      setCheckoutStage(stageToRoute);
    } else {
      navigation.goBack();
    }
  };

  updateState(currentStage) {
    this.setState({ currentStage });
  }

  render() {
    const { isExpressCheckoutPage, checkoutHeaderLabels } = this.props;
    const { expressCheckoutLbl, checkoutHeaderLabel } = checkoutHeaderLabels;
    return (
      <SafeAreaViewStyle>
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
            <Text className="product-name">
              {isExpressCheckoutPage ? expressCheckoutLbl : checkoutHeaderLabel}
            </Text>
          </CheckoutHeaderTextSection>
        </CheckoutHeaderContainer>
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
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setCheckoutStage: payload => {
      dispatch(getSetCheckoutStage(payload));
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
};

CheckoutHeader.defaultProps = {
  isExpressCheckoutPage: false,
  checkoutHeaderLabels: {
    lbl_checkoutheader_checkout: '',
    lbl_checkoutHeader_expressCheckout: '',
  },
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CheckoutHeader);
export { CheckoutHeader as CheckoutHeaderVanilla };
