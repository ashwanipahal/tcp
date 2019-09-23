import { fromJS } from 'immutable';
import billingSectionSelectors from '../BillingSection.selectors';

describe('Billing Section Selectors', () => {
  it('getReviewPageLabels should return review Page Labels', () => {
    const state = {
      Labels: {
        checkout: {
          review: {
            lbl_review_billingSectionTitle: 'Billing',
          },
        },
      },
    };
    expect(
      billingSectionSelectors.getReviewPageLabels(state).lbl_review_billingSectionTitle
    ).toEqual('Billing');
  });

  // TODO : Skipping it as it will be fixed after the immutable decision
  // ignoring it with istanbul ignore also.
  it.skip('getReviewPageLabels should return review Page Labels', () => {
    const state = {
      Checkout: fromJS({
        values: {
          billing: {},
        },
      }),
    };
    const cardDetails = {
      billing: { cardNumber: '************1234', cardType: 'MC' },
    };
    state.Checkout.setIn(['values', 'billing'], cardDetails);
    expect(billingSectionSelectors.getBillingCardDetails(state).cardNumber).toEqual('1234');
  });
});
