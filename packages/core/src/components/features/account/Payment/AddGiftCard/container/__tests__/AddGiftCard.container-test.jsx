import React from 'react';
import { shallow } from 'enzyme';
import { AddGiftCardContainer, mapDispatchToProps } from '../AddGiftCard.container';
import AddGiftCardComponent from '../../views/AddGiftCard.view';
import labels from '../AddGiftCard.labels';

describe('Add Gift Card Container', () => {
  it('should render gift card view section', () => {
    const tree = shallow(
      <AddGiftCardContainer
        onAddGiftCardClick={jest.fn()}
        labels={labels}
        addGiftCardResponse={jest.fn()}
        getCardListAction={jest.fn()}
      />
    );
    expect(tree.is(AddGiftCardComponent)).toBeTruthy();
  });

  describe('#mapDispatchToProps', () => {
    it('should return an action onAddGiftCardClick which will call dispatch function on execution', () => {
      const dispatch = jest.fn();
      const dispatchProps = mapDispatchToProps(dispatch);
      dispatchProps.onAddGiftCardClick();
      expect(dispatch.mock.calls).toHaveLength(1);
    });
  });
});
