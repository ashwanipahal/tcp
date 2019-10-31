import React from 'react';
import { shallow } from 'enzyme';
import { CouponCardVanilla } from '../views/CouponCard.view';
import Button from '../../../atoms/Button';

describe('CouponCard Component', () => {
  let component;
  const props = {
    labels: {},
    commonLabels: {},
    coupon: {
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
    },
  };

  beforeEach(() => {
    component = shallow(<CouponCardVanilla {...props} />);
  });

  it('CouponCard should be defined', () => {
    expect(component).toBeDefined();
  });

  it('CouponCard should render correctly', () => {
    expect(component).toMatchSnapshot();
  });

  it('should call detail modal click', () => {
    const couponJestDetailClick = jest.fn();
    const propsNew = {
      labels: {},
      commonLabels: {},
      coupon: {
        id: 'Y00105580',
        status: 'applied',
        labelStatus: 'REMOVE',
        isExpiring: false,
        title: '$10off$50 TCP ONLY',
        detailsOpen: false,
        expirationDate: '12/31/99',
        effectiveDate: '7/31/19',
        details: null,
        legalText: '$10off$50 TCP ONLY',
        isStarted: true,
        offerType: 'PLACECASH',
        error: '',
        promotionType: 'public',
        expirationDateTimeStamp: '9999-12-31T18:29:59.999Z',
      },
      couponDetailClick: couponJestDetailClick,
    };
    const componentObj = shallow(<CouponCardVanilla {...propsNew} />);
    componentObj
      .find(Button)
      .first()
      .simulate('click', { preventDefault: jest.fn() });
    expect(couponJestDetailClick).toHaveBeenCalled();
  });
});
