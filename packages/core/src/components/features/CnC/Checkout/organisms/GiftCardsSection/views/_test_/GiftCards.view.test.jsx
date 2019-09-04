import React from 'react';
import { shallow } from 'enzyme';
import { GiftCardsVanilla } from '../GiftCards.view';

describe('GiftCardsVanilla', () => {
  const props = {
    labels: {},
    applyExistingGiftCardToOrder: jest.fn(),
    handleRemoveGiftCard: jest.fn(),
    className: 'test',
    cardData: { creditCardId: 123, name: 'test' },
    appliedGiftCards: { creditCardId: 123, name: 'test' },
  };

  it('should render gift card tile', () => {
    const component = shallow(<GiftCardsVanilla {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('should render gift card tile with 0 order balance', () => {
    const component = shallow(<GiftCardsVanilla orderBalanceTotal={0} {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('should render gift card tile with 100 order balance', () => {
    const component = shallow(<GiftCardsVanilla orderBalanceTotal={100} {...props} />);
    expect(component).toMatchSnapshot();
  });
});
