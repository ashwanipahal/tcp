import React from 'react';
import { shallow } from 'enzyme';
import ApplicationInProgress from '../ApplicationInProgress';

describe('ApplicationInProgress component', () => {
  it('should renders correctly', () => {
    const props = {
      labels: {
        plcc_form_status_detail: 'application card is in progress',
        plcc_form_status: 'in progress',
        plcc_form_ctc_buttom: 'continue to checkout',
        plcc_form_continue_shopping: 'continue shopping',
      },
    };
    const component = shallow(<ApplicationInProgress {...props} />);
    expect(component).toMatchSnapshot();
  });
});
