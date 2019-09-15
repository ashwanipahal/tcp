import React from 'react';
import { shallow } from 'enzyme';
import AddEditShippingAddress from '../views/AddEditShippingAddressModal.view.native';

describe('AddEditShippingAddressModal', () => {
  it('should render correctly', () => {
    const props = {
      modalState: true,
      addressFields: () => {},
      defaultOptions: () => {},
      modalType: 'edit',
      toggleAddEditModal: () => {},
      actionButtons: () => {},
      labels: {},
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
      labels: {},
    };
    const tree = shallow(<AddEditShippingAddress {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
