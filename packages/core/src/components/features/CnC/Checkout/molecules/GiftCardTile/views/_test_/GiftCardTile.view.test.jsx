import React from 'react';
import { shallow } from 'enzyme';
import { GiftCardTileVanilla } from '../GiftCardTile.view';

describe('GiftCardTileVanilla', () => {
  const props = {
    labels: {},
    applyExistingGiftCardToOrder: jest.fn(),
    handleRemoveGiftCard: jest.fn(),
    className: 'test',
    cardData: { creditCardId: 123, name: 'test' },
  };

  it('should render gift card tile', () => {
    const component = shallow(<GiftCardTileVanilla {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('should render gift card tile with 0 order balance', () => {
    const component = shallow(<GiftCardTileVanilla orderBalanceTotal={0} {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('should render gift card tile with 100 order balance', () => {
    const component = shallow(<GiftCardTileVanilla orderBalanceTotal={100} {...props} />);
    expect(component).toMatchSnapshot();
  });
});
