import React from 'react';
import { shallow } from 'enzyme';
import { enableBodyScroll, disableBodyScroll } from '@tcp/core/src/utils';
import { AddedToBagContainer, mapDispatchToProps } from '../container/AddedToBag.container';
import AddedToBag from '../views/AddedToBag.view';

jest.mock('@tcp/core/src/utils', () => ({
  ...jest.requireActual('@tcp/core/src/utils'),
  isMobileApp: jest.fn().mockImplementation(() => false),
  enableBodyScroll: jest.fn(),
  disableBodyScroll: jest.fn(),
}));
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

  it('should call disableBodyScroll when opened', () => {
    const tree = shallow(
      <AddedToBagContainer
        addToCartEcom={jest.fn()}
        closeModal={jest.fn()}
        addedToBagData={addedToBagData}
        isOpenDialog={false}
      />
    );
    tree.setProps({ isOpenDialog: true });
    expect(disableBodyScroll).toHaveBeenCalled();
  });

  it('should call enableBodyScroll when opened', () => {
    const tree = shallow(
      <AddedToBagContainer
        addToCartEcom={jest.fn()}
        closeModal={jest.fn()}
        addedToBagData={addedToBagData}
        isOpenDialog
      />
    );
    tree.instance().closeModal({ preventDefault: jest.fn() });
    expect(enableBodyScroll).toHaveBeenCalled();
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
