import React from 'react';
import { shallow } from 'enzyme';
import ContactInformation from '../ContactInformation';

describe('ContactInformation component', () => {
  it('should renders correctly', () => {
    const props = {
      contactInfo: '<h1>Account Information</h1>',
    };
    const component = shallow(<ContactInformation {...props} />);
    expect(component).toMatchSnapshot();
  });
  it('should renders correctly when no arguments are passed', () => {
    const component = shallow(<ContactInformation />);
    expect(component).toMatchSnapshot();
  });
});
