import React from 'react';
import { shallow } from 'enzyme';
import CardEditReduxForm, { CardEditFormViewVanilla } from '../views/CardEditForm.view';

describe('ButtonList component', () => {
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

  it('renders correctly without props', () => {
    const component = shallow(<CardEditReduxForm {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('renders correctly without props', () => {
    const component = shallow(<CardEditFormViewVanilla {...props} />);
    expect(component).toMatchSnapshot();
  });
});
