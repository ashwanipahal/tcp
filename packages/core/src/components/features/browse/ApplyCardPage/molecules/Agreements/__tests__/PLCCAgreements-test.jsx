import React from 'react';
import { shallow } from 'enzyme';
import PLCCAgreements from '../PLCCAgreements';

describe('ElectronicConsent component', () => {
  const props = {
    labels: {
      lbl_PLCCForm_financialTermsHeading: '<h1>plcc agreement</h1>',
    },
  };
  it('should renders correctly considering labels being passed', () => {
    const component = shallow(<PLCCAgreements {...props} />);
    expect(component).toMatchSnapshot();
  });
});
