import React from 'react';
import { shallow } from 'enzyme';
import { viewport } from '@tcp/core/src/utils';
import { PersonalizedCoupon } from '../PersonalizedCoupon.view';

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

  const testFilledState = () => {
    const tree = shallow(<PersonalizedCoupon {...props} />);
    expect(tree).toMatchSnapshot();
  };

  it('should render correctly for full filled state', () => {
    viewport.mockImplementation(() => ({ small: false }));
    testFilledState();
  });

  it('should render correctly for full filled state for smaller viewport', () => {
    viewport.mockImplementation(() => ({ small: true }));
    testFilledState();
  });

  it('should simulate the Details link click', () => {
    viewport.mockImplementation(() => ({ small: false }));
    const setState = jest.fn();
    const useStateSpy = jest.spyOn(React, 'useState');
    useStateSpy.mockImplementation(init => [init, setState]);

    const component = shallow(<PersonalizedCoupon {...props} />);
    component
      .find('.details-link')
      .first()
      .props()
      .handleLinkClick({
        preventDefault: jest.fn(),
      });
    setTimeout(() => {
      expect(setState).toHaveBeenCalledWith(true);
    });
  });

  it('should simulate the toggle icon click', () => {
    viewport.mockImplementation(() => ({ small: true }));
    const setState = jest.fn();
    const useStateSpy = jest.spyOn(React, 'useState');
    useStateSpy.mockImplementation(init => [init, setState]);

    const component = shallow(<PersonalizedCoupon {...props} />);
    component
      .find('.toggle-icon')
      .first()
      .props()
      .handleLinkClick({
        preventDefault: jest.fn(),
      });
    setTimeout(() => {
      expect(setState).toHaveBeenCalledWith(true);
      expect(props.detailCoupon).toHaveBeenCalled();
    });
  });

  it('should simulate the print icon click', () => {
    viewport.mockImplementation(() => ({ small: false }));
    const setState = jest.fn();
    const useStateSpy = jest.spyOn(React, 'useState');
    useStateSpy.mockImplementation(init => [init, setState]);

    const component = shallow(<PersonalizedCoupon {...props} />);
    component
      .find('.print-icon-img')
      .first()
      .props()
      .onClick({
        preventDefault: jest.fn(),
      });
    expect(props.printCoupon).toHaveBeenCalled();
  });

  const testEmptyState = () => {
    const compProps = { ...props };
    const emptyCoupon = {
      description: 'description',
      categoryType: 'Marketing_Offers',
    };
    compProps.coupon = emptyCoupon;
    const tree = shallow(<PersonalizedCoupon {...compProps} />);
    expect(tree).toMatchSnapshot();
  };
  it('should render correctly for empty state with only mandatory values', () => {
    viewport.mockImplementation(() => ({ small: false }));
    testEmptyState();
  });

  it('should render correctly for empty state with only mandatory values for smaller viewport', () => {
    viewport.mockImplementation(() => ({ small: true }));
    testEmptyState();
  });

  const testPartialCouponState = couponProps => {
    const compProps = { ...props };
    const emptyCoupon = {
      description: 'description',
      categoryType: 'Marketing_Offers',
      ...couponProps,
    };
    compProps.coupon = emptyCoupon;
    const tree = shallow(<PersonalizedCoupon {...compProps} />);
    expect(tree).toMatchSnapshot();
  };
  it('should render correctly for partial state with start date only', () => {
    viewport.mockImplementation(() => ({ small: false }));
    testPartialCouponState({ startDate: 'disclaimer' });
  });

  it('should render correctly for partial state with start date only for smaller viewport', () => {
    viewport.mockImplementation(() => ({ small: true }));
    testPartialCouponState({ startDate: 'disclaimer' });
  });

  it('should render correctly for partial state with end date only', () => {
    viewport.mockImplementation(() => ({ small: false }));
    testPartialCouponState({ endDate: 'disclaimer' });
  });

  it('should render correctly for partial state with end date only for smaller viewport', () => {
    viewport.mockImplementation(() => ({ small: true }));
    testPartialCouponState({ endDate: 'disclaimer' });
  });
});
