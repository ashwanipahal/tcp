import React from 'react';
import { shallow } from 'enzyme';
import AddEditShippingAddress from '../views/AddEditShippingAddressModal.view';

describe('AddEditShippingAddress', () => {
  it('should render correctly', () => {
    const props = {
      modalState: true,
      addressFields: () => {},
      defaultOptions: () => {},
      modalType: 'edit',
      toggleAddEditModal: () => {},
      actionButtons: () => {},
    };
    const tree = shallow(<AddEditShippingAddress {...props} />);
    expect(tree).toMatchSnapshot();
  });
  it('should render correctly with modalType add', () => {
    const props = {
      modalState: true,
      addressFields: () => {},
      defaultOptions: () => {},
      modalType: 'add',
      toggleAddEditModal: () => {},
      actionButtons: () => {},
    };
    const tree = shallow(<AddEditShippingAddress {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
