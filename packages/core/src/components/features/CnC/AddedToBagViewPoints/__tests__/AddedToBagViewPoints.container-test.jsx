import React from 'react';
import { shallow } from 'enzyme';
import {
  AddedToBagViewPointsContainer,
  mapDispatchToProps,
} from '../containers/AddedToBagViewPoints.container';
import AddedToBagViewPoints from '../views/AddedToBagViewPoints.view';

describe('Added To Bag View Points', () => {
  it('should render AddedToBag view section', () => {
    const tree = shallow(<AddedToBagViewPointsContainer getOrderDetailsAction={jest.fn()} />);
    expect(tree.is(AddedToBagViewPoints)).toBeTruthy();
  });
  describe('#mapDispatchToProps', () => {
    it('should return an action getOrderDetailsAction which will call dispatch function on execution', () => {
      const dispatch = jest.fn();
      const dispatchProps = mapDispatchToProps(dispatch);
      dispatchProps.getOrderDetailsAction();
      expect(dispatch.mock.calls).toHaveLength(1);
    });
  });
});
