import React from 'react';
import { shallow } from 'enzyme';
import { List } from 'immutable';
import RegisteredShippingForm from '../views/RegisteredShippingForm.view.native';

describe('RegisteredShippingForm', () => {
  it('should render correctly ', () => {
    const props = {
      newUserPhoneNo: '',
      isGuest: false,
      setEditState: jest.fn(),
      dispatch: jest.fn(),
      modalState: false,
      userAddresses: new List([
        {
          firstName: 'test',
          lastName: 'test',
          addressLine: ['addressline 155', 'addressline 222'],
          city: 'test city',
          country: 'test countryyy',
          phone1: '1234567890',
          primary: 'true',
        },
      ]),
      addressLabels: {},
      shippingLabels: {},
      setDefaultAddressId: jest.fn(),
    };
    const tree = shallow(<RegisteredShippingForm {...props} />);
    expect(tree).toMatchSnapshot();
  });
  it('should render correctly with  addresses and call toggleModal', () => {
    const props = {
      newUserPhoneNo: '',
      isGuest: false,
      setEditState: jest.fn(),
      dispatch: jest.fn(),
      modalState: false,
      userAddresses: new List([
        {
          firstName: 'test',
          lastName: 'test',
          addressLine: ['addressline 1111', 'addressline 25'],
          city: 'test city',
          country: 'test country is',
          phone1: '1234567890',
          primary: 'true',
        },
      ]),
      addressLabels: {},
      shippingLabels: {},
      isMobile: false,
    };
    const tree = shallow(<RegisteredShippingForm {...props} />);
    tree.setState({ modalState: false, modalType: null });
    tree.instance().onAddressDropDownChange();
    const e = { preventDefault: jest.fn() };
    tree.instance().onEditClick(e);
    expect(tree.state('modalState')).toBe(true);
    expect(tree.state('modalType')).toBe('edit');
    expect(tree).toMatchSnapshot();
  });
  it('should render correctly with  addresses and call toggleModal if it has onFileAddressKey', () => {
    const props = {
      newUserPhoneNo: '',
      isGuest: false,
      setEditState: jest.fn(),
      dispatch: jest.fn(),
      modalState: false,
      userAddresses: new List([
        {
          firstName: 'test',
          lastName: 'test',
          addressLine: ['addressline 156', 'addressline 290'],
          city: 'test city',
          country: 'test count',
          phone1: '1234567890',
          primary: 'true',
          addressId: '1234',
        },
      ]),
      addressLabels: {},
      shippingLabels: {},
      isMobile: false,
      onFileAddressKey: '1234',
    };
    const tree = shallow(<RegisteredShippingForm {...props} />);
    tree.setState({ modalState: false, modalType: null });
    tree.instance().onAddressDropDownChange();
    const e = { preventDefault: jest.fn() };
    tree.instance().onEditClick(e);
    expect(tree.state('modalState')).toBe(true);
    expect(tree.state('modalType')).toBe('edit');
    expect(tree).toMatchSnapshot();
  });
  it('should render correctly with  addresses and call toggleModal if it has onFileAddressKey but does not match', () => {
    const props = {
      newUserPhoneNo: '',
      isGuest: false,
      dispatch: jest.fn(),
      setEditState: jest.fn(),
      modalState: false,
      userAddresses: new List([
        {
          firstName: 'test',
          lastName: 'test',
          addressLine: ['addressline 190', 'addressline 52'],
          city: 'test city',
          country: 'test ',
          phone1: '1234567890',
          primary: 'true',
          addressId: '1234',
        },
      ]),
      addressLabels: {},
      shippingLabels: {},
      isMobile: false,
      onFileAddressKey: '12345',
    };
    const tree = shallow(<RegisteredShippingForm {...props} />);
    tree.setState({ modalState: false, modalType: null });
    tree.instance().onAddressDropDownChange();
    const e = { preventDefault: jest.fn() };
    tree.instance().onEditClick(e);
    expect(tree.state('modalState')).toBe(true);
    expect(tree.state('modalType')).toBe('edit');
    expect(tree).toMatchSnapshot();
  });
  it('should call shoe default options', () => {
    const props = {
      newUserPhoneNo: '',
      isGuest: false,
      setEditState: jest.fn(),
      dispatch: jest.fn(),
      modalState: false,
      userAddresses: null,
      addressLabels: {},
      shippingLabels: {},
      isMobile: false,
      onFileAddressKey: '12345',
    };
    const tree = shallow(<RegisteredShippingForm {...props} />);
    tree.setState({ modalState: true, modalType: 'add' });
    tree.instance().showDefaultOptions();
    expect(tree).toMatchSnapshot();
  });
  it('should call save to account change', () => {
    const props = {
      newUserPhoneNo: '',
      isGuest: false,
      setEditState: jest.fn(),
      dispatch: jest.fn(),
      modalState: false,
      userAddresses: new List([
        {
          firstName: 'test',
          lastName: 'test',
          addressLine: ['addressline 1', 'addressline 2'],
          city: 'test city',
          country: 'test country',
          phone1: '1234567890',
          primary: 'true',
          addressId: '1234',
        },
      ]),
      addressLabels: {},
      shippingLabels: {},
      isMobile: false,
      onFileAddressKey: '12345',
      isSaveToAddressBookChecked: true,
    };
    const tree = shallow(<RegisteredShippingForm {...props} />);
    tree.setState({ modalState: true, modalType: 'add' });
    tree.instance().onSaveToAccountChange(false);
    expect(tree).toMatchSnapshot();
  });
  it('should call save Btn click handler', () => {
    const props = {
      newUserPhoneNo: '',
      isGuest: false,
      setEditState: jest.fn(),
      dispatch: jest.fn(),
      modalState: false,
      userAddresses: new List([
        {
          firstName: 'test',
          lastName: 'test',
          addressLine: ['addressline 1', 'addressline 2'],
          city: 'test city',
          country: 'test country',
          phone1: '1234567890',
          primary: 'true',
          addressId: '1234',
        },
      ]),
      addressLabels: {},
      shippingLabels: {},
      isMobile: false,
      onFileAddressKey: '12345',
      isSaveToAddressBookChecked: true,
      updateShippingAddress: jest.fn(),
      addNewShippingAddress: jest.fn(),
    };
    const tree = shallow(<RegisteredShippingForm {...props} />);
    tree.setState({ modalState: true, modalType: 'add' });
    tree.instance().saveBtnClickHandler();
    expect(tree).toMatchSnapshot();
  });
  it('should call getBtnDisabledState', () => {
    const props = {
      syncErrorsObject: { syncError: {} },
    };
    const tree = shallow(<RegisteredShippingForm {...props} />);
    tree.setState({ modalState: true, modalType: 'add' });
    expect(tree).toMatchSnapshot();
  });
  it('should call renderActionBtns', () => {
    const props = {
      labels: {},
      syncErrorsObject: { syncError: {} },
    };
    const tree = shallow(<RegisteredShippingForm {...props} />);
    tree.setState({ modalState: true, modalType: 'add' });
    tree.instance().renderActionButtons();
    expect(tree).toMatchSnapshot();
  });
  it('should call save to account change with user Addresses', () => {
    const props = {
      newUserPhoneNo: '',
      isGuest: false,
      setEditState: jest.fn(),
      dispatch: jest.fn(),
      modalState: false,
      userAddresses: null,
      addressLabels: {},
      shippingLabels: {},
      isMobile: false,
      onFileAddressKey: '12345',
      isSaveToAddressBookChecked: true,
    };
    const tree = shallow(<RegisteredShippingForm {...props} />);
    tree.setState({ modalState: true, modalType: 'add' });
    tree.instance().onSaveToAccountChange(false);
    expect(tree).toMatchSnapshot();
  });
  it('should call shoe default options with modal type edit', () => {
    const props = {
      newUserPhoneNo: '',
      isGuest: false,
      setEditState: jest.fn(),
      dispatch: jest.fn(),
      modalState: false,
      userAddresses: null,
      addressLabels: {},
      shippingLabels: {},
      isMobile: false,
      onFileAddressKey: '12345',
    };
    const tree = shallow(<RegisteredShippingForm {...props} />);
    tree.setState({ modalState: true, modalType: 'edit' });
    tree.instance().showDefaultOptions();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with no addresses and call toggleAddressModal', () => {
    const props = {
      newUserPhoneNo: '',
      isGuest: false,
      setEditState: jest.fn(),
      dispatch: jest.fn(),
      modalState: false,
      userAddresses: new List([]),
      addressLabels: {},
      shippingLabels: {},
      isMobile: true,
    };
    const tree = shallow(<RegisteredShippingForm {...props} />);
    tree.setState({ modalState: false, modalType: null });
    expect(tree).toMatchSnapshot();
  });
});
