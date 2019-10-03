import React from 'react';
import { shallow } from 'enzyme';
import CardEditReduxForm, {
  CardEditFormViewVanilla,
  handleEditFromSubmit,
} from '../views/CardEditForm.view';

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
  };

  it('CardEditReduxForm', () => {
    const component = shallow(<CardEditReduxForm {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('CardEditFormViewVanilla', () => {
    let counter = 0;
    props.dispatch = () => {
      counter += 1;
    };
    const component = shallow(<CardEditFormViewVanilla {...props} />);
    const instance = component.instance();
    instance.handleSubmit({ preventDefault: () => {}, stopPropagation: () => {} });
    expect(counter).toEqual(1);
    expect(component).toMatchSnapshot();
  });

  it('handleEditFromSubmit', () => {
    let funcValue;
    handleEditFromSubmit(obj => {
      funcValue = obj;
    })({ address: { addressId: '123' }, ccBrand: 'Visa' });
    expect(funcValue).toEqual({
      address: { addressId: '123' },
      cardType: 'VISA',
      onFileAddressKey: '123',
    });
  });
});
