import React from 'react';
import { shallow } from 'enzyme';
import { AddEditPaymentModal } from '../views/AddEditPaymentModal.native';

describe('AddEditPaymentModal component', () => {
  it('should render correctly', () => {
    const props = {
      labels: { paymentGC: { lbl_payment_addCCHeading: '' } },
    };
    const component = shallow(<AddEditPaymentModal {...props} />);
    expect(component).toMatchSnapshot();
  });
});
