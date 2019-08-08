import React from 'react';
import { List } from 'immutable';
import { shallow } from 'enzyme';
import { ProductTileWrapperContainer } from '../container/ProductTileWrapperContainer.container';
import ProductTileWrapper from '../views/ProductTileWrapper.view';

describe('ProductTileWrapper Container', () => {
  const orderItems = List([1, 2]);
  it('should render ProductTileWrapper view section', () => {
    const tree = shallow(
      <ProductTileWrapperContainer initialActions={jest.fn()} orderItems={orderItems} />
    );
    expect(tree.is(ProductTileWrapper)).toBeTruthy();
  });
});
