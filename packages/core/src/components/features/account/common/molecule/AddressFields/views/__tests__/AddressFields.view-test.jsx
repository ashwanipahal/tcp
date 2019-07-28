import React from 'react';
import { shallow } from 'enzyme';
import { AddressFields } from '../AddressFields.view';

describe('AddressFields component', () => {
  it('should render correctly', () => {
    const props = {
      formName: 'creditCard',
      labels: {},
    };
    const component = shallow(<AddressFields {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('should render correctly without phoneNumber and ', () => {
    const props = {
      formName: 'creditCard',
      labels: {},
      showPhoneNumber: false,
      showDefaultCheckbox: false,
    };
    const component = shallow(<AddressFields {...props} />);
    expect(component).toMatchSnapshot();
  });
});
