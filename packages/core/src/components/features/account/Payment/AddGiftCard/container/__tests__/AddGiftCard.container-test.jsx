import React from 'react';
import { shallow } from 'enzyme';
import { AddGiftCardContainerVanilla, mapDispatchToProps } from '../AddGiftCard.container';
import AddGiftCardComponent from '../../views/AddGiftCard.view';

describe('Add Gift Card Container', () => {
  const props = {
    onAddGiftCardClick: jest.fn(),
    addGiftCardResponse: 'foo',
    getAddGiftCardErr: 'foo',
    labels: {},
    toggleModal: jest.fn(),
    getCardListAction: jest.fn(),
  };

  it('should render gift card view section', () => {
    const tree = shallow(<AddGiftCardContainerVanilla {...props} />);
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
