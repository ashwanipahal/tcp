import React from 'react';
import { shallow } from 'enzyme';
import { AddressFormVanilla } from '../AddressForm.native';

describe('AddressForm component', () => {
  let component = null;
  beforeEach(() => {
    const props = {
      handleSubmit: jest.fn(),
    };
    component = shallow(<AddressFormVanilla {...props} />);
    component.setState({
      country: 'US',
      dropDownItem: 'AL',
    });
  });
  it('should renders correctly', () => {
    expect(component).toMatchSnapshot();
  });

  it('should render correctly with default address', () => {
    component.setProps({ isMakeDefaultDisabled: true });
    expect(component).toMatchSnapshot();
  });
});
