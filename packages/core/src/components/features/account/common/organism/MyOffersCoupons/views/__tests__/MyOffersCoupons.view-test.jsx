import React from 'react';
import { shallow } from 'enzyme';
import { List } from 'immutable';
import Carousel from '@tcp/core/src/components/common/molecules/Carousel';
import { MyOffersCouponViewVanilla } from '../MyOffersCoupons.view';
import { EmptyOffersList } from '../EmptyOffersList.view';

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

describe('CouponListCarousel component', () => {
  it('should renders offersandcoupons list', () => {
    const props = {
      allCouponList: new List(coupons),
      labels: {},
      helpSubHeading: 'true',
      heading: 'Heading',
      couponDetailClick: () => {},
      helpAnchorClick: () => {},
    };
    const component = shallow(<MyOffersCouponViewVanilla {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('should render EmptyOffersList section for empty coupon list', () => {
    const props = {
      allCouponList: [],
      labels: {},
      helpSubHeading: 'true',
      heading: 'Heading',
      couponDetailClick: () => {},
      helpAnchorClick: () => {},
    };
    const component = shallow(<MyOffersCouponViewVanilla {...props} />);
    expect(component.find(EmptyOffersList)).toBeTruthy();
  });

  it('should render EmptyOffersList section for empty coupon list', () => {
    const props = {
      allCouponList: new List(coupons),
      labels: {},
      helpSubHeading: 'true',
      heading: 'Heading',
      couponDetailClick: () => {},
      helpAnchorClick: () => {},
    };
    const component = shallow(<MyOffersCouponViewVanilla {...props} />);
    expect(component.find(Carousel)).toBeTruthy();
  });

  it('should not render view all link for empty coupon list', () => {
    const props = {
      allCouponList: [],
      labels: {},
      helpSubHeading: 'true',
      heading: 'Heading',
      couponDetailClick: () => {},
      helpAnchorClick: () => {},
    };
    const component = shallow(<MyOffersCouponViewVanilla {...props} />);
    expect(component.find('.view_all')).toHaveLength(0);
  });

  it('should not render help link for empty coupon list', () => {
    const props = {
      allCouponList: [],
      labels: {},
      helpSubHeading: 'true',
      heading: 'Heading',
      couponDetailClick: () => {},
      helpAnchorClick: () => {},
    };
    const component = shallow(<MyOffersCouponViewVanilla {...props} />);
    expect(component.find('.couponList_iconContainer')).toHaveLength(0);
  });

  it('should render view all link', () => {
    const props = {
      allCouponList: new List(coupons),
      labels: {},
      helpSubHeading: 'true',
      heading: 'Heading',
      couponDetailClick: () => {},
      helpAnchorClick: () => {},
    };
    const component = shallow(<MyOffersCouponViewVanilla {...props} />);
    expect(component.find('.view_all')).toHaveLength(1);
  });
});
