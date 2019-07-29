import React from 'react';
import { Text, FlatList } from 'react-native';
import { shallow } from 'enzyme';
import { ProductListView } from '../views/ProductListingPage.view.native';

describe('ProductListingPage Component', () => {
  let component;
  const props = {
    addToCartEcom: Function,
    data: {},
    quantity: 1,
    className: '',
    giftCardProducts: {},
  };

  beforeEach(() => {
    component = shallow(<ProductListView {...props} />);
  });

  it('ProductListingPage should be defined', () => {
    expect(component).toBeDefined();
  });

  it('ProductListingPage should render correctly', () => {
    expect(component).toMatchSnapshot();
  });
  it('ProductListingPage should return FlatList component value one', () => {
    expect(component.find(FlatList)).toHaveLength(1);
  });

  it('ProductListingPage should return Text component value one', () => {
    expect(component.find(Text)).toHaveLength(1);
  });
});
