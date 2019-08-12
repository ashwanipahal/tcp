import React from 'react';
import { shallow } from 'enzyme';
import { List } from 'immutable';
import { CouponListSectionVanilla } from '../views/CouponListSection.view';
import Anchor from '../../../atoms/Anchor';

const coupons = [
  {
    id: 'Y00105575',
    status: 'available',
    isExpiring: true,
    title: '$10 OFF on $50',
    detailsOpen: false,
    expirationDate: '8/10/19',
    effectiveDate: '8/6/19',
    details: null,
    legalText: '$10 OFF On $60',
    isStarted: true,
    error: null,
    promotionType: 'public',
    expirationDateTimeStamp: '2019-08-11T18:29:00.001Z',
  },
  {
    id: 'Y00105578',
    status: 'available',
    isExpiring: true,
    title: '$20 OFF On $50',
    detailsOpen: false,
    expirationDate: '8/10/19',
    effectiveDate: '8/6/19',
    details: null,
    legalText: '$10 OFF On $70',
    isStarted: true,
    error: null,
    promotionType: 'public',
    expirationDateTimeStamp: '2019-08-12T18:29:00.001Z',
  },
  {
    id: 'Y00105575',
    status: 'available',
    isExpiring: true,
    title: '$30 OFF On $50',
    detailsOpen: false,
    expirationDate: '8/10/19',
    effectiveDate: '8/6/19',
    details: null,
    legalText: '$10 OFF On $80',
    isStarted: true,
    error: null,
    promotionType: 'public',
    expirationDateTimeStamp: '2019-08-13T18:29:00.001Z',
  },
  {
    id: 'Y00105578',
    status: 'available',
    isExpiring: true,
    title: '$40 OFF On $50',
    detailsOpen: false,
    expirationDate: '8/10/19',
    effectiveDate: '8/6/19',
    details: null,
    legalText: '$10 OFF On $150',
    isStarted: true,
    error: null,
    promotionType: 'public',
    expirationDateTimeStamp: '2019-08-14T18:29:00.001Z',
  },
  {
    id: 'Y00105575',
    status: 'available',
    isExpiring: true,
    title: '$50 OFF On $50',
    detailsOpen: false,
    expirationDate: '8/10/19',
    effectiveDate: '8/6/19',
    details: null,
    legalText: '$10 OFF On $520',
    isStarted: true,
    error: null,
    promotionType: 'public',
    expirationDateTimeStamp: '2019-08-15T18:29:00.001Z',
  },
  {
    id: 'Y00105578',
    status: 'available',
    isExpiring: true,
    title: '$60 OFF On $50',
    detailsOpen: false,
    expirationDate: '8/10/19',
    effectiveDate: '8/6/19',
    details: null,
    legalText: '$10 OFF On $350',
    isStarted: true,
    error: null,
    promotionType: 'public',
    expirationDateTimeStamp: '2019-08-16T18:29:00.001Z',
  },
];

describe('CouponList component', () => {
  it('should renders available list', () => {
    const props = {
      className: 'applied_coupon',
      couponList: new List(coupons),
      labels: {},
      helpSubHeading: 'true',
      heading: 'Heading',
      couponDetailClick: () => {},
      helpAnchorClick: () => {},
    };
    const component = shallow(<CouponListSectionVanilla {...props} />);
    expect(component).toMatchSnapshot();
  });
  it('should renders applied list', () => {
    const props = {
      className: 'applied_coupon',
      couponList: new List(coupons),
      labels: {},
      heading: 'Heading',
    };
    const component = shallow(<CouponListSectionVanilla {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('should call detail modal click', () => {
    const helpAnchorJestClick = jest.fn();
    const props = {
      className: 'applied_coupon',
      couponList: new List(coupons),
      labels: {},
      helpSubHeading: 'true',
      heading: 'Heading',
      couponDetailClick: () => {},
      helpAnchorClick: helpAnchorJestClick,
    };
    const componentObj = shallow(<CouponListSectionVanilla {...props} />);
    expect(componentObj.find(Anchor)).toHaveLength(2);
    componentObj
      .find(Anchor)
      .at(0)
      .simulate('click', { preventDefault: jest.fn() });
    expect(helpAnchorJestClick).toHaveBeenCalled();
  });
});
