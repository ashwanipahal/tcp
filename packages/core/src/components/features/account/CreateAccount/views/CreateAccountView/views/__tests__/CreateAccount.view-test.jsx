import React from 'react';
import { shallow } from 'enzyme';
import { CreateAccountVanilla } from '../CreateAccount.view';

describe('Create Account Page', () => {
  it('should render correctly', () => {
    const tree = shallow(<CreateAccountVanilla createAccountAction={jest.fn()} />);
    expect(tree).toMatchSnapshot();
  });

  it('call showForgotPasswordForm func', () => {
    const tree = shallow(<CreateAccountVanilla createAccountAction={jest.fn()} />);
    const openModal = jest.fn();
    tree.setProps({ openModal });
    tree.instance().showForgotPasswordForm();
    expect(openModal).toHaveBeenCalled();
  });
});
