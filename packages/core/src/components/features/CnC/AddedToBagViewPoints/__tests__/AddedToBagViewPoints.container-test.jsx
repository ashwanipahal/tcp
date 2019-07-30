import React from 'react';
import { shallow } from 'enzyme';
import { AddedToBagViewPointsContainer } from '../containers/AddedToBagViewPoints.container';
import AddedToBagViewPoints from '../views/AddedToBagViewPoints.view';

describe('Added To Bag View Points', () => {
  it('should render AddedToBag view section', () => {
    const tree = shallow(<AddedToBagViewPointsContainer getOrderDetailsAction={jest.fn()} />);
    expect(tree.is(AddedToBagViewPoints)).toBeTruthy();
  });
});
