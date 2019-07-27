import React from 'react';
import { shallow } from 'enzyme';
import { AddedToBagContainer, mapDispatchToProps } from '../container/AddedToBag.container';
import AddedToBag from '../views/AddedToBag.view';

describe('Added to Bag Container', () => {
  const addedToBagData = {};
  it('should render Added to Bag view section', () => {
    const tree = shallow(
      <AddedToBagContainer
        addToCartEcom={jest.fn()}
        closeModal={jest.fn()}
        addedToBagData={addedToBagData}
        isOpenDialog
      />
    );
    expect(tree.is(AddedToBag)).toBeTruthy();
  });
  describe('#mapDispatchToProps', () => {
    it('should return an action closeModal which will call dispatch function on execution', () => {
      const dispatch = jest.fn();
      const dispatchProps = mapDispatchToProps(dispatch);
      dispatchProps.closeModal();
      expect(dispatch.mock.calls).toHaveLength(1);
    });
  });
});
