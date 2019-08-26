import React from 'react';
import { shallow } from 'enzyme';
import AccountInformations from '../AccountInformations';

describe('AccountInformations component', () => {
  it('should renders correctly', () => {
    const props = {
      classifiedDisclaimer: '<h1>Account Information</h1>',
    };
    const component = shallow(<AccountInformations {...props} />);
    expect(component).toMatchSnapshot();
  });
  it('should renders correctly when no arguments are passed', () => {
    const component = shallow(<AccountInformations />);
    expect(component).toMatchSnapshot();
  });
});
