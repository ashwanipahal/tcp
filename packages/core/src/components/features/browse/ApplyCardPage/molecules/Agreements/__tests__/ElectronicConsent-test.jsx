import React from 'react';
import { shallow } from 'enzyme';
import ElectronicConsent from '../ElectronicConsent';

describe('ElectronicConsent component', () => {
  it('should renders correctly', () => {
    const props = {
      electronicConsent: '<h1>Electronic Consent</h1>',
    };
    const component = shallow(<ElectronicConsent {...props} />);
    expect(component).toMatchSnapshot();
  });
  it('should renders correctly when no arguments are passed', () => {
    const component = shallow(<ElectronicConsent />);
    expect(component).toMatchSnapshot();
  });
});
