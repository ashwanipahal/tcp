import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'next/router';
import { PropTypes } from 'prop-types';
import CheckoutProgressIndicatorComponent from '../views';
import utils from '../../../../../../../core/src/utils';
import BAG_PAGE_ACTIONS from '../../../../../../../core/src/components/features/CnC/BagPage/container/BagPage.actions';
import BagPageSelector from '../../../../../../../core/src/components/features/CnC/BagPage/container/BagPage.selectors';
import CheckoutProgressUtils from '../utils/utils';

export class CheckoutProgressIndicator extends React.Component {
  componentWillMount = () => {
    const { initialActions } = this.props;
    initialActions();
  };

  render() {
    const { router, cartOrderItems, moveToCheckoutStage } = this.props;

    const availableStages = CheckoutProgressUtils.getAvailableStages(cartOrderItems);

    const activeStageUrl = utils.getObjectValue(router, undefined, 'query', 'subSection');
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
    isMobile: false,
    cartOrderItems: BagPageSelector.getOrderItems(state),
  };
};

export const mapDispatchToProps = dispatch => {
  return {
    initialActions: () => {
      dispatch(BAG_PAGE_ACTIONS.getCartData());
      dispatch(BAG_PAGE_ACTIONS.getOrderDetails());
    },
    moveToCheckoutStage: stageName => {
      dispatch(CheckoutProgressUtils.moveToStage(stageName));
    },
  };
};

CheckoutProgressIndicator.propTypes = {
  router: PropTypes.shape({}).isRequired,
  initialActions: PropTypes.func.isRequired,
  cartOrderItems: PropTypes.shape([]).isRequired,
  moveToCheckoutStage: PropTypes.func.isRequired,
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(CheckoutProgressIndicator)
);
