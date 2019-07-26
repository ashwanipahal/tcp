import React from 'react';
import { shallow } from 'enzyme';
import { DropDownVanilla } from '../views/DropDown.native';

describe('DropDown Test', () => {
  let component;

  const props = {
    data: [{ label: 'foo', value: 'foo' }],
    selectedValue: 'foo',
    onValueChange: jest.fn(),
    variation: 'primary',
  };

  beforeEach(() => {
    component = shallow(<DropDownVanilla {...props} />);
  });

  it('should be defined', () => {
    expect(component).toBeDefined();
  });

  it('should render correctly', () => {
    expect(component).toMatchSnapshot();
  });

  it('should render with dropdown open state', () => {
    component.setState({ dropDownIsOpen: true });
    expect(component).toMatchSnapshot();
  });

  it('test openDropDown with primary variation ', () => {
    props.variation = 'primary';
    component = shallow(<DropDownVanilla {...props} />);
    component.instance().openDropDown();
    expect(component.state('dropDownIsOpen')).toBe(true);
  });

  it('test closeDropDown', () => {
    const instance = component.instance();
    instance.closeDropDown();
    expect(component.state('dropDownIsOpen')).toBe(false);

    instance.refs = {
      rowMarker: {
        getRenderedComponent: jest.fn(() => ({
          focus: jest.fn,
        })),
      },
    };
  });

  it('test dropDownLayout', () => {
    const obj = {
      item: {
        label: 'foo',
      },
    };
    expect(component.instance().dropDownLayout(obj)).not.toBeNull();
  });

  it('test onDropDownItemClick', () => {
    const obj = {
      label: 'foo',
      value: 'foo',
    };
    component.instance().onDropDownItemClick(obj);
    expect(component.state('dropDownIsOpen')).toBe(false);
  });

  it('test flatlist keyExtractor', () => {
    const item = {
      key: 'foo',
    };
    component.setState({ dropDownIsOpen: true });
    const flatList = component.find('FlatList');
    expect(flatList).toHaveLength(1);
    expect(flatList.props().keyExtractor(item)).toBe('foo');
  });

  it('test flatlist ItemSeparatorComponent', () => {
    component.setState({ dropDownIsOpen: true });
    const flatList = component.find('FlatList');
    expect(flatList).toHaveLength(1);
    expect(flatList.props().ItemSeparatorComponent()).not.toBeNull();
  });
});
