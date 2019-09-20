import React from 'react';
import { FlatList } from 'react-native';
import { shallow } from 'enzyme';
import theme from '@tcp/core/styles/themes/TCP';
import { StoreSearchVanilla } from '../views/StoreSearch.native';
import labels from '../__mocks__/storeSearchData';

describe('StoreSearch component', () => {
  let props = {
    handleSubmit: jest.fn(),
    labels,
    theme,
  };

  it('should be defined', () => {
    const component = shallow(<StoreSearchVanilla {...props} />);
    expect(component).toBeDefined();
  });

  it('renderStoreTypes renders correctly props', () => {
    const component = shallow(<StoreSearchVanilla {...props} />);
    const item = { name: 'test', dataLocator: 'gymboree-store-option' };
    component
      .find(FlatList)
      .props()
      .renderItem({ item });
    expect(component).toMatchSnapshot();
  });

  it('StoreSearch component renders correctly props', () => {
    props = {
      ...props,
      error: 'you have an error in the component',
    };
    const component = shallow(<StoreSearchVanilla {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('StoreSearch component renders correctly props', () => {
    const component = shallow(<StoreSearchVanilla {...props} />);
    expect(component).toMatchSnapshot();
  });
});
