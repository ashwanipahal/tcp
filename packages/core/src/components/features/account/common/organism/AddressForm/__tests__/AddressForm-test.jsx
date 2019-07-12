/* eslint-disable */
import React from 'react';
import { shallow } from 'enzyme';

import AddressForm from '../AddressForm';

// const AddressValidationForm = ({ handleSubmit, pristine, reset, submitting }: Props): Node => (

describe('AddressForm component', () => {
  it('should renders correctly', () => {
    const props = {
      handleSubmit: jest.fn(),
      className: 'any',
      backToAddressBookClick: jest.fn(),
    };
    const component = shallow(<AddressForm {...props} />);
    expect(component).toMatchSnapshot();
  });
});
