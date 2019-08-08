import { shallow } from 'enzyme';
import React from 'react';
import { CouponDetailModalVanilla } from '../views/CouponDetailModal.view';
import Button from '../../../../../../common/atoms/Button';

describe('Detail Coupon Modal', () => {
  const data = {
    labels: {},
    openState: false,
    coupon: {
      id: 'Y00105578',
      status: 'applied',
      isExpiring: true,
      title: '$10 OFF On $80',
      detailsOpen: false,
      expirationDate: '8/10/19',
      effectiveDate: '8/6/19',
      details: null,
      legalText: '$10 OFF On $50',
      isStarted: true,
      error: '',
      promotionType: 'public',
      expirationDateTimeStamp: '2019-08-10T18:29:00.001Z',
    },
    onRequestClose: () => {},
  };
  it('should render correctly', () => {
    const component = shallow(<CouponDetailModalVanilla {...data} />);
    expect(component).toMatchSnapshot();
  });
  it('should call Cancel Button Correctly', () => {
    const mockedCloseModal = jest.fn();
    const dataTwo = {
      labels: {},
      openState: false,
      coupon: {
        id: 'Y00105578',
        status: 'applied',
        isExpiring: true,
        title: '$20 OFF On $60',
        detailsOpen: false,
        expirationDate: '8/10/19',
        effectiveDate: '8/6/19',
        details: null,
        legalText: '$30 OFF On $90',
        isStarted: true,
        error: '',
        promotionType: 'public',
        expirationDateTimeStamp: '2019-08-10T18:29:00.001Z',
      },
      applyToBag: mockedCloseModal,
    };
    const tree = shallow(<CouponDetailModalVanilla {...dataTwo} />);
    tree
      .find(Button)
      .at(0)
      .simulate('click');
    expect(mockedCloseModal).toHaveBeenCalled();
  });
});
