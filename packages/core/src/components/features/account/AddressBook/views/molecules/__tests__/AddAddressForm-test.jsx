import React from 'react';
import { shallow } from 'enzyme';
import { Field, reduxForm, change } from 'redux-form';
import { AddAddressForm } from '../AddAddressForm';
import { AutoCompleteComponent } from '../../../../../../common/atoms/GoogleAutoSuggest/AutoCompleteComponent';
// const AddressValidationForm = ({ handleSubmit, pristine, reset, submitting }: Props): Node => (

describe('AddAddressForm component', () => {
  const value = parentElement: { classList: { add: jest.fn() } }
  it('should renders correctly when addresses are not present', () => {
    const props = {
      handleSubmit: jest.fn(),
      className: 'any',
      backToAddressBookClick: jest.fn(),
    };
    const component = shallow(<AddAddressForm {...props} />);
    expect(component).toMatchSnapshot();
    component.find('#FirstName').simulate('blur', {
      target: { value: 'hi',  value},
    });
    expect(
      component
        .find('#FirstName')
        .parent()
        .hasClass('active')
    ).toEqual(false);
    component.find('#FirstName').simulate('blur', {
      target: { value: null, value },
    });
  });
  it('should renders correctly when state are not present', () => {
    const props = {
      handleSubmit: jest.fn(),
      className: 'any',
      backToAddressBookClick: jest.fn(),
    };
    const component = shallow(<AddAddressForm {...props} />);
    expect(component).toMatchSnapshot();
    component.find('#country').simulate('change', { target: { value: 'hi' } });
    expect(component.state('country')).toBe('hi');
  });
  it('should renders correctly when state are not present', () => {
    const props = {
      handleSubmit: jest.fn(),
      className: 'any',
      backToAddressBookClick: jest.fn(),
    };
    const component = shallow(<AddAddressForm {...props} />);
    component.find('#city').simulate('change', { target: { value: 'hi' } });
    expect(component.state('city')).toBe('hi');
    expect(component).toMatchSnapshot();
  });
})
