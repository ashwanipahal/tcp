import React from 'react';
import { shallow } from 'enzyme';
import { fromJS } from 'immutable';
import { GiftCardsContainer, mapDispatchToProps } from '../GiftCards.container';

const appliedGiftCardList = [
  {
    creditCardId: 123,
    name: 'test',
    onFileCardId: 123,
  },
  {
    creditCardId: 124,
    name: 'test',
    onFileCardId: 124,
  },
];

describe('Gift Cards Container', () => {
  const props = {
    labels: {},
    giftCardErrors: {},
    itemOrderGrandTotal: 100,
    itemsGiftCardTotal: 50,
    getCardListAction: jest.fn(),
    handleApplyGiftCard: jest.fn(),
    handleRemoveGiftCard: jest.fn(),
    handleSetOrderBalanceTotal: jest.fn(),
    toastMessage: jest.fn(),
    addGiftCardResponse: 'success',
    hideAddGiftCard: jest.fn(),
    resetAddGiftCardAction: jest.fn(),
    handleSubmit: jest.fn(),
    appliedGiftCards: fromJS(appliedGiftCardList),
    giftCardList: appliedGiftCardList,
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
    it('#showAddGiftCard', () => {
      const dispatch = jest.fn();
      const dispatchProps = mapDispatchToProps(dispatch);
      dispatchProps.showAddGiftCard();
      expect(dispatch.mock.calls).toHaveLength(1);
    });
    it('#hideAddGiftCard', () => {
      const dispatch = jest.fn();
      const dispatchProps = mapDispatchToProps(dispatch);
      dispatchProps.hideAddGiftCard();
      expect(dispatch.mock.calls).toHaveLength(1);
    });
    it('#handleSubmit', () => {
      const dispatch = jest.fn();
      const dispatchProps = mapDispatchToProps(dispatch);
      const data = { cardPin: 'foo', giftCardNumber: 'foo', recaptchaToken: 'wedseweweeeeeeeec' };
      dispatchProps.handleSubmit(data);
      expect(dispatch.mock.calls).toHaveLength(1);
    });
    it('#resetAddGiftCardAction', () => {
      const dispatch = jest.fn();
      const dispatchProps = mapDispatchToProps(dispatch);
      dispatchProps.resetAddGiftCardAction();
      expect(dispatch.mock.calls).toHaveLength(1);
    });
    it('submitGiftCardData to be called', () => {
      const component = shallow(<GiftCardsContainer {...props} />);
      const data = { cardPin: 'foo', giftCardNumber: 'foo', recaptchaToken: 'wedseweweeeeeeeec' };
      component.instance().submitGiftCardData(data);
      expect(component).toBeDefined();
    });
  });
});
