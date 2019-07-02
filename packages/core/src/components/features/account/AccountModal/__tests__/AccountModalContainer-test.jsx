import { shallow } from 'enzyme';
import React from 'react';
import { AccountModalContainer, mapDispatchToProps } from '../container/AccountModal.container';
import AccountModalView from '../views/AccountModal.view';

describe('AccountModalContainer ', () => {
  it('should render AccountModal Correctly', () => {
    const tree = shallow(<AccountModalContainer modalType="deleteAddress" message="message" />);
    expect(tree).toMatchSnapshot();
    expect(tree.find(AccountModalView)).toHaveLength(1);
  });
  describe('#mapDispatchToProps', () => {
    it('should return an action closeModalComponent which will call dispatch function on execution', () => {
      const dispatch = jest.fn();
      const dispatchProps = mapDispatchToProps(dispatch);
      dispatchProps.closeModalComponent();
      expect(dispatch.mock.calls).toHaveLength(1);
    });
    it('should return an action onDeleteAddress which will call dispatch function on execution', () => {
      const dispatch = jest.fn();
      const dispatchProps = mapDispatchToProps(dispatch);
      dispatchProps.onDeleteAddress({ nickName: '123' });
      expect(dispatch.mock.calls).toHaveLength(1);
    });
  });
});
