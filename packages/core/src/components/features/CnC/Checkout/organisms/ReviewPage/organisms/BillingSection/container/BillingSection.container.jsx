import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import BillingSection from '../views';
import giftCardSelectors from '../../../../GiftCardsSection/container/GiftCards.selectors';
import checkoutSelectors from '../../../../../container/Checkout.selector';
import billingSectionSelectors from './BillingSection.selectors';

/**
 * @class BillingSectionContainer
 * @extends {PureComponent}
 */
class BillingSectionContainer extends PureComponent {
  static propTypes = {
    appliedGiftCards: PropTypes.shape([]),
    address: PropTypes.shape({}),
    card: PropTypes.shape({}),
    labels: PropTypes.shape({}),
  };

  static defaultProps = {
    appliedGiftCards: null,
    address: null,
    card: null,
    labels: {},
  };

  /**
   * @function render
   * @description Render the Billing Section component and pass the redux state as props into it.
   * @returns {JSX}
   * @memberof BillingSectionContainer
   */
  render() {
    return <BillingSection {...this.props} />;
  }
}

/**
 * @function mapStateToProps
 * @param {Object} state
 * @description Used for connect HOC to maps the state to props and pass to the connected component
 * @returns {Object}
 */
/* istanbul ignore next */
export const mapStateToProps = state => {
  const { address } = checkoutSelectors.getBillingValues(state);
  return {
    appliedGiftCards: giftCardSelectors.getAppliedGiftCards(state),
    card: billingSectionSelectors.getBillingCardDetails(state),
    labels: billingSectionSelectors.getReviewPageLabels(state),
    address,
  };
};

export default connect(mapStateToProps)(BillingSectionContainer);
export { BillingSectionContainer as BillingPageContainerVanilla };
