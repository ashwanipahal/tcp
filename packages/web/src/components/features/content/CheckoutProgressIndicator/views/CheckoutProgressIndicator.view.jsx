import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import CHECKOUT_STAGES from '../../../../../pages/App.constants';
import StepIndicator from './StepIndicator.view';
import styles from '../StepIndicator.style';

const CHECKOUT_STAGE_PROP_TYPE = PropTypes.oneOf(
  Object.keys(CHECKOUT_STAGES).map(key => CHECKOUT_STAGES[key])
);

export class CheckoutProgressIndicator extends React.Component {
  static propTypes = {
    isMobile: PropTypes.bool.isRequired,
    /** indicates the active step in the checkout */
    activeStage: CHECKOUT_STAGE_PROP_TYPE.isRequired,
    /** callback to change stages in the checkout process * */
    moveToCheckoutStage: PropTypes.func.isRequired,
    /** the available stages in the current checkout flow <strong>in order</strong> */
    availableStages: PropTypes.arrayOf(CHECKOUT_STAGE_PROP_TYPE).isRequired,
    className: PropTypes.string.isRequired,
  };

  static stageNamesTable = {
    [CHECKOUT_STAGES.PICKUP]: 'Pickup',
    [CHECKOUT_STAGES.SHIPPING]: 'Shipping',
    [CHECKOUT_STAGES.BILLING]: 'Billing',
    [CHECKOUT_STAGES.REVIEW]: 'Review',
  };

  constructor(props) {
    super(props);
    const { moveToCheckoutStage } = this.props;
    this.moveToCallbackTable = {
      [CHECKOUT_STAGES.PICKUP]: () => moveToCheckoutStage(CHECKOUT_STAGES.PICKUP),
      [CHECKOUT_STAGES.SHIPPING]: () => moveToCheckoutStage(CHECKOUT_STAGES.SHIPPING),
      [CHECKOUT_STAGES.BILLING]: () => moveToCheckoutStage(CHECKOUT_STAGES.BILLING),
      [CHECKOUT_STAGES.REVIEW]: () => moveToCheckoutStage(CHECKOUT_STAGES.REVIEW),
    };
  }

  render() {
    const { activeStage, availableStages, isMobile, className } = this.props;
    let hasSeenActive = false;
    let checkoutProgressClass = 'checkout-progress-bar ';

    if (!isMobile) {
      checkoutProgressClass += 'desktop ';
    }

    if (availableStages && availableStages.length > 3) {
      checkoutProgressClass += 'pickup-shipping';
    }

    return (
      <div className={className}>
        <div className="checkout-progress-indicator">
          <ul className={checkoutProgressClass}>
            {availableStages.map((stage, index) => {
              if (availableStages[index] === activeStage) {
                hasSeenActive = true;
                return (
                  <StepIndicator
                    isActive
                    key={stage}
                    name={CheckoutProgressIndicator.stageNamesTable[stage]}
                  />
                );
              }
              if (hasSeenActive) {
                return (
                  <StepIndicator
                    key={stage}
                    name={CheckoutProgressIndicator.stageNamesTable[stage]}
                  />
                );
              }
              return (
                <StepIndicator
                  isComplete
                  stage={stage}
                  onClick={this.moveToCallbackTable[stage]}
                  name={CheckoutProgressIndicator.stageNamesTable[stage]}
                />
              );
            })}
          </ul>
        </div>
      </div>
    );
  }
}

export default withStyles(CheckoutProgressIndicator, styles);
