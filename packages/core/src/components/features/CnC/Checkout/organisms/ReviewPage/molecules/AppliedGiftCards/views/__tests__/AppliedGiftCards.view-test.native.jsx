import React from 'react';
import { shallow } from 'enzyme';
import { fromJS } from 'immutable';
import { AppliedGiftCards } from '../AppliedGiftCards.view';

describe('AppliedGiftCards', () => {
  it('should render correctly for empty state', () => {
    const props = {
      labels: {},
      className: '',
      appliedGiftCards: fromJS([]),
    };
    const tree = shallow(<AppliedGiftCards {...props} />);
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly for filled state', () => {
    const props = {
      labels: {
        lbl_review_appliedGiftCardEndingIn: 'ending in',
        lbl_review_appliedGiftCardRemainingBal: 'Remaining Balance',
        lbl_review_appliedGiftCardsNone: 'None',
        lbl_review_giftCardHeadsup: 'Heads Up!',
        lbl_review_giftCardMessage:
          'Please keep you Gift Card until you receive the item(s) purchased.',
      },
      className: '',
      appliedGiftCards: fromJS([
        {
          id: '1',
          endingNumbers: '4321',
          remainingBalance: 0,
        },
        {
          id: '2',
          endingNumbers: '1234',
          remainingBalance: 15,
        },
      ]),
    };
    const tree = shallow(<AppliedGiftCards {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
