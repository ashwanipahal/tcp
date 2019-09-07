import React from 'react';
import { shallow } from 'enzyme';
import { GiftCardsContainer, mapDispatchToProps } from '../GiftCards.container';

describe('Gift Cards Container', () => {
  const props = {
    labels: {},
    giftCardErrors: {},
    itemOrderGrandTotal: 100,
    itemsGiftCardTotal: 50,
    giftCardList: {},
    getCardListAction: jest.fn(),
    handleApplyGiftCard: jest.fn(),
    handleRemoveGiftCard: jest.fn(),
    handleSetOrderBalanceTotal: jest.fn(),
    toastMessage: jest.fn(),
  };

  it('should render Gift Card view section', () => {
    const component = shallow(<GiftCardsContainer {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('applyExistingGiftCardToOrder to be called', () => {
    const giftCard = {
      creditCardId: 123,
      billingAddressId: '34',
      accountNo: '*********4454',
      cardPin: '',
      balance: null,
    };
    const component = shallow(<GiftCardsContainer {...props} />);
    component.instance().applyExistingGiftCardToOrder(giftCard);
    expect(component).toBeDefined();
  });

  it('componentDidUpdate to be called', () => {
    const component = shallow(<GiftCardsContainer {...props} />);
    component.instance().componentDidUpdate();
    expect(component).toBeDefined();
  });

  describe('#mapDispatchToProps', () => {
    it('should call gift card list', () => {
      const dispatch = jest.fn();
      const dispatchProps = mapDispatchToProps(dispatch);
      dispatchProps.getCardListAction();
      expect(dispatch.mock.calls).toHaveLength(1);
    });
    it('#handleApplyGiftCard', () => {
      const dispatch = jest.fn();
      const dispatchProps = mapDispatchToProps(dispatch);
      dispatchProps.handleApplyGiftCard();
      expect(dispatch.mock.calls).toHaveLength(1);
    });
    it('#handleRemoveGiftCard', () => {
      const dispatch = jest.fn();
      const dispatchProps = mapDispatchToProps(dispatch);
      dispatchProps.handleRemoveGiftCard();
      expect(dispatch.mock.calls).toHaveLength(1);
    });
    it('#handleSetOrderBalanceTotal', () => {
      const dispatch = jest.fn();
      const dispatchProps = mapDispatchToProps(dispatch);
      dispatchProps.handleSetOrderBalanceTotal();
      expect(dispatch.mock.calls).toHaveLength(1);
    });
    it('#toastMessage', () => {
      const dispatch = jest.fn();
      const dispatchProps = mapDispatchToProps(dispatch);
      dispatchProps.toastMessage();
      expect(dispatch.mock.calls).toHaveLength(1);
    });
  });
});
