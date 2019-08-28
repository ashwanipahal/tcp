import React from 'react';
import { shallow } from 'enzyme';
import { AddressFields } from '../AddressFields.view';

describe('AddressFields component', () => {
  it('should render correctly', () => {
    const props = {
      formName: 'creditCard',
      addressFormLabels: {},
      formSection: 'address',
    };
    const component = shallow(<AddressFields {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('should render correctly without phoneNumber and ', () => {
    const props = {
      formName: 'creditCard',
      formSection: 'address',
      addressFormLabels: {},
      showPhoneNumber: false,
      showDefaultCheckbox: false,
    };
    const component = shallow(<AddressFields {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('should render correctly without phoneNumber and variation secondary and country ca', () => {
    const props = {
      formName: 'creditCard',
      formSection: 'address',
      addressFormLabels: {},
      showPhoneNumber: false,
      showDefaultCheckbox: false,
      variation: 'secondary',
    };

    const component = shallow(<AddressFields {...props} />);
    component.setState({ country: 'CA' });
    expect(component).toMatchSnapshot();
  });
  it('should render correctly without phoneNumber and variation secondary and country US', () => {
    const props = {
      formName: 'creditCard',
      addressFormLabels: {},
      formSection: 'address',
      showPhoneNumber: false,
      showDefaultCheckbox: false,
      variation: 'primary',
    };

    const component = shallow(<AddressFields {...props} />);
    component.setState({ country: 'US' });
    expect(component).toMatchSnapshot();
  });
});
