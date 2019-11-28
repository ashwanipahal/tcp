import React from 'react';
import { shallow } from 'enzyme';
import { CreateAccountVanilla } from '../CreateAccount.view.native';

describe('Create Account Page', () => {
  it('should render correctly', () => {
    const tree = shallow(<CreateAccountVanilla createAccountAction={jest.fn()} />);
    tree.setState({ resetPassword: false });
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly Forgot Password', () => {
    const tree = shallow(<CreateAccountVanilla createAccountAction={jest.fn()} />);
    tree.setState({ resetPassword: true });
    expect(tree).toMatchSnapshot();
  });
});
