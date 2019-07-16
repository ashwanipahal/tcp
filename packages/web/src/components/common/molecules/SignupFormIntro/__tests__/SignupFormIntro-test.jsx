import React from 'react';
import { shallow } from 'enzyme';
import { SignupFormIntroVanilla } from '../views/SignupFormIntro';

describe('SignupFormIntro component', () => {
  it('renders correctly', () => {
    const props = {
      className: '',
      formViewConfig: {},
    };
    const component = shallow(<SignupFormIntroVanilla {...props} />);
    expect(component).toMatchSnapshot();
  });
});
