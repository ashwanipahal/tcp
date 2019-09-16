import React from 'react';
import { shallow } from 'enzyme';
import { FiltersVanilla } from '../views/Filters.view.native';

describe('FiltersVanilla is shown', () => {
  let wrapper;

  beforeEach(() => {
    const props = {
      filters: {
        unbxdDisplayName: { TCPColor_uFilter: 'Color', Size: 'Size' },
      },
      theme: {},
      labelsFilter: { lbl_clear: 'Clear', lbl_apply: 'Apply' },
    };

    wrapper = shallow(<FiltersVanilla {...props} />);
  });

  it('should render FiltersVanilla', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should render 2 Flatlists', () => {
    wrapper.setProps({
      filters: {
        TCPColor_uFilter: [{ id: 'red' }, { id: 'blue' }],
        Size: [{ id: 'XS' }, { id: 'S' }],
      },
    });

    const flatlist = wrapper.find('FlatList');
    expect(flatlist.length).toBe(2);
    expect(
      flatlist
        .first()
        .props()
        .listKey({ id: '1' })
    ).toEqual('1');
    expect(
      flatlist
        .first()
        .props()
        .keyExtractor({ id: '1' })
    ).toEqual('1');
  });

  it('should render items in flatlist', () => {
    wrapper.setProps({
      filters: {
        Size: [{ id: 'XS' }, { id: 'S' }],
      },
    });
    const item = { displayName: 'XS' };
    const listItem = shallow(
      wrapper
        .find('FlatList')
        .first()
        .props()
        .renderItem({ item })
    );
    expect(listItem.length).toBe(1);
    listItem.props().onPress();
    expect(item.isSelected).toBeTruthy();
    expect(wrapper.instance().state.selectedItems.length).toBe(1);
    listItem.props().onPress();
    expect(wrapper.instance().state.selectedItems.length).toBe(0);
  });

  it('should render color items', () => {
    wrapper.setProps({
      filters: {
        TCPColor_uFilter: [{ id: 'red' }, { id: 'blue' }],
      },
    });
    const item = { imagePath: '//' };
    const listItem = shallow(
      wrapper
        .find('FlatList')
        .first()
        .props()
        .renderItem({ item })
    );
    expect(listItem.length).toBe(1);
    listItem.props().onPress();
    expect(item.isSelected).toBeTruthy();
    expect(wrapper.instance().state.selectedItems.length).toBe(1);
    listItem.props().onPress();
    expect(wrapper.instance().state.selectedItems.length).toBe(0);
  });

  it('should clear all filters', () => {
    const onSubmit = jest.fn();
    wrapper.setProps({ onSubmit });
    wrapper.instance().setState({ selectedItems: [{ id: '1', isSelected: true }] });
    wrapper
      .find('[text="Clear"]')
      .props()
      .onPress();
    expect(onSubmit).toHaveBeenCalledWith({});
  });

  it('should apply all filters', () => {
    const onSubmit = jest.fn();
    wrapper.setProps({
      filters: {
        unbxdDisplayName: { TCPColor_uFilter: 'Color' },
        TCPColor_uFilter: [{ id: 'red', isSelected: true }, { id: 'blue' }],
      },
      onSubmit,
    });

    wrapper
      .find('[text="Apply"]')
      .props()
      .onPress();
    expect(onSubmit).toHaveBeenCalledWith({ Size: [], TCPColor_uFilter: ['red'] });
  });
});
