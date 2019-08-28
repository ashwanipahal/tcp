import React from 'react';
import { shallow } from 'enzyme';
import PLCCAgreements from '../PLCCAgreements';

describe('ElectronicConsent component', () => {
  const props = {
    labels: {
      plcc_form_financial_terms: '<h1>plcc agreement</h1>',
    },
  };
  it('should renders correctly considering labels being passed', () => {
    const component = shallow(<PLCCAgreements {...props} />);
    expect(component).toMatchSnapshot();
  });
});
