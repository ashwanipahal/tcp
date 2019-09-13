import React from 'react';
import { shallow } from 'enzyme';
import ExistingPLCCUserView from '../ExistingPLCCUser.view';

describe('ExistingPLCCUserView component', () => {
  it('should renders correctly', () => {
    const props = {
      labels: {
        plcc_form_ctc_buttom: 'checkout',
        plcc_form_continue_shopping: 'continue',
      },
      existingCustomerDetails: 'exiting user',
    };
    const component = shallow(<ExistingPLCCUserView {...props} />);
    expect(component).toMatchSnapshot();
  });
});
