import React from 'react';
import { shallow } from 'enzyme';
import { PaymentViewContainer, mapDispatchToProps } from '../Payment.container.native';
import PaymentView from '../../views/PaymentView/views/Payment.view.native';

describe('Payment & Gift Cards', () => {
  it('should render payment view section', () => {
    const tree = shallow(<PaymentViewContainer getCardListAction={jest.fn()} />);
    expect(tree.is(PaymentView)).toBeTruthy();
  });
  it('should render loading section', () => {
    const tree = shallow(<PaymentViewContainer isFetching getCardListAction={jest.fn()} />);
    expect(tree.find('Text')).toHaveLength(1);
  });
  describe('#mapDispatchToProps', () => {
    it('should return an action getCardListAction which will call dispatch function on execution', () => {
      const dispatch = jest.fn();
      const dispatchProps = mapDispatchToProps(dispatch);
      dispatchProps.getCardListAction();
      expect(dispatch.mock.calls).toHaveLength(1);
    });
    it('should return an action setDefaultPaymentMethod which will call dispatch function on execution', () => {
      const dispatch = jest.fn();
      const dispatchProps = mapDispatchToProps(dispatch);
      dispatchProps.setDefaultPaymentMethod();
      expect(dispatch.mock.calls).toHaveLength(1);
    });
  });
});
