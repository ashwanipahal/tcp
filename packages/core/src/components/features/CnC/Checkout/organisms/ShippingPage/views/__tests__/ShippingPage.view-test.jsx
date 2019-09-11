import React from 'react';
import { shallow } from 'enzyme';
import { List } from 'immutable';
import ShippingPage from '../ShippingPage.view';
import { ShippingFormVanilla } from '../../organisms/ShippingForm/views/ShippingForm.view';
import { getSiteId } from '../../../../../../../../utils/utils.web';

jest.mock('../../../../../../../../utils/utils.web', () => ({
  getSiteId: jest.fn(),
}));

describe('Shipping Page', () => {
  it('should render correctly', () => {
    getSiteId.mockImplementation(() => 'us');
    const address = {
      addressLine1: 'pob',
      addressLine2: '',
    };
    const props = {
      address,
      shipmentMethods: [{}],
      loadShipmentMethods: () => {},
      handleSubmit: () => {},
      userAddresses: List(),
    };
    const tree = shallow(<ShippingPage {...props} />);
    tree.instance().submitShippingData({ address, shipmentMethods: {}, smsSignUp: {} });
    expect(tree).toMatchSnapshot();
    expect(ShippingFormVanilla).toHaveLength(1);
  });
  it('should render correctly with component did update and getDerivedStateFromprops', () => {
    getSiteId.mockImplementation(() => 'us');
    const mockedloadShipmentMethods = jest.fn();
    const mockedupdateShippingMethodSelection = jest.fn();
    const address = {
      addressLine1: 'pob',
      addressLine2: '',
    };
    const props = {
      address,
      shipmentMethods: [{}],
      loadShipmentMethods: mockedloadShipmentMethods,
      handleSubmit: () => {},
      selectedShipmentId: '334',
      userAddresses: new List([
        {
          addressId: '123',
          firstName: 'test',
          lastName: 'test',
          addressLine: ['addressline 1', 'addressline 2'],
          city: 'test city',
          country: 'test country',
          phone1: '1234567890',
          primary: 'true',
        },
      ]),
      updateShippingMethodSelection: mockedupdateShippingMethodSelection,
    };
    const tree = shallow(<ShippingPage {...props} />);
    tree.instance().submitShippingData({ address, shipmentMethods: {}, smsSignUp: {} });
    tree.setProps({
      address: {
        addressLine1: 'pob 123',
        addressLine2: 'pob',
      },
      selectedShipmentId: '336',
    });
    expect(mockedloadShipmentMethods).toBeCalled();
    expect(mockedupdateShippingMethodSelection).toBeCalled();
    expect(tree).toMatchSnapshot();
    expect(ShippingFormVanilla).toHaveLength(1);
  });
  it('should render correctly with component did update and getDerivedStateFromprops  with addeditaddressresponse', () => {
    getSiteId.mockImplementation(() => 'us');
    const mockedloadShipmentMethods = jest.fn();
    const mockedupdateShippingMethodSelection = jest.fn();
    const address = {
      addressLine1: 'pob',
      addressLine2: '',
    };
    const props = {
      address,
      shipmentMethods: [{}],
      loadShipmentMethods: mockedloadShipmentMethods,
      handleSubmit: () => {},
      selectedShipmentId: '334',
      userAddresses: new List([
        {
          addressId: '123',
          firstName: 'test',
          lastName: 'test',
          addressLine: ['addressline 1', 'addressline 2'],
          city: 'test city',
          country: 'test country',
          phone1: '1234567890',
          primary: 'true',
        },
      ]),
      addEditResponseAddressId: '34789',
      updateShippingMethodSelection: mockedupdateShippingMethodSelection,
    };
    const tree = shallow(<ShippingPage {...props} />);
    tree.instance().submitShippingData({ address, shipmentMethods: {}, smsSignUp: {} });
    tree.setProps({
      address: {
        addressLine1: 'pob 123',
        addressLine2: 'pob',
      },
      selectedShipmentId: '336',
    });
    tree.setState({ defaultAddressId: '34567' });
    expect(mockedloadShipmentMethods).toBeCalled();
    expect(mockedupdateShippingMethodSelection).toBeCalled();
    expect(tree).toMatchSnapshot();
    expect(ShippingFormVanilla).toHaveLength(1);
  });
  it('should call toggleAddNewAddress', () => {
    const address = {
      addressLine1: 'pob',
      addressLine2: '',
    };
    const props = {
      address,
      shipmentMethods: [{}],
      handleSubmit: () => {},
      selectedShipmentId: '334',
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
      addEditResponseAddressId: '34789',
    };
    const tree = shallow(<ShippingPage {...props} />);
    tree.setState({ isAddNewAddress: true });
    tree.instance().toggleAddNewAddress();
    expect(tree.state('isAddNewAddress')).toBe(false);
  });
  it('should call submitShippingData for loggedin user', () => {
    const mockedupdateShippingAddressData = jest.fn();
    const mockedaddNewShippingAddressData = jest.fn();

    const address = {
      addressLine1: 'pob',
      addressLine2: '',
    };
    const props = {
      address,
      shipmentMethods: [{}],
      handleSubmit: () => {},
      selectedShipmentId: '334',
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
      addEditResponseAddressId: '34789',
      isGuest: false,
      updateShippingAddress: mockedupdateShippingAddressData,
      addNewShippingAddress: mockedaddNewShippingAddressData,
      updateShippingAddressData: mockedupdateShippingAddressData,
      addNewShippingAddressData: mockedaddNewShippingAddressData,
      onFileAddressKey: '123',
      setAsDefaultShipping: true,
      saveToAddressBook: true,
    };

    const tree = shallow(<ShippingPage {...props} />);
    tree.setState({ isAddNewAddress: false });
    tree.instance().updateShippingAddress();
    expect(mockedupdateShippingAddressData).toBeCalled();
    tree.instance().addNewShippingAddress();
    expect(mockedaddNewShippingAddressData).toBeCalled();
    tree
      .instance()
      .submitShippingData({ address, shipmentMethods: {}, smsSignUp: {}, onFileAddressKey: '123' });
  });
});
