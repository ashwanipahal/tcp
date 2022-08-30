import React from 'react';
import { shallow } from 'enzyme';
import ApplicationInProgress from '../ApplicationInProgress';

jest.mock('../../../../../../../../utils/utils.web', () => ({
  routerPush: jest.fn(),
}));

describe('ApplicationInProgress component', () => {
  it('should renders correctly', () => {
    const props = {
      labels: {
        lbl_PLCCForm_underProgress: 'application card is in progress',
        lbl_PLCCForm_underProcessDetails: 'in progress',
        lbl_PLCCForm_ctcButton: 'continue to checkout',
        lbl_PLCCForm_continueShopping: 'continue shopping',
      },
    };
    const component = shallow(<ApplicationInProgress {...props} />);
    expect(component).toMatchSnapshot();
  });
});
