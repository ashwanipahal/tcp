import React from 'react';
import { shallow } from 'enzyme';
import { List } from 'immutable';
import { CreditCardForm } from '../CreditCardForm.view';

describe('CreditCardForm component', () => {
  it('should renders correctly with address dropdown', () => {
    const props = {
      labels: {
        paymentGC: {},
        common: {},
      },
      addressLabels: {},
      addressList: List([
        {
          addressId: '12345',
          firstName: 'test',
          lastName: 'test',
          primary: 'true',
        },
      ]),
      onFileAddresskey: '12345',
      initialValues: {},
    };
    const component = shallow(<CreditCardForm {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('should renders correctly with addressForm', () => {
    const props = {
      labels: {
        paymentGC: {},
        common: {},
      },
      addressLabels: {},
      addressList: List([
        {
          addressId: '12345',
          firstName: 'test',
          lastName: 'test',
          primary: 'true',
        },
      ]),
      pristine: true,
      initialValues: {},
    };
    const component = shallow(<CreditCardForm {...props} />);
    expect(component).toMatchSnapshot();
  });
});
