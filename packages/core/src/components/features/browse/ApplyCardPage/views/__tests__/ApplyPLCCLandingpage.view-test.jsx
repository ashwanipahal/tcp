import React from 'react';
import { shallow } from 'enzyme';
import PLCCLandingPage from '../ApplyPLCCLandingPage.view';

describe('PLCCLandingPage component', () => {
  it('should renders correctly', () => {
    const component = shallow(<PLCCLandingPage />);
    expect(component).toMatchSnapshot();
  });
});
