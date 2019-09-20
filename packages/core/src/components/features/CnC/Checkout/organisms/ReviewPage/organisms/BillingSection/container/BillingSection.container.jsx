import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import BillingSection from '../views';
import giftCardSelectors from '../../../../GiftCardsSection/container/GiftCards.selectors';
import checkoutSelectors from '../../../../../container/Checkout.selector';
import billingSectionSelectors from './BillingSection.selectors';

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

  render() {
    return <BillingSection {...this.props} />;
  }
}

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
