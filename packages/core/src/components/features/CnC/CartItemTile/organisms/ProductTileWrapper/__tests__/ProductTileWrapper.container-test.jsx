import React from 'react';
import { List } from 'immutable';
import { shallow } from 'enzyme';
import { ProductTileWrapperContainer } from '../container/ProductTileWrapper.container';
import ProductTileWrapper from '../views/ProductTileWrapper.view';
import QuickViewModal from '../../../../../../common/organisms/QuickViewModal/container/QuickViewModal.container';

describe('ProductTileWrapper Container', () => {
  const orderItems = List([1, 2]);
  it('should render ProductTileWrapper view section', () => {
    const tree = shallow(
      <ProductTileWrapperContainer initialActions={jest.fn()} orderItems={orderItems} />
    );
    expect(tree.find(ProductTileWrapper)).toBeTruthy();
    expect(tree.find(QuickViewModal)).toBeTruthy();
  });
});
