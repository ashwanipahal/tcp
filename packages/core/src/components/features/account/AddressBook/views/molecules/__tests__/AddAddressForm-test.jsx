// @flow
import React from 'react';
import { shallow } from 'enzyme';

import { AddAddressForm } from '../AddAddressForm';

// const AddressValidationForm = ({ handleSubmit, pristine, reset, submitting }: Props): Node => (

describe('AddAddressForm component', () => {
  it('should renders correctly when addresses are not present', () => {
    const props = {
      handleSubmit: jest.fn(),
      className: 'any',
      backToAddressBookClick: jest.fn(),
    };
    const component = shallow(<AddAddressForm {...props} />);
    expect(component).toMatchSnapshot();
  });
});
