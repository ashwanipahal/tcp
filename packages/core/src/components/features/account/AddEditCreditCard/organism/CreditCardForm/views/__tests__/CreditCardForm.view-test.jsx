import React from 'react';
import { shallow } from 'enzyme';
import { List } from 'immutable';
import { CreditCardForm } from '../CreditCardForm.view';
import CreditCardFields from '../../../../../../../common/molecules/CreditCardFields';

describe('CreditCardForm component', () => {
  it('should renders correctly with address dropdown', () => {
    const props = {
      labels: {
        paymentGC: {},
        common: {},
        profile: {},
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
      onFileAddressKey: '12345',
      initialValues: {},
    };
    const component = shallow(<CreditCardForm {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('should not renders creditcard fields if it is mailingaddress form', () => {
    const props = {
      labels: {
        paymentGC: {},
        common: {},
        profile: {},
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
      onFileAddressKey: '12345',
      initialValues: {},
      showCreditCardFields: false,
    };
    const component = shallow(<CreditCardForm {...props} />);
    expect(component.find(CreditCardFields)).toHaveLength(0);
  });

  it('should renders correctly with addressForm', () => {
    const props = {
      labels: {
        paymentGC: {},
        common: {},
        profile: {},
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
