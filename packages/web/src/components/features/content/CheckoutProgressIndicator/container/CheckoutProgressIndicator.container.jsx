import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'next/router';
import { PropTypes } from 'prop-types';
import BagPageSelector from '@tcp/core/src/components/features/CnC/BagPage/container/BagPage.selectors';
import CheckoutProgressIndicatorComponent from '../views';
import utils from '../../../../../../../core/src/utils';
import CheckoutProgressUtils from '../utils/utils';

export class CheckoutProgressIndicator extends React.PureComponent {
  render() {
    const { router, cartOrderItems, moveToCheckoutStage } = this.props;

    const availableStages = CheckoutProgressUtils.getAvailableStages(cartOrderItems);

    const activeStageUrl = utils.getObjectValue(router, undefined, 'query', 'section');
    return (
      <CheckoutProgressIndicatorComponent
        activeStage={activeStageUrl}
        availableStages={availableStages}
        moveToCheckoutStage={moveToCheckoutStage}
      />
    );
  }
}
const mapStateToProps = state => {
  return {
    cartOrderItems: BagPageSelector.getOrderItems(state),
  };
};

export const mapDispatchToProps = () => {
  return {
    moveToCheckoutStage: CheckoutProgressUtils.moveToStage,
  };
};

CheckoutProgressIndicator.propTypes = {
  router: PropTypes.shape({}).isRequired,
  cartOrderItems: PropTypes.shape([]).isRequired,
  moveToCheckoutStage: PropTypes.func.isRequired,
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(CheckoutProgressIndicator)
);
