import React from 'react';
import { shallow } from 'enzyme';
import { DropDownVanilla } from '../views/SortModalDropdown.native';

describe('SortModalDropdown Test', () => {
  let component;

  const props = {
    data: [{ label: 'foo', value: 'foo' }],
    selectedValue: 'foo',
    onValueChange: jest.fn(),
    onPressOut: jest.fn(),
    variation: 'primary',
    itemStyle: {
      color: 'foo',
    },
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
    const flatList = component.find('Styled(FlatList)');
    expect(flatList).toHaveLength(1);
    expect(flatList.props().keyExtractor(item)).toBe('foo');
  });

  it('test flatlist ItemSeparatorComponent', () => {
    component.setState({ dropDownIsOpen: true });
    const flatList = component.find('Styled(FlatList)');
    expect(flatList).toHaveLength(1);
    expect(flatList.props().ItemSeparatorComponent()).not.toBeNull();
  });

  it('test getDerivedStateFromProps', () => {
    const state = {
      selectedLabelState: 'abc',
    };
    const result = DropDownVanilla.getDerivedStateFromProps(props, state);
    expect(result).toEqual({ selectedLabelState: 'foo' });
  });

  it('test getDerivedStateFromProps with id as value', () => {
    const state = {
      selectedLabelState: 'abc',
    };
    props.data = [{ displayName: 'foo', id: 'foo' }];
    const result = DropDownVanilla.getDerivedStateFromProps(props, state);
    expect(result).toEqual({ selectedLabelState: 'foo' });
  });

  it('test setDropDownPosition func', () => {
    const position = { top: 100 };
    const windowHeight = 1087;
    const deviceRemainingHeight = 300;

    const instance = component.instance();

    instance.setDropDownPosition(position, deviceRemainingHeight, true, 200, windowHeight);
    expect(component.state('flatListHeight')).toEqual(100);

    instance.setDropDownPosition(position, deviceRemainingHeight, true, 400, windowHeight);
    expect(component.state('flatListHeight')).toEqual(200);

    instance.setDropDownPosition(position, deviceRemainingHeight, false, 1400, windowHeight);
    expect(component.state('flatListHeight')).toEqual(815.25);

    instance.setDropDownPosition(position, deviceRemainingHeight, false, 200, windowHeight);
    expect(component.state('flatListHeight')).toEqual(200);
  });
});
