import React from 'react';
import { shallow } from 'enzyme';
import { isCanada } from '@tcp/core/src/utils';
import Modal from '@tcp/core/src/components/common/molecules/Modal';
import { PersonalizedCoupons } from '../PersonalizedCoupons.view';
import PersonalizedCoupon from '../../../../molecules/PersonalizedCoupon';
import CouponDetailModal from '../../../../../common/organism/CouponAndPromos/views/CouponDetailModal.view';

let props = {};
jest.mock('@tcp/core/src/utils', () => ({
  ...jest.requireActual('@tcp/core/src/utils'),
  isCanada: jest.fn(),
}));

describe('PersonalizedCoupon View', () => {
  beforeEach(() => {
    props = {
      coupons: [
        {
          description: 'description',
          startDate: 'Oct 2nd, 2019',
          endDate: 'Oct 15th, 2019',
          code: 'Y16905Y9W1RIWT',
          disclaimer: '20% OFF YOUR ENTIRE PURCHASE',
          categoryType: 'Marketing_Offers',
          isPastStartDate: true,
        },

        {
          description: 'description',
          startDate: 'Oct 2nd, 2019',
          endDate: 'Oct 15th, 2019',
          code: 'Y16905Y9W1RIWT',
          disclaimer: '20% OFF YOUR ENTIRE PURCHASE',
          categoryType: 'Loyalty_Offers',
          isPastStartDate: true,
        },
      ],
      className: 'className',
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

  it('should render correctly for full filled state', () => {
    const component = shallow(<PersonalizedCoupons {...props} />);
    expect(component).toMatchSnapshot();
    expect(component.find(PersonalizedCoupon).length).toBe(2);
  });

  it('should render correctly for empty coupons state', () => {
    props.coupons = null;
    const component = shallow(<PersonalizedCoupons {...props} />);
    expect(component).toMatchSnapshot();
    expect(component.find(PersonalizedCoupon).length).toBe(0);
  });

  it('should not render loyality offers for canada', () => {
    isCanada.mockImplementation(() => true);
    const component = shallow(<PersonalizedCoupons {...props} />);
    expect(component).toMatchSnapshot();
    expect(component.find(PersonalizedCoupon).length).toBe(1);
  });

  it('should simulate print modal open click', () => {
    const setState = jest.fn();
    const useStateSpy = jest.spyOn(React, 'useState');
    useStateSpy.mockImplementation(init => [init, setState]);

    const component = shallow(<PersonalizedCoupons {...props} />);
    expect(component).toMatchSnapshot();
    component
      .find(PersonalizedCoupon)
      .first()
      .props()
      .printCoupon(props.coupons[0]);
    component
      .find(CouponDetailModal)
      .first()
      .props()
      .onRequestClose();
    setTimeout(() => {
      expect(setState).toHaveBeenCalled();
    });
  });

  it('should simulate details modal open click', () => {
    const setState = jest.fn();
    const useStateSpy = jest.spyOn(React, 'useState');
    useStateSpy.mockImplementation(init => [init, setState]);

    const component = shallow(<PersonalizedCoupons {...props} />);
    expect(component).toMatchSnapshot();
    component
      .find(PersonalizedCoupon)
      .first()
      .props()
      .detailCoupon(props.coupons[0]);
    component
      .find(Modal)
      .first()
      .props()
      .onRequestClose();
    setTimeout(() => {
      expect(setState).toHaveBeenCalled();
    });
  });
});
