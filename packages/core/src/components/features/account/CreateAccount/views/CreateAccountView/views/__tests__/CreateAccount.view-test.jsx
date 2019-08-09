import React from 'react';
import { shallow } from 'enzyme';
import CreateAccount from '../CreateAccount.view';

describe('Create Account Page', () => {
  it('should render correctly', () => {
    const tree = shallow(<CreateAccount createAccountAction={jest.fn()} />);
    expect(tree).toMatchSnapshot();
  });
});
