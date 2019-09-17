import React from 'react';
import { shallow } from 'enzyme';

import Grid from '../views/Grid.native';

describe('Grid native should render correctly', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Grid />);
  });

  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should call renderItem in props', () => {
    const renderItem = jest.fn();
    wrapper.setProps({ renderItem });
    wrapper.props().renderItem({ item: {}, index: 0 });
    expect(renderItem).toHaveBeenCalled();
  });

  it('should call keyExtractor in props', () => {
    const keyExtractor = jest.fn();
    wrapper.setProps({ keyExtractor });
    expect(wrapper.props().keyExtractor).toEqual(keyExtractor);
  });

  it('should call ItemSeparatorComponent in props', () => {
    const ItemSeparatorComponent = jest.fn();
    wrapper.setProps({ ItemSeparatorComponent });
    wrapper.props().ItemSeparatorComponent();
    expect(ItemSeparatorComponent).toHaveBeenCalled();
  });

  it('should call default ItemSeparatorComponent', () => {
    expect(wrapper.props().ItemSeparatorComponent()).toBeDefined();
  });

  it('should call default keyExtractor', () => {
    expect(wrapper.props().keyExtractor({}, 1)).toEqual('1');
  });
});
