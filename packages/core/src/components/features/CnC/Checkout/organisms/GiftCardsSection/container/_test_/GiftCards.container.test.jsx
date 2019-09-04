import React from 'react';
import { shallow } from 'enzyme';
import { GiftCardsContainer } from '../GiftCards.container';

describe('Gift Cards Container', () => {
  const props = {
    labels: {},
    giftCardErrors: {},
    itemOrderGrandTotal: 100,
    itemsGiftCardTotal: 50,
    giftCardList: {},
    getCardListAction: jest.fn(),
  };

  it('should render Gift Card view section', () => {
    const component = shallow(<GiftCardsContainer {...props} />);
    expect(component).toMatchSnapshot();
  });
});
