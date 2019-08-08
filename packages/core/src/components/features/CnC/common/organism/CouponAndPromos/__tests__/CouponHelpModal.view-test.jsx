import { shallow } from 'enzyme';
import React from 'react';
import CouponHelpModal from '../views/CouponHelpModal.view';

describe('Help Coupon Modal', () => {
  it('should call correctly', () => {
    const mockedCloseModal = jest.fn();
    const params = {
      labels: {},
      heading: '',
      openState: false,
      onRequestClose: mockedCloseModal,
    };
    const component = shallow(<CouponHelpModal {...params} />);
    expect(component).toMatchSnapshot();
  });
});
