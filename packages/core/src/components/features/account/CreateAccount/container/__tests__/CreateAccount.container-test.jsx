import React from 'react';
import { shallow } from 'enzyme';
import { CreateAccountContainer, mapDispatchToProps } from '../CreateAccount.container';
import CreateAccountView from '../../views/CreateAccount.view';

describe('Payment & Gift Cards', () => {
  it('should render payment view section', () => {
    const tree = shallow(<CreateAccountContainer createAccountAction={jest.fn()} />);
    expect(tree.is(CreateAccountView)).toBeTruthy();
  });
  describe('#mapDispatchToProps', () => {
    it('should return an action setDefaultPaymentMethod which will call dispatch function on execution', () => {
      const dispatch = jest.fn();
      const dispatchProps = mapDispatchToProps(dispatch);
      dispatchProps.createAccountAction();
      expect(dispatch.mock.calls).toHaveLength(1);
    });
  });
});
