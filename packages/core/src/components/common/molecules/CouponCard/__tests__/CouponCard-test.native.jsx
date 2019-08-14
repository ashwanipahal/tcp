import React from 'react';
import { shallow } from 'enzyme';
import { CouponCardVanilla } from '../views/CouponCard.view';
import Anchor from '../../../atoms/Anchor';

describe('CouponCard Component', () => {
  const availableCoupon = {
    id: 'Y00105578',
    status: 'available',
    labelStatus: 'APPLY',
    isExpiring: true,
    title: '$10 OFF On $50',
    detailsOpen: false,
    expirationDate: '8/10/19',
    effectiveDate: '8/6/19',
    details: null,
    legalText: '$10 OFF On $50',
    isStarted: true,
    offerType: 'saving',
    error: '',
    promotionType: 'public',
    expirationDateTimeStamp: '2019-08-10T18:29:00.001Z',
  };

  it('should renders correctly when addresses are not present', () => {
    const props = {
      labels: {},
      coupon: availableCoupon,
    };
    const component = shallow(<CouponCardVanilla {...props} />);
    expect(component).toMatchSnapshot();
  });

  it.skip('should renders correctly when error present', () => {
    const mock = jest.fn();
    availableCoupon.error = 'error';
    const props = {
      labels: {},
      coupon: availableCoupon,
      handleErrorCoupon: mock,
    };
    const component = shallow(<CouponCardVanilla {...props} />);
    expect(mock).toHaveBeenCalled();
    expect(component).toMatchSnapshot();
  });

  it.skip('should call detail modal click', () => {
    const mock = jest.fn();
    const props = {
      labels: {},
      coupon: availableCoupon,
      couponDetailClick: mock,
    };
    const component = shallow(<CouponCardVanilla {...props} />);
    component.find(Anchor).simulate('click', { preventDefault: jest.fn() });
    expect(component.find(Anchor)).toHaveLength(1);
    expect(mock).toHaveBeenCalled();
  });
});
