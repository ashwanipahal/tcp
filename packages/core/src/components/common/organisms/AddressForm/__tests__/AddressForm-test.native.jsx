import React from 'react';
import { shallow } from 'enzyme';
import { AddressForm } from '../AddressForm.native';

describe('AddressForm component', () => {
  it('should renders correctly', () => {
    const props = {
      handleSubmit: jest.fn(),
      className: 'any',
    };
    const component = shallow(<AddressForm {...props} />);
    expect(component).toMatchSnapshot();
  });
});
