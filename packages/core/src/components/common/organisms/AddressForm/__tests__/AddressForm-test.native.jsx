import React from 'react';
import { shallow } from 'enzyme';
import { AddressFormVanilla } from '../AddressForm.native';

describe('AddressForm component', () => {
  it('should renders correctly', () => {
    const props = {
      handleSubmit: jest.fn(),
    };
    const component = shallow(<AddressFormVanilla {...props} />);
    component.setState({
      country: 'US',
      dropDownItem: 'AL',
    });
    expect(component).toMatchSnapshot();
  });
});
