import React from 'react';
import { shallow } from 'enzyme';
import CardEditReduxForm, { CardEditFormViewVanilla } from '../views/CardEditForm.view.native';
import { handleEditFromSubmit } from '../views/CardEditReduxForm';

describe('CardEditForm component', () => {
  const props = {
    labels: {
      saveButtonText: 'Save',
      cancelButtonText: 'Cancel',
    },
    renderCardDetailsHeading: () => 'Hello',
    getAddNewCCForm: () => 'CCForm',
    addressForm: () => 'AddressForm',
    selectedCard: {
      accountNo: '123',
      expMonth: '2',
    },
    getDefaultPayment: jest.fn(),
    handleSubmit: () => jest.fn(),
    onSubmit: jest.fn(),
  };

  it('CardEditReduxForm', () => {
    const component = shallow(<CardEditReduxForm {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('handleEditFromSubmit', () => {
    let funcValue;
    handleEditFromSubmit(obj => {
      funcValue = obj;
    })({ address: { addressId: '123' } });
    expect(funcValue.formData).toEqual({ address: { addressId: '123' }, onFileAddressKey: '123' });
  });
  it('CardEditFormViewVanilla with error', () => {
    props.error = true;
    props.editModeSubmissionError = true;
    const component = shallow(<CardEditFormViewVanilla {...props} />);
    expect(component).toMatchSnapshot();
  });
  it('handleEditFromSubmit without address', () => {
    let funcValue;
    handleEditFromSubmit(obj => {
      funcValue = obj;
    })({ address: { addressId: '' } });
    expect(funcValue.formData).toEqual({ address: { addressId: '' }, onFileAddressKey: '' });
  });
});
