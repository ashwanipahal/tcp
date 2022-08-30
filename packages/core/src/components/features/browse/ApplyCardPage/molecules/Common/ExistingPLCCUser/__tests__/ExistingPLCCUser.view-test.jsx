import React from 'react';
import { shallow } from 'enzyme';
import ExistingPLCCUserView from '../ExistingPLCCUser.view';

jest.mock('../../../../../../../../utils/utils.web', () => ({
  routerPush: jest.fn(),
}));

describe('ExistingPLCCUserView component', () => {
  it('should renders correctly', () => {
    const props = {
      labels: {
        lbl_PLCCForm_ctcButton: 'checkout',
        lbl_PLCCForm_continueShopping: 'continue',
      },
      existingCustomerDetails: 'exiting user',
    };
    const component = shallow(<ExistingPLCCUserView {...props} />);
    expect(component).toMatchSnapshot();
  });
});
