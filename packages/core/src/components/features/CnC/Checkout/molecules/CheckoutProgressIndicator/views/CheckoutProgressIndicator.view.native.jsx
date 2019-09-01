import React from 'react';
import { PropTypes } from 'prop-types';
import { getLocator } from '@tcp/core/src/utils';
import Anchor from '../../../../../../common/atoms/Anchor';

import {
  StepIndicatorContainer,
  ProgressStep,
  ProgressDot,
  ProgressBar,
  ProgressStepLabels,
  StepIndicatorLabelsContainer,
  ProgressDotIcon,
  StyledDisableLabels,
  CheckoutProgressBar,
} from '../styles/CheckoutProgressIndicator.style.native';

const completedStage = require('../../../../../../../assets/checkout-tick.png');
const currentStage = require('../../../../../../../assets/checkout-white-dot.png');

export class CheckoutProgressIndicator extends React.PureComponent {
  render() {
    const { activeStage, navigation } = this.props;
    const availableStages = ['pickup', 'shipping', 'billing', 'review'];
    let hasSeenActive = false;
    let hasSeenActiveLabel = false;
    return (
      <CheckoutProgressBar>
        <StepIndicatorContainer>
          {availableStages.map((stage, index) => {
            if (availableStages[index] === activeStage) {
              hasSeenActive = true;
              return (
                <ProgressStep>
                  <ProgressDotIcon
                    source={currentStage}
                    data-locator={getLocator('global_headerpanelbagicon')}
                  />
                  <ProgressBar />
                </ProgressStep>
              );
            }
            if (hasSeenActive) {
              return (
                <ProgressStep>
                  <ProgressDot />
                  {index !== availableStages.length - 1 && <ProgressBar />}
                </ProgressStep>
              );
            }
            return (
              <ProgressStep>
                <ProgressDotIcon
                  source={completedStage}
                  data-locator={getLocator('global_headerpanelbagicon')}
                />
                <ProgressBar />
              </ProgressStep>
            );
          })}
        </StepIndicatorContainer>
        <StepIndicatorLabelsContainer>
          {availableStages.map((stage, index) => {
            if (availableStages[index] === activeStage) {
              hasSeenActiveLabel = true;
              return (
                <ProgressStepLabels>
                  <Anchor
                    fontSizeVariation="large"
                    fontFamily="secondary"
                    anchorVariation="primary"
                    fontWeightVariation="active"
                    onPress={() => {
                      navigation.navigate('Checkout', { nextToRoot: 'pickupPage' });
                    }}
                    // noLink
                    to="/#"
                    dataLocator=""
                    text={stage}
                  />
                </ProgressStepLabels>
              );
            }
            if (hasSeenActiveLabel) {
              return (
                <ProgressStepLabels>
                  <StyledDisableLabels>{stage}</StyledDisableLabels>
                </ProgressStepLabels>
              );
            }
            return (
              <ProgressStepLabels>
                <Anchor
                  fontSizeVariation="large"
                  fontFamily="secondary"
                  anchorVariation="primary"
                  fontWeightVariation="active"
                  onPress={() => {
                    navigation.navigate('Checkout', { nextToRoot: 'pickupPage' });
                  }}
                  // noLink
                  to="/#"
                  dataLocator=""
                  text={stage}
                />
              </ProgressStepLabels>
            );
          })}
        </StepIndicatorLabelsContainer>
      </CheckoutProgressBar>
    );
  }
}
CheckoutProgressIndicator.propTypes = {
  activeStage: PropTypes.string.isRequired,
  navigation: PropTypes.shape({}),
};
CheckoutProgressIndicator.defaultProps = {
  navigation: null,
};

export default CheckoutProgressIndicator;
