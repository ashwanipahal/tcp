import React from 'react';
import { shallow } from 'enzyme';
import CreateAccountForm from '../CreateAccountForm';

describe('CreateAccountForm', () => {
  it('should render correctly', () => {
    const tree = shallow(<CreateAccountForm />);
    expect(tree).toMatchSnapshot();
  });
});
