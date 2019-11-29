import React from 'react';
import { shallow } from 'enzyme';
import { PersonalizedCoupon } from '../PersonalizedCoupon.view.native';

let props = {};
jest.mock('@tcp/core/src/utils', () => ({
  ...jest.requireActual('@tcp/core/src/utils'),
  viewport: jest.fn(),
}));

describe('PersonalizedCoupon View', () => {
  beforeEach(() => {
    props = {
      coupon: {
        description: 'description',
        startDate: 'Oct 2nd, 2019',
        endDate: 'Oct 15th, 2019',
        code: 'Y16905Y9W1RIWT',
        disclaimer: '20% OFF YOUR ENTIRE PURCHASE',
        categoryType: 'Marketing_Offers',
        isPastStartDate: true,
      },
      className: 'className',
      printCoupon: jest.fn(),
      detailCoupon: jest.fn(),
      labels: {
        heading1: 'Special Coupons just for you!',
        heading2: '(Coupon(s) will also he included in your oder emails.)',
        webCode: 'WEB CODE: ',
        validTill: 'Valid',
        nowThrough: 'Now through',
        detailsLink: 'details',
      },
    };
  });

  it('should render correctly', () => {
    const tree = shallow(<PersonalizedCoupon {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
