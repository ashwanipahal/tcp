import React from 'react';
import { PropTypes } from 'prop-types';
import { View } from 'react-native';
import { getLocator } from '@tcp/core/src/utils';
import CheckoutConstants from '../../../Checkout.constants';
import Anchor from '../../../../../../common/atoms/Anchor';

import {
  StepIndicatorContainer,
  ProgressStep,
  ProgressDot,
  ProgressBar,
  ProgressDotIcon,
  StyledDisableLabels,
  CheckoutProgressBar,
  ProgressDotActive,
  StyledAnchor,
  StyledAnchorCompleted,
} from '../styles/CheckoutProgressIndicator.style.native';

const completedStage = require('../../../../../../../assets/checkout-tick.png');

export class CheckoutProgressIndicator extends React.PureComponent {
  routeToPickup = () => {
    const { navigation } = this.props;
    navigation.navigate(CheckoutConstants.CHECKOUT_ROUTES_NAMES.CHECKOUT_PICKUP);
  };

  render() {
    const { activeStage, availableStages } = this.props;
    let hasSeenActive = false;
    return (
      <CheckoutProgressBar>
        <StepIndicatorContainer>
          {availableStages.map((stage, index) => {
            if (availableStages[index].toLowerCase() === activeStage.toLowerCase()) {
              hasSeenActive = true;
              return (
                <>
                  {index === availableStages.length - 1 ? (
                    <View>
                      <ProgressDotActive />
                      <StyledDisableLabels>{stage}</StyledDisableLabels>
                    </View>
                  ) : (
                    <ProgressStep>
                      <ProgressDotActive />
                      <ProgressBar />
                      <StyledAnchor>
                        <Anchor
                          fontSizeVariation="large"
                          fontFamily="secondary"
                          anchorVariation="primary"
                          fontWeightVariation="active"
                          onPress={this.routeToPickup}
                          dataLocator=""
                          text={stage}
                        />
                      </StyledAnchor>
                    </ProgressStep>
                  )}
                </>
              );
            }
            if (hasSeenActive) {
              return (
                <>
                  {index === availableStages.length - 1 ? (
                    <View>
                      <ProgressDot />
                      <StyledDisableLabels>{stage}</StyledDisableLabels>
                    </View>
                  ) : (
                    <ProgressStep>
                      <ProgressDot />
                      {index !== availableStages.length - 1 && <ProgressBar />}
                      <StyledDisableLabels>{stage}</StyledDisableLabels>
                    </ProgressStep>
                  )}
                </>
              );
            }
            return (
              <ProgressStep>
                <ProgressDotIcon
                  source={completedStage}
                  data-locator={getLocator('global_headerpanelbagicon')}
                />
                <ProgressBar />
                <StyledAnchorCompleted>
                  <Anchor
                    fontSizeVariation="large"
                    fontFamily="secondary"
                    anchorVariation="primary"
                    fontWeightVariation="active"
                    onPress={this.routeToPickup}
                    dataLocator=""
                    text={stage}
                  />
                </StyledAnchorCompleted>
              </ProgressStep>
            );
          })}
        </StepIndicatorContainer>
      </CheckoutProgressBar>
    );
  }
}
CheckoutProgressIndicator.propTypes = {
  activeStage: PropTypes.string.isRequired,
  navigation: PropTypes.shape({}),
  availableStages: PropTypes.shape([]).isRequired,
};
CheckoutProgressIndicator.defaultProps = {
  navigation: null,
};

export default CheckoutProgressIndicator;
