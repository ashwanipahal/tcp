import React from 'react';
import { PropTypes } from 'prop-types';
import { getLocator } from '@tcp/core/src/utils';
import CheckoutConstants from '../../../Checkout.constants';
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
  ProgressDotActive,
} from '../styles/CheckoutProgressIndicator.style.native';

const completedStage = require('../../../../../../../assets/checkout-tick.png');

export class CheckoutProgressIndicator extends React.PureComponent {
  routeToPickup = () => {
    const { navigation } = this.props;
    navigation.navigate(CheckoutConstants.CHECKOUT_PAGES_NAMES.CHECKOUT, {
      nextToRoot: CheckoutConstants.CHECKOUT_PAGES_NAMES.PICKUP,
    });
  };

  render() {
    const { activeStage } = this.props;
    const availableStages = CheckoutConstants.CHECKOUT_STAGES.STAGES_ARRAY; // taking these hardcoded as of now, these will come dynamic and will be taken care as part of standard checkout ticket.
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
                  <ProgressDotActive />
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
                    onPress={this.routeToPickup}
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
                  onPress={this.routeToPickup}
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
