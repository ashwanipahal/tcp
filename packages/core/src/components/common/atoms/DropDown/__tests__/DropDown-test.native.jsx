import React from 'react';
import { shallow } from 'enzyme';
import navDataMobile from '@tcp/core/src/components/features/account/Account/MyAccountRoute.config.native';
import { DropDownVanilla } from '../views/DropDown.native';

describe('DropDown Test', () => {
  let component;

  const props = {
    data: navDataMobile,
    selectedValue: 'addressBookMobile',
    onValueChange: jest.fn(),
  };

  beforeEach(() => {
    component = shallow(<DropDownVanilla {...props} />);
    component.setState({ dropDownIsOpen: false });
  });

  it('should be defined', () => {
    expect(component).toBeDefined();
  });

  it('should render correctly', () => {
    expect(component).toMatchSnapshot();
  });

  it('test openDropDown', () => {
    component.instance().openDropDown();
    expect(component.state('dropDownIsOpen')).toBe(true);
  });

  it('test closeDropDown', () => {
    component.instance().closeDropDown();
    expect(component.state('dropDownIsOpen')).toBe(false);
  });

  it('test dropDownLayout', () => {
    const obj = {
      item: {
        label: 'foo',
      },
    };
    component.instance().dropDownLayout(obj);
  });

  it('test onDropDownItemClick', () => {
    const obj = {
      label: 'foo',
      value: 'foo',
    };
    component.instance().onDropDownItemClick(obj);
    expect(component.state('dropDownIsOpen')).toBe(false);
  });
});
