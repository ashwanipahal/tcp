import personalizedCouponsSelectors from '../PersonalizedCoupons.selectors';

describe('PersonalizedCoupons Selectors', () => {
  it('getConfirmationCouponLabels should return review Page Labels', () => {
    const state = {
      Labels: {
        checkout: {
          orderConfirmation: {
            lbl_odmCoupons_heading_1: 'Heading',
          },
        },
      },
    };
    expect(personalizedCouponsSelectors.getConfirmationCouponLabels(state).heading1).toEqual(
      'Heading'
    );
  });
});
