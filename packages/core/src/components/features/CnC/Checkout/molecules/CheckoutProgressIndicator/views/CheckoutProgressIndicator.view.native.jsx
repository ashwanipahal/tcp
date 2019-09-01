import React from 'react';
import { Text } from 'react-native';
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
} from '../styles/CheckoutProgressIndicator.style.native';

const completedStage = require('../../../../../../../assets/checkout-tick.png');
const currentStage = require('../../../../../../../assets/checkout-white-dot.png');

export class CheckoutProgressIndicator extends React.PureComponent {
  render() {
    const { activeStage, navigation } = this.props;
    const availableStages = ['pickup', 'shipping', 'billing', 'review', 'confirmation'];
    let hasSeenActive = false;
    return (
      <>
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
          {availableStages.map(stage => {
            return (
              <ProgressStepLabels>
                {/* <Button>{stage}</Button> */}
                <Anchor
                  fontSizeVariation="small"
                  fontFamily="secondary"
                  // underline
                  anchorVariation="primary"
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
      </>
    );
  }
}

export default CheckoutProgressIndicator;
