import React from 'react';
import { shallow } from 'enzyme';
import { AddressDropdown } from '../AddressDropdown.view.native';

describe('CreditCardFields component', () => {
  const props = {
    options: [{}],
    input: { value: '', onChange: () => {} },
    selectListTitle: 'Select Address',
    labels: { common: { lbl_common_tapClose: 'Tap to close' } },
    data: [{ id: 1, primary: true, label: 'ok' }],
    useCustomContent: false,
    dropDownIsOpen: true,
    itemStyle: {},
    showButton: true,
    addAddress: jest.fn(),
    toggleModal: jest.fn(),
    onValueChange: jest.fn(),
  };

  it('should renders correctly when isExpirationRequired is true', () => {
    const propsWithoutData = {
      options: [{}],
      input: { value: '', onChange: () => {} },
      selectListTitle: 'Select Address',
      labels: { common: { lbl_common_tapClose: 'Tap to close' } },
      data: [],
    };
    const rowMarker = React.createRef();
    const component = shallow(<AddressDropdown ref={() => rowMarker} {...propsWithoutData} />);
    expect(component).toMatchSnapshot();
  });
  it('should renders correctly when isExpirationRequired is true', () => {
    const component = shallow(<AddressDropdown {...props} />);
    component.setState({ dropDownIsOpen: true });
    expect(component).toMatchSnapshot();
  });

  it('renders correctly with method getContext', () => {
    const component = shallow(<AddressDropdown {...props} />);
    const instance = component.instance();
    const spyGetContext = jest.spyOn(instance, 'getContext');
    instance.getContext({ item: { is: 1, primary: true } });
    expect(spyGetContext).toHaveBeenCalled();
  });
  it('renders correctly with method getContext with custom', () => {
    props.useCustomContent = true;
    const component = shallow(<AddressDropdown {...props} />);
    const instance = component.instance();
    const spyGetContext = jest.spyOn(instance, 'getContext');
    instance.getContext({ id: 1, primary: true, useCustomContent: true });
    expect(spyGetContext).toHaveBeenCalled();
  });
  it('renders correctly with method calculateDropDownPosition', () => {
    props.useCustomContent = true;
    const component = shallow(<AddressDropdown {...props} />);
    const instance = component.instance();
    const spyCalculateDropDownPosition = jest.spyOn(instance, 'calculateDropDownPosition');
    instance.calculateDropDownPosition();
    expect(spyCalculateDropDownPosition).toHaveBeenCalled();
  });
  it('renders correctly with method setDropDownPosition', () => {
    props.useCustomContent = true;
    const component = shallow(<AddressDropdown {...props} />);
    const instance = component.instance();
    const spySetDropDownPosition = jest.spyOn(instance, 'setDropDownPosition');
    instance.setDropDownPosition({ top: 1 }, 2, true, 3, 1);
    expect(spySetDropDownPosition).toHaveBeenCalled();
  });
  it('renders correctly with method setDropDownPosition with less', () => {
    props.useCustomContent = true;
    const component = shallow(<AddressDropdown {...props} />);
    const instance = component.instance();
    const spySetDropDownPosition = jest.spyOn(instance, 'setDropDownPosition');
    instance.setDropDownPosition({ top: 1 }, 2, true, 0, 1);
    expect(spySetDropDownPosition).toHaveBeenCalled();
  });
  it('renders correctly with method setDropDownPosition', () => {
    props.useCustomContent = true;
    const component = shallow(<AddressDropdown {...props} />);
    const instance = component.instance();
    const spySetDropDownPosition = jest.spyOn(instance, 'setDropDownPosition');
    instance.setDropDownPosition({ top: 1 }, 2, false, 3, 1);
    expect(spySetDropDownPosition).toHaveBeenCalled();
  });
  it('renders correctly with method setDropDownPosition false with less', () => {
    props.useCustomContent = true;
    const component = shallow(<AddressDropdown {...props} />);
    const instance = component.instance();
    const spySetDropDownPosition = jest.spyOn(instance, 'setDropDownPosition');
    instance.setDropDownPosition({ top: 1 }, 2, false, 0, 1);
    expect(spySetDropDownPosition).toHaveBeenCalled();
  });
  it('renders correctly with method renderButton', () => {
    props.useCustomContent = true;
    const component = shallow(<AddressDropdown {...props} />);
    const instance = component.instance();
    const spyRenderButton = jest.spyOn(instance, 'renderButton');
    instance.renderButton({ item: { label: {} } });
    expect(spyRenderButton).toHaveBeenCalled();
  });
  it('renders correctly with method renderButton with showButton false', () => {
    props.showButton = false;
    const component = shallow(<AddressDropdown {...props} />);
    const instance = component.instance();
    const spyRenderButton = jest.spyOn(instance, 'renderButton');
    instance.renderButton({ item: { label: {} } });
    expect(spyRenderButton).toHaveBeenCalled();
  });
  it('renders correctly with method openAddressBook', () => {
    const component = shallow(<AddressDropdown {...props} />);
    const instance = component.instance();
    const spyOpenAddressBook = jest.spyOn(instance, 'openAddressBook');
    instance.openAddressBook();
    expect(spyOpenAddressBook).toHaveBeenCalled();
  });
  it('renders correctly with method openAddressBook with null', () => {
    props.addAddress = null;
    props.toggleModal = null;
    const component = shallow(<AddressDropdown {...props} />);
    const instance = component.instance();
    const spyOpenAddressBook = jest.spyOn(instance, 'openAddressBook');
    instance.openAddressBook();
    expect(spyOpenAddressBook).toHaveBeenCalled();
  });
  it('renders correctly with method openDropDown', () => {
    const component = shallow(<AddressDropdown {...props} />);
    const instance = component.instance();
    const spyOpenDropDown = jest.spyOn(instance, 'openDropDown');
    instance.openDropDown();
    expect(spyOpenDropDown).toHaveBeenCalled();
  });
  it('renders correctly with method openDropDown with no id', () => {
    props.data = [{ id: '', primary: true, label: 'ok' }];
    const component = shallow(<AddressDropdown {...props} />);
    const instance = component.instance();
    const spyOpenDropDown = jest.spyOn(instance, 'openDropDown');
    instance.openDropDown();
    expect(spyOpenDropDown).toHaveBeenCalled();
  });
  it('renders correctly with method dropDownLayout', () => {
    const component = shallow(<AddressDropdown {...props} />);
    const instance = component.instance();
    const spyDropDownLayout = jest.spyOn(instance, 'dropDownLayout');
    instance.dropDownLayout({ item: { id: 1 } });
    expect(spyDropDownLayout).toHaveBeenCalled();
  });
  it('renders correctly with method dropDownLayout with no id', () => {
    const component = shallow(<AddressDropdown {...props} />);
    const instance = component.instance();
    const spyDropDownLayout = jest.spyOn(instance, 'dropDownLayout');
    instance.dropDownLayout({ item: { id: '' } });
    expect(spyDropDownLayout).toHaveBeenCalled();
  });
  it('renders correctly with method onDropDownItemClick with no id', () => {
    const component = shallow(<AddressDropdown {...props} />);
    const instance = component.instance();
    const spyOnDropDownItemClick = jest.spyOn(instance, 'onDropDownItemClick');
    instance.onDropDownItemClick({
      item: { id: 1, displayName: 'test', fullName: 'ok', value: 'test' },
    });
    expect(spyOnDropDownItemClick).toHaveBeenCalled();
  });
  it('renders correctly with method onDropDownItemClick with else', () => {
    props.onValueChange = null;
    const component = shallow(<AddressDropdown {...props} />);
    const instance = component.instance();
    const spyOnDropDownItemClick = jest.spyOn(instance, 'onDropDownItemClick');
    instance.onDropDownItemClick({
      item: { id: 1, displayName: 'test', fullName: '', value: '' },
    });
    expect(spyOnDropDownItemClick).toHaveBeenCalled();
  });
  it('renders correctly with method onDropDownItemClick with label', () => {
    const component = shallow(<AddressDropdown {...props} />);
    const instance = component.instance();
    const spyOnDropDownItemClick = jest.spyOn(instance, 'onDropDownItemClick');
    instance.onDropDownItemClick({
      item: { id: 1, displayName: 'test', fullName: 'test', label: '' },
    });
    expect(spyOnDropDownItemClick).toHaveBeenCalled();
  });
  it('renders correctly with method closeDropDown', () => {
    const component = shallow(<AddressDropdown {...props} />);
    const instance = component.instance();
    const spyCloseDropDown = jest.spyOn(instance, 'closeDropDown');
    instance.closeDropDown();
    expect(spyCloseDropDown).toHaveBeenCalled();
  });
  it('renders correctly with method updateState', () => {
    const component = shallow(<AddressDropdown {...props} />);
    const instance = component.instance();
    const spySelectedLabelState = jest.spyOn(instance, 'updateState');
    instance.updateState({ selectedLabelState: 'test' });
    expect(spySelectedLabelState).toHaveBeenCalled();
  });
});
