import React from 'react';
import { shallow } from 'enzyme';
import { CouponCardVanilla } from '../views/CouponCard.view';
import Anchor from '../../../atoms/Anchor';

describe('CouponCard Component', () => {
  let component;
  const props = {
    labels: {},
    coupon: {
      id: 'Y00105578',
      status: 'available',
      isExpiring: true,
      title: '$10 OFF On $50',
      detailsOpen: false,
      expirationDate: '8/10/19',
      effectiveDate: '8/6/19',
      details: null,
      legalText: '$20 OFF On $50',
      isStarted: true,
      error: null,
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
      coupon: {
        id: 'Y00105578',
        status: 'available',
        isExpiring: true,
        title: '$30 OFF On $50',
        detailsOpen: false,
        expirationDate: '8/10/19',
        effectiveDate: '8/6/19',
        details: null,
        legalText: '$40 OFF On $50',
        isStarted: true,
        error: null,
        promotionType: 'public',
        expirationDateTimeStamp: '2019-08-10T18:29:00.001Z',
      },
      couponDetailClick: couponJestDetailClick,
    };
    const componentObj = shallow(<CouponCardVanilla {...propsNew} />);
    componentObj.find(Anchor).simulate('click', { preventDefault: jest.fn() });
    expect(componentObj.find(Anchor)).toHaveLength(1);
    expect(couponJestDetailClick).toHaveBeenCalled();
  });
});
