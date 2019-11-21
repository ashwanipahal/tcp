import React from 'react';
import { shallow } from 'enzyme';
import { List } from 'immutable';
import { RegisteredShippingFormVanilla } from '../views/RegisteredShippingForm.view';
import { onSaveBtnClick } from '../views/RegisteredShippingForm.util';

describe('RegisteredShippingFormVanilla', () => {
  it('should render correctly ', () => {
    const props = {
      newUserPhoneNo: '',
      isGuest: false,
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
        },
      ]),
      addressLabels: {},
      shippingLabels: {},
      setDefaultAddressId: jest.fn(),
    };
    const tree = shallow(<RegisteredShippingFormVanilla {...props} />);
    expect(tree).toMatchSnapshot();
  });
  it('should render correctly with no addresses and call toggleIsEditing', () => {
    const mockectoggleIsEditing = jest.fn();
    const props = {
      newUserPhoneNo: '',
      isGuest: false,
      dispatch: jest.fn(),
      modalState: false,
      userAddresses: new List([]),
      addressLabels: {},
      shippingLabels: {},
      isMobile: false,
      toggleIsEditing: mockectoggleIsEditing,
    };
    const tree = shallow(<RegisteredShippingFormVanilla {...props} />);
    const e = { preventDefault: jest.fn() };
    tree.instance().toggleEditingMode(e);
    expect(mockectoggleIsEditing).toBeCalled();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with no addresses and call toggleAddEditModal', () => {
    const props = {
      newUserPhoneNo: '',
      isGuest: false,
      dispatch: jest.fn(),
      modalState: false,
      userAddresses: new List([]),
      addressLabels: {},
      shippingLabels: {},
      isMobile: true,
    };
    const tree = shallow(<RegisteredShippingFormVanilla {...props} />);
    expect(tree).toMatchSnapshot();
  });
  it('should render correctly with no addresses and call toggleAddEditModal', () => {
    const mockedtoggleAddEditModal = jest.fn();
    const props = {
      newUserPhoneNo: '',
      isGuest: false,
      dispatch: jest.fn(),
      modalState: false,
      userAddresses: new List([]),
      addressLabels: {},
      shippingLabels: {},
      isMobile: true,
      toggleAddEditModal: mockedtoggleAddEditModal,
    };
    const tree = shallow(<RegisteredShippingFormVanilla {...props} />);
    expect(tree).toMatchSnapshot();
  });
  it('should render correctly with no addresses and call toggleAddNewAddress', () => {
    const mockedtoggleAddNewAddress = jest.fn();
    const props = {
      newUserPhoneNo: '',
      isGuest: false,
      dispatch: jest.fn(),
      modalState: false,
      userAddresses: new List([]),
      addressLabels: {},
      shippingLabels: {},
      isMobile: false,
      toggleAddNewAddress: mockedtoggleAddNewAddress,
    };
    const tree = shallow(<RegisteredShippingFormVanilla {...props} />);
    expect(tree).toMatchSnapshot();
  });
  it('should render correctly with isEditing true', () => {
    const props = {
      newUserPhoneNo: '',
      isGuest: false,
      dispatch: jest.fn(),
      modalState: false,
      userAddresses: new List([
        {
          firstName: 'test',
          lastName: 'test',
          addressLine: ['addressline 1tttttt', 'addressline 2bbbbbbb'],
          city: 'test city',
          country: 'test country abcccc',
          phone1: '1234567890',
        },
      ]),
      addressLabels: {},
      shippingLabels: {},
      isEditing: true,
    };
    const tree = shallow(<RegisteredShippingFormVanilla {...props} />);
    expect(tree).toMatchSnapshot();
  });
  it('should render correctly with isAddNewAddress true', () => {
    const props = {
      newUserPhoneNo: '',
      isGuest: false,
      dispatch: jest.fn(),
      modalState: false,
      userAddresses: new List([
        {
          firstName: 'test',
          lastName: 'test',
          addressLine: ['addressline 1ttt', 'addressline 2bbb'],
          city: 'test city',
          country: 'test country abc',
          phone1: '1234567890',
        },
      ]),
      addressLabels: {},
      shippingLabels: {},
      isAddNewAddress: true,
    };
    const tree = shallow(<RegisteredShippingFormVanilla {...props} />);
    expect(tree).toMatchSnapshot();
  });
  it('should render correctly with isAddNewAddress true and isSaveToAddressBookChecked true', () => {
    const props = {
      newUserPhoneNo: '',
      isGuest: false,
      dispatch: jest.fn(),
      modalState: false,
      userAddresses: new List([
        {
          firstName: 'test',
          lastName: 'test',
          addressLine: ['addressline 1ttt', 'addressline 2bbb'],
          city: 'test city',
          country: 'test country abc',
          phone1: '1234567890',
        },
      ]),
      addressLabels: {},
      shippingLabels: {},
      isAddNewAddress: true,
      isSaveToAddressBookChecked: true,
    };
    const tree = shallow(<RegisteredShippingFormVanilla {...props} />);
    expect(tree).toMatchSnapshot();
  });
  it('should render correctly modalType add', () => {
    const mockedaddNewShippingAddress = jest.fn();
    const props = {
      newUserPhoneNo: '',
      isGuest: false,
      dispatch: jest.fn(),
      modalState: true,
      userAddresses: new List([
        {
          firstName: 'test',
          lastName: 'test',
          addressLine: ['addressline 1ooo', 'addressline 2aaa'],
          city: 'test city',
          country: 'test country bbbb',
          phone1: '1234567890',
        },
      ]),
      addressLabels: {},
      shippingLabels: {},
      modalType: 'add',
      addNewShippingAddress: mockedaddNewShippingAddress,
    };
    const tree = shallow(<RegisteredShippingFormVanilla {...props} />);
    onSaveBtnClick({
      updateShippingAddress: jest.fn(),
      modalType: props.modalType,
      addNewShippingAddress: mockedaddNewShippingAddress,
      modalState: props.modalState,
      isEditing: props.isEditing,
    });
    expect(mockedaddNewShippingAddress).toBeCalled();

    expect(tree).toMatchSnapshot();
  });
  it('should render correctly modalType edit', () => {
    const mockedupdateShippingAddress = jest.fn();

    const props = {
      newUserPhoneNo: '',
      isGuest: false,
      dispatch: jest.fn(),
      modalState: true,
      userAddresses: new List([
        {
          addressId: '123',
          firstName: 'test',
          lastName: 'test',
          addressLine: ['addressline 1 hhh', 'addressline 2 mmm'],
          city: 'test city',
          country: 'test country hhh',
          phone1: '1234567890',
        },
      ]),
      addressLabels: {},
      shippingLabels: {},
      modalType: 'edit',
      shippingAddressId: '123',
      onFileAddressKey: '123',
      updateShippingAddress: mockedupdateShippingAddress,
    };
    const tree = shallow(<RegisteredShippingFormVanilla {...props} />);
    onSaveBtnClick({
      updateShippingAddress: mockedupdateShippingAddress,
      modalType: props.modalType,
      addNewShippingAddress: jest.fn(),
      modalState: props.modalState,
      isEditing: props.isEditing,
    });
    expect(mockedupdateShippingAddress).toBeCalled();

    expect(tree).toMatchSnapshot();
  });
  it('should render correctly onAddressDropDownChange', () => {
    const mockedtoggleAddNewAddress = jest.fn();

    const props = {
      newUserPhoneNo: '',
      isGuest: false,
      dispatch: jest.fn(),

      userAddresses: new List([
        {
          addressId: '123',
          firstName: 'test',
          lastName: 'test',
          addressLine: ['addressline 1 hhh', 'addressline 2 mmm'],
          city: 'test city',
          country: 'test country hhh',
          phone1: '1234567890',
        },
      ]),
      addressLabels: {},
      shippingLabels: {},
      isEditing: true,
      shippingAddressId: '123',
      onFileAddressKey: '',
      toggleAddNewAddress: mockedtoggleAddNewAddress,
    };
    const tree = shallow(<RegisteredShippingFormVanilla {...props} />);
    tree.instance().onAddressDropDownChange();
    expect(tree).toMatchSnapshot();
  });
});
