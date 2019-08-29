import React from 'react';
import { shallow } from 'enzyme';
import { PaymentContainer, mapDispatchToProps } from '../Payment.container.native';
import PaymentView from '../../views/PaymentView';

describe('Payment & Gift Cards', () => {
  it('should render payment view section', () => {
    const tree = shallow(<PaymentContainer getCardListAction={jest.fn()} />);
    expect(tree.is(PaymentView)).toBeTruthy();
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
