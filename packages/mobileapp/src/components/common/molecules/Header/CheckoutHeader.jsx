import React from 'react';
import { Text } from 'react-native';
import { connect } from 'react-redux';
import { getLocator } from '@tcp/core/src/utils';
import { navigateToNestedRoute } from '@tcp/core/src/utils/utils.app';
import {
  MessageContainer,
  StoreContainer,
  SafeAreaViewStyle,
  ImageColor,
  CheckoutHeaderContainer,
  CheckoutHeaderTextSection,
  BackIcon,
  BackIconTouchable,
  StepIndicatorContainer,
  ProgressStep,
  ProgressDot,
  ProgressBar,
  ProgressStepLabels,
  StepIndicatorLabelsContainer,
  ProgressDotIcon,
} from './Header.style';

// @flow
type Props = {
  navigation: object,
  activeStage: string,
};

/**
 * This component creates Mobile Header
 * @param {*} props Props passed from Header screen
 */

const leftIcon = require('../../../../assets/images/carrot-large-left.png');
const completedStage = require('../../../../assets/images/checkout-tick.png');
const currentStage = require('../../../../assets/images/checkout-white-dot.png');

/**
 * This component creates Mobile Header.
 * 1. To Manage the store locator
 * 2. To Navigate the cart page & show cart quantity
 * 3. To show the welcome text for guest user
 *     and shoe the name fro register user
 */
class CheckoutHeader extends React.PureComponent<Props> {
  render() {
    const { navigation, activeStage } = this.props;

    console.log('activeStage', activeStage);

    return (
      <SafeAreaViewStyle>
        <CheckoutHeaderContainer data-locator={getLocator('global_headerpanel')}>
          <MessageContainer>
            <StoreContainer>
              <BackIconTouchable
                onPress={() => {
                  navigation.goBack();
                }}
              >
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
            <Text className="product-name">CHECKOUT</Text>
          </CheckoutHeaderTextSection>
        </CheckoutHeaderContainer>
        <StepIndicatorContainer>
          <ProgressStep>
            <ProgressDotIcon
              source={completedStage}
              data-locator={getLocator('global_headerpanelbagicon')}
            />
            <ProgressBar />
          </ProgressStep>
          <ProgressStep>
            <ProgressDotIcon
              source={currentStage}
              data-locator={getLocator('global_headerpanelbagicon')}
            />
            <ProgressBar />
          </ProgressStep>
          <ProgressStep>
            <ProgressDot />
            <ProgressBar />
          </ProgressStep>
          <ProgressStep>
            <ProgressDot />
          </ProgressStep>
        </StepIndicatorContainer>

        <StepIndicatorLabelsContainer>
          <ProgressStepLabels>
            <Text className="product-name">pickup</Text>
          </ProgressStepLabels>
          <ProgressStepLabels>
            <Text className="product-name">shippin</Text>
          </ProgressStepLabels>
          <ProgressStepLabels>
            <Text className="product-name">billing</Text>
          </ProgressStepLabels>
          <ProgressStepLabels>
            <Text className="product-name">review</Text>
          </ProgressStepLabels>
        </StepIndicatorLabelsContainer>
      </SafeAreaViewStyle>
    );
  }
}

const mapStateToProps = state => {
  return {
    labels: state.Labels.global && state.Labels.global.header,
    activeStage: state.Checkout.getIn(['uiFlags', 'stage']),
  };
};

export default connect(mapStateToProps)(CheckoutHeader);
export { CheckoutHeader as CheckoutHeaderVanilla };
