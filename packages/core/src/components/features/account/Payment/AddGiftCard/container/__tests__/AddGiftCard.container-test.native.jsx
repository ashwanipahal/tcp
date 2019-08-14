import React from 'react';
import { shallow } from 'enzyme';
import { AddGiftCardContainerVanilla, mapDispatchToProps } from '../AddGiftCard.container.native';

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
    expect(tree).toMatchSnapshot();
  });

  it('should render gift card view section with success response', () => {
    const tree = shallow(<AddGiftCardContainerVanilla {...props} />);
    tree.setProps({ addGiftCardResponse: 'success' });
    expect(tree).toMatchSnapshot();
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
