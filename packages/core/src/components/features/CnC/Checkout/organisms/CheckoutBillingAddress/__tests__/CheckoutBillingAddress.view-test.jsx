import React from 'react';
import { shallow } from 'enzyme';
import { CheckoutAddressVanilla } from '../views/CheckoutBillingAddress.view';

describe('CheckoutAddress', () => {
  it('should render correctly', () => {
    const props = {
      dispatch: jest.fn(),
      orderHasShipping: true,
      addressLabels: {},
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
      addressLabels: {},
      isGuest: true,
      labels: {},
      shippingAddress: {},
      isSameAsShippingChecked: false,
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
    };
    const tree = shallow(<CheckoutAddressVanilla {...props} />);
    tree.setProps({ isSameAsShippingChecked: true });
    tree.instance().onSameAsShippingChange();
    expect(mockedDispatch).toHaveBeenCalled();
    expect(tree).toMatchSnapshot();
  });
});
