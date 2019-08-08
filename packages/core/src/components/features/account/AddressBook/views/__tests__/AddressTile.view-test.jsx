import React from 'react';
import { shallow } from 'enzyme';
import { AddressBookTileVanilla } from '../AddressTile.view';
import Badge from '../../../../../common/atoms/Badge';
import Anchor from '../../../../../common/atoms/Anchor';

const address = {
  firstName: 'test',
  lastName: 'test',
  addressLine: ['addressline 1', 'addressline 2'],
  city: 'test city',
  country: 'test country',
  phone1: '1234567890',
  primary: 'true',
};

const labels = {
  addressBook: {
    ACC_LBL_DEFAULT_SHIPPING: 'DEFAULT SHIPPING',
    ACC_LBL_DEFAULT_BILLING: 'DEFAULT BILLING',
    ACC_LBL_SHIPPING: 'SHIPPING',
  },
  common: {
    lbl_common_makeDefault: 'Make Default',
  },
};

describe('AddressTile component', () => {
  it('should renders correctly', () => {
    const props = {
      address,
      labels,
    };
    const component = shallow(<AddressBookTileVanilla {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('should renders default Shipping badge if address is primary', () => {
    const props = {
      address,
      labels,
    };
    const component = shallow(<AddressBookTileVanilla {...props} />);
    expect(component.find(Badge).text()).toBe(labels.addressBook.ACC_LBL_DEFAULT_SHIPPING);
  });

  it('should renders shipping badge if xcont_isShippingAddress is true and address is not primary', () => {
    const newAddress = Object.assign({}, address, {
      primary: 'false',
      xcont_isShippingAddress: 'true',
    });
    const props = {
      address: newAddress,
      labels,
    };
    const component = shallow(<AddressBookTileVanilla {...props} />);
    expect(component.find(Badge).text()).toBe(labels.addressBook.ACC_LBL_SHIPPING);
  });

  it('should render default shipping badge only if xcont_isShippingAddress is true and address is also primary', () => {
    const newAddress = Object.assign({}, address, {
      primary: 'true',
      xcont_isShippingAddress: 'true',
    });
    const props = {
      address: newAddress,
      labels,
    };
    const component = shallow(<AddressBookTileVanilla {...props} />);
    expect(component.find(Badge)).toHaveLength(1);
    expect(component.find(Badge).text()).toBe(labels.addressBook.ACC_LBL_DEFAULT_SHIPPING);
  });

  it('should renders default Billing badge if xcont_isDefaultBilling is true', () => {
    const newAddress = Object.assign({}, address, {
      primary: 'false',
      xcont_isDefaultBilling: 'true',
    });
    const props = {
      address: newAddress,
      labels,
    };
    const component = shallow(<AddressBookTileVanilla {...props} />);
    expect(component.find(Badge).text()).toBe(labels.addressBook.ACC_LBL_DEFAULT_BILLING);
  });

  it('should not render default Billing badge only if xcont_isDefaultBilling is true and xcont_isBillingAddress is also true', () => {
    const newAddress = Object.assign({}, address, {
      primary: 'false',
      xcont_isDefaultBilling: 'true',
      xcont_isBillingAddress: 'true',
    });
    const props = {
      address: newAddress,
      labels,
    };
    const component = shallow(<AddressBookTileVanilla {...props} />);
    expect(component.find(Badge)).toHaveLength(1);
    expect(component.find(Badge).text()).toBe(labels.addressBook.ACC_LBL_DEFAULT_BILLING);
  });

  it('should renders make default link if address is not primary', () => {
    const newAddress = Object.assign({}, address, {
      primary: 'false',
    });
    const props = {
      address: newAddress,
      labels,
    };
    const component = shallow(<AddressBookTileVanilla {...props} />);
    expect(
      component
        .find(Anchor)
        .first()
        .text()
    ).toBe(labels.common.lbl_common_makeDefault);
  });
  it('should call delete address click', () => {
    const newAddress = Object.assign({}, address, {
      primary: 'false',
    });
    const mockedOpenAccountModalComponent = jest.fn();
    const mockedSetSelectedAddress = jest.fn();
    const props = {
      address: newAddress,
      labels,
      setDeleteModalMountState: mockedOpenAccountModalComponent,
      setSelectedAddress: mockedSetSelectedAddress,
    };
    const component = shallow(<AddressBookTileVanilla {...props} />);
    component
      .find(Anchor)
      .at(2)
      .simulate('click', { preventDefault: jest.fn() });
    expect(mockedOpenAccountModalComponent).toHaveBeenCalled();
    expect(mockedSetSelectedAddress).toHaveBeenCalled();
  });
});
