import React from 'react';
import { List } from 'immutable';
import { shallow } from 'enzyme';
import { CheckoutAddressVanilla } from '../views/CheckoutBillingAddress.view';

describe('CheckoutAddress', () => {
  it('should render correctly', () => {
    const props = {
      dispatch: jest.fn(),
      orderHasShipping: true,
      addressLabels: { addressFormLabels: { selectFromAddress: '' } },
      isGuest: true,
      labels: {},
      shippingAddress: {},
      isSameAsShippingChecked: true,
    };
    const tree = shallow(<CheckoutAddressVanilla {...props} />);
    tree.setProps({ isSameAsShippingChecked: false });
    expect(tree).toMatchSnapshot();
  });
  it('should render correctly if order doesnot have shipping items', () => {
    const props = {
      dispatch: jest.fn(),
      orderHasShipping: false,
      addressLabels: { addressFormLabels: { selectFromAddress: '' } },
      isGuest: true,
      labels: {},
      shippingAddress: {},
      isSameAsShippingChecked: false,
      userAddresses: new List([
        {
          addressId: '1234',
        },
      ]),
      selectedOnFileAddressId: '1234',
    };
    const tree = shallow(<CheckoutAddressVanilla {...props} />);
    expect(tree).toMatchSnapshot();
  });
  it('should render correctly if isAddNewAddress is true', () => {
    const props = {
      dispatch: jest.fn(),
      orderHasShipping: false,
      addressLabels: { addressFormLabels: { selectFromAddress: '' } },
      isGuest: true,
      labels: {},
      shippingAddress: {},
      isSameAsShippingChecked: false,
      userAddresses: new List([
        {
          addressId: '1234',
        },
        { addressId: '5678' },
      ]),
      selectedOnFileAddressId: '1234',

      onFileAddressId: '1234',
    };
    const tree = shallow(<CheckoutAddressVanilla {...props} />);
    tree.setState({ isAddNewAddress: true });
    tree.instance().onAddressDropDownChange('5678');
    expect(tree.state('isAddNewAddress')).toBe(false);
    expect(tree).toMatchSnapshot();
  });
  it('should render correctly if selectedAddress is present', () => {
    const props = {
      dispatch: jest.fn(),
      orderHasShipping: true,
      addressLabels: { addressFormLabels: { selectFromAddress: '' } },
      isGuest: true,
      labels: {},
      isSameAsShippingChecked: false,
      userAddresses: new List([
        {
          addressId: '1234',
          addressLine: ['abcd'],
          state: 'AB',
        },
        { addressId: '5678' },
      ]),

      onFileAddressId: '1234',
    };
    const tree = shallow(<CheckoutAddressVanilla {...props} />);
    expect(tree).toMatchSnapshot();
  });
  it('should call onSameAsShippingChange', () => {
    const mockedDispatch = jest.fn();
    const props = {
      dispatch: mockedDispatch,
      orderHasShipping: false,
      addressLabels: {},
      isGuest: true,
      labels: {},
      shippingAddress: {},
      isSameAsShippingChecked: false,
      userAddresses: new List(),
    };

    const tree = shallow(<CheckoutAddressVanilla {...props} />);
    tree.setProps({ isSameAsShippingChecked: true });
    tree.instance().onSameAsShippingChange();
    expect(mockedDispatch).toHaveBeenCalled();
    tree.setState({ isAddNewAddress: false });
    tree.instance().toggleAddNewAddressMode();
    expect(tree.state('isAddNewAddress')).toBe(true);
    expect(mockedDispatch).toHaveBeenCalled();
    expect(tree).toMatchSnapshot();
  });
});
