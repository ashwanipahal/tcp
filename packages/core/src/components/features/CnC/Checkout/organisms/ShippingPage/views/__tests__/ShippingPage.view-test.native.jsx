import React from 'react';
import { shallow } from 'enzyme';
import { List } from 'immutable';
import ShippingPage from '../ShippingPage.view.native';

describe('Shipping Page', () => {
  it('should render correctly', () => {
    const mockedhandleSubmit = jest.fn();
    const address = {
      addressLine1: 'pob',
      addressLine2: '',
    };
    const data = { address, shipmentMethods: [{}], smsSignUp: {} };
    const props = {
      address,
      shipmentMethods: [{}],
      loadShipmentMethods: () => {},
      shippingLabels: {
        sectionHeader: '',
      },
      handleSubmit: mockedhandleSubmit,
      navigation: {
        state: {
          params: {
            shippingLabels: {},
            shipmentMethods: jest.fn(),
            defaultShipmentId: '',
            selectedShipmentId: '',
            addressLabels: {},
            emailSignUpLabels: {},
            loadShipmentMethods: jest.fn(),
            handleSubmit: mockedhandleSubmit,
          },
        },
      },
    };
    const prevProps = {
      address,
    };
    const tree = shallow(<ShippingPage {...props} prevProps={prevProps} />);
    tree.instance().submitShippingForm(data);
    expect(mockedhandleSubmit).toHaveBeenCalled();
    expect(tree).toMatchSnapshot();
  });
  it('should call component did Update', () => {
    const address = {
      addressLine1: 'pob',
      addressLine2: '',
    };
    const mockedloadShipmentMethods = jest.fn();
    const props = {
      shipmentMethods: [{}],
      loadShipmentMethods: mockedloadShipmentMethods,
      shippingLabels: {
        sectionHeader: '',
      },
      navigation: {
        state: {
          params: {
            shippingLabels: {},
            shipmentMethods: jest.fn(),
            defaultShipmentId: '',
            selectedShipmentId: '',
            addressLabels: {},
            emailSignUpLabels: {},
            loadShipmentMethods: jest.fn(),
            handleSubmit: jest.fn(),
          },
        },
      },
    };
    const prevProps = {
      address: {
        addressLine1: 'pob',
        addressLine2: '11',
      },
    };
    const tree = shallow(<ShippingPage {...props} prevProps={prevProps} />);
    tree.setProps({
      address,
    });
  });
  it('should render correctly with component did update and getDerivedStateFromprops', () => {
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
    tree.instance().submitShippingForm({ address, shipmentMethods: {}, smsSignUp: {} });
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
  });
  it('should render correctly with component did update and getDerivedStateFromprops  with addeditaddressresponse', () => {
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
    tree.instance().submitShippingForm({ address, shipmentMethods: {}, smsSignUp: {} });
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
      .submitShippingForm({ address, shipmentMethods: {}, smsSignUp: {}, onFileAddressKey: '123' });
  });
});
