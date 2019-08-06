import React from 'react';
import { List } from 'immutable';
import { shallow } from 'enzyme';
import { MiniBagContainer } from '../container/MiniBag.container';
import MiniBagView from '../views/MiniBag.view';

describe('Mini Bag Container', () => {
  const orderItems = List([1, 2]);
  it('should render Mini Bag view section', () => {
    const tree = shallow(<MiniBagContainer initialActions={jest.fn()} orderItems={orderItems} />);
    expect(tree.is(MiniBagView)).toBeTruthy();
  });
});
