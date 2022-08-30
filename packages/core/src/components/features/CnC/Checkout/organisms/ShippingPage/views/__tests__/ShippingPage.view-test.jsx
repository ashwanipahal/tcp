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
      checkoutRoutingDone: false,
      shipmentMethods: [{}],
      loadShipmentMethods: () => {},
      handleSubmit: () => {},
      userAddresses: List(),
      addressLabels: {},
      verifyAddressAction: () => {},
      formatPayload: () => {},
      shippingDidMount: () => {},
      submitShippingForm: () => {},
      updateShippingAddress: () => {},
      submitVerifiedShippingAddressData: () => {},
      shippingAddress: {
        addressLine1: '',
      },
      emailSignUpFlags: { emailSignUpTCP: true },
    };
    const tree = shallow(<ShippingPage {...props} />);
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
      addressLabels: {},
      loadShipmentMethods: mockedloadShipmentMethods,
      handleSubmit: () => {},
      selectedShipmentId: '334',
      shippingAddressId: '123',
      submitShippingForm: () => {},
      updateShippingAddress: () => {},
      submitVerifiedShippingAddressData: () => {},

      shippingAddress: {
        addressLine1: '',
      },
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
      verifyAddressAction: () => {},
      formatPayload: () => {},
      shippingDidMount: () => {},
      shippingDidUpdate: () => {},
      emailSignUpFlags: { emailSignUpTCP: true },
    };
    const tree = shallow(<ShippingPage {...props} />);
    tree.setProps({
      address: {
        addressLine1: 'pob 123',
        addressLine2: 'pob',
      },
      selectedShipmentId: '336',
    });
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
      checkoutRoutingDone: false,
      submitShippingForm: () => {},
      updateShippingAddress: () => {},
      submitVerifiedShippingAddressData: () => {},
      shipmentMethods: [{}],
      addressLabels: {},
      loadShipmentMethods: mockedloadShipmentMethods,
      handleSubmit: () => {},
      selectedShipmentId: '334',
      shippingAddress: {
        addressLine1: '',
      },
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
      verifyAddressAction: () => {},
      formatPayload: () => {},
      shippingDidMount: () => {},
      shippingDidUpdate: () => {},
      emailSignUpFlags: { emailSignUpTCP: true },
    };
    const tree = shallow(<ShippingPage {...props} />);
    tree.setProps({
      address: {
        addressLine1: 'pob 123',
        addressLine2: 'pob',
      },
      selectedShipmentId: '336',
      shippingAddressId: '123',
    });
    tree.setState({ defaultAddressId: '34567' });
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
      addressLabels: {},
      shipmentMethods: [{}],
      handleSubmit: () => {},
      submitShippingForm: () => {},
      updateShippingAddress: () => {},
      submitVerifiedShippingAddressData: () => {},
      selectedShipmentId: '334',
      shippingAddress: {
        addressLine1: '',
      },
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
      formatPayload: () => {},
      shippingDidMount: () => {},
      shippingDidUpdate: () => {},
      emailSignUpFlags: { emailSignUpTCP: true },
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
      checkoutRoutingDone: false,
      addressLabels: {},
      shipmentMethods: [{}],
      handleSubmit: () => {},
      updateShippingAddress: () => {},
      submitShippingForm: () => {},
      submitVerifiedShippingAddressData: () => {},
      formatPayload: () => {},
      selectedShipmentId: '334',
      shippingAddress: {
        addressLine1: '',
      },
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
      addNewShippingAddress: mockedaddNewShippingAddressData,
      updateShippingAddressData: mockedupdateShippingAddressData,
      addNewShippingAddressData: mockedaddNewShippingAddressData,
      onFileAddressKey: '123',
      setAsDefaultShipping: true,
      saveToAddressBook: true,
      verifyAddressAction: () => {},
      shippingDidUpdate: () => {},
      shippingDidMount: () => {},
      emailSignUpFlags: { emailSignUpGYM: true },
    };

    const tree = shallow(<ShippingPage {...props} />);
    tree.setState({ isAddNewAddress: false });
  });
});
