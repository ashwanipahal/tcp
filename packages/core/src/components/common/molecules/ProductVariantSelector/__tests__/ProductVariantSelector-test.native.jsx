import React from 'react';
import { shallow } from 'enzyme';

import { ProductVariantSelectorVanilla } from '../views/ProductVariantSelector.native';

describe('ProductVariantSelector native should render correctly', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<ProductVariantSelectorVanilla title="color" />);
  });

  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should call render grid', () => {
    wrapper.setProps({ renderColorItem: false, data: [{}], title: 'Color' });
    const Grid = wrapper.find('Grid');
    expect(Grid.length).toBe(1);
  });

  it('should call default render grid item method', () => {
    const item = { name: 'WHITE' };
    const selectItem = jest.fn();
    wrapper.setProps({
      data: [{}],
      title: 'Color',
      selectedItem: item,
      selectItem,
      itemNameKey: 'name',
      itemValue: 'WHITE',
    });
    const Grid = wrapper.find('Grid');
    const gridItem = shallow(Grid.props().renderItem({ item }));
    gridItem.props().onPress();
    expect(selectItem).toHaveBeenCalled();
  });
});
