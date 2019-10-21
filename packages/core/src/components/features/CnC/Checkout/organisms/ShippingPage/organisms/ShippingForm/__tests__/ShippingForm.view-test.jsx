import React from 'react';
import { shallow } from 'enzyme';
import { List } from 'immutable';
import { ShippingFormVanilla } from '../views/ShippingForm.view';

describe('Shipping Form', () => {
  it('should render correctly', () => {
    const props = {
      addressLabels: { addressFormLabels: {} },
      shippingLabels: {},
      smsSignUpLabels: {},
      isGuest: false,
    };
    const tree = shallow(<ShippingFormVanilla {...props} />);
    expect(tree).toMatchSnapshot();
  });
  it('should render correctly with logged in user', () => {
    const props = {
      addressLabels: { addressFormLabels: {} },
      shippingLabels: {},
      smsSignUpLabels: {},
      emailSignUpLabels: {},
      isGuest: true,
      orderHasPickUp: false,
      isUsSite: false,
    };
    const tree = shallow(<ShippingFormVanilla {...props} />);
    expect(tree).toMatchSnapshot();
  });
  it('should render correctly with logged in user having addresses', () => {
    const props = {
      addressLabels: { addressFormLabels: {} },
      shippingLabels: {},
      smsSignUpLabels: {},
      emailSignUpLabels: {},
      isGuest: true,
      orderHasPickUp: false,
      isUsSite: false,
      userAddresses: new List([
        {
          addressId: '123',
          firstName: 'test',
          lastName: 'test',
          addressLine: ['addressline 1 hhhhh', 'addressline 2 mmmmmmmm'],
          city: 'test city',
          country: 'test country hhhhh',
          phone1: '1234567890',
          primary: 'true',
        },
      ]),
      dispatch: jest.fn(),
      onFileAddressKey: '123',
      shipmentMethods: [{}],
      defaultShipmentId: '90113',
      isMobile: true,
    };
    const tree = shallow(<ShippingFormVanilla {...props} />);
    tree.setState({
      modalState: true,
      modalType: 'edit',
    });
    tree.setProps({ shipmentMethods: [{ id: 123 }] });
    tree.instance().isAddressModalEmptied = true;
    expect(tree).toMatchSnapshot();
  });
  it('should render correctly with logged in user having addresses with isAddressModalEmptied false', () => {
    const props = {
      addressLabels: { addressFormLabels: {} },
      shippingLabels: {},
      smsSignUpLabels: {},
      emailSignUpLabels: {},
      isGuest: true,
      orderHasPickUp: false,
      isUsSite: false,
      userAddresses: new List([
        {
          addressId: '123',
          firstName: 'test',
          lastName: 'test',
          addressLine: ['addressline 1 hhh', 'addressline 2 mmm'],
          city: 'test city',
          country: 'test country hhh',
          phone1: '1234567890',
          primary: 'true',
        },
      ]),
      dispatch: jest.fn(),
      onFileAddressKey: '123',
      shipmentMethods: [{}],
      defaultShipmentId: '90113',
      isSaveToAddressBookChecked: false,
      isAddNewAddress: false,
      defaultAddressId: null,
    };
    const tree = shallow(<ShippingFormVanilla {...props} />);
    tree.setState({
      modalState: false,
      modalType: 'add',
      isEditing: false,
    });
    tree.instance().isAddressModalEmptied = false;
    tree.setProps({
      shipmentMethods: [{ id: 123 }],
      isSaveToAddressBookChecked: true,
      defaultAddressId: '334',
    });
    tree.instance().toggleIsEditing();
    expect(tree.state('isEditing')).toBe(true);

    expect(tree).toMatchSnapshot();
  });
  it('should render correctly with logged in user having addresses with modalType add and state true', () => {
    const props = {
      addressLabels: { addressFormLabels: {} },
      shippingLabels: {},
      smsSignUpLabels: {},
      emailSignUpLabels: {},
      isGuest: true,
      orderHasPickUp: false,
      isUsSite: false,
      userAddresses: new List([
        {
          addressId: '123',
          firstName: 'test',
          lastName: 'test',
          addressLine: ['addressline 1 hhh', 'addressline 2 mmm'],
          city: 'test city',
          country: 'test country hhh',
          phone1: '1234567890',
          primary: 'true',
        },
      ]),
      dispatch: jest.fn(),
      onFileAddressKey: '123',
      shipmentMethods: [{}],
      defaultShipmentId: '90113',
      isSaveToAddressBookChecked: false,
      isAddNewAddress: false,
      defaultAddressId: '1234',
    };
    const tree = shallow(<ShippingFormVanilla {...props} />);
    tree.setState({
      modalState: true,
      modalType: 'add',
      isEditing: false,
    });

    expect(tree).toMatchSnapshot();
  });
});
