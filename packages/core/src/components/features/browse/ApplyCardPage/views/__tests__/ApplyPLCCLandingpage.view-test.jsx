import React from 'react';
import { shallow } from 'enzyme';
import PLCCLandingPage from '../../molecules/ApplyPLCCLandingPage/ApplyPLCCLandingPage.view';

describe('PLCCLandingPage component', () => {
  it('should renders correctly', () => {
    const component = shallow(<PLCCLandingPage />);
    expect(component).toMatchSnapshot();
  });
});
