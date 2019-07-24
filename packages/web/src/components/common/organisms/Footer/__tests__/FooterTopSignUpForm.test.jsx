import React from 'react';
import { shallow } from 'enzyme';
import { FooterTopSignUpFormVanilla } from '../views/FooterTopSignUpForm.view';

describe('FooterTopSignUpFormVanilla component', () => {
  it('renders correctly', () => {
    const component = shallow(<FooterTopSignUpFormVanilla />);
    expect(component).toMatchSnapshot();
  });
});
