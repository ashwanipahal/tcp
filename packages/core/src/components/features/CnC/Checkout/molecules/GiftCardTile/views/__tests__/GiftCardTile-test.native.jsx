import React from 'react';
import { Map } from 'immutable';
import { shallow } from 'enzyme';
import GiftCardTile from '../GiftCardTile.view.native';

describe('GiftCardTileVanilla', () => {
  const props = {
    labels: {},
    applyExistingGiftCardToOrder: jest.fn(),
    handleRemoveGiftCard: jest.fn(),
    className: 'test',
    cardData: { creditCardId: 123, name: 'test' },
  };

  it('should render gift card tile', () => {
    const component = shallow(<GiftCardTile {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('should render gift card tile with 0 order balance', () => {
    const component = shallow(<GiftCardTile orderBalanceTotal={0} {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('should render gift card tile with 100 order balance', () => {
    const component = shallow(<GiftCardTile orderBalanceTotal={100} {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('should render gift card tile with errors', () => {
    const giftCardErrors = { 123: 'some error message' };

    const component = shallow(<GiftCardTile giftCardErrors={giftCardErrors} {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('should render gift card tile with isGiftCardApplied', () => {
    const appliedProps = {
      labels: {},
      applyExistingGiftCardToOrder: jest.fn(),
      handleRemoveGiftCard: jest.fn(),
      className: 'test',
      cardData: Map({ accountNo: '*******2123', name: 'test', remainingBalance: 0.25 }),
    };
    const component = shallow(<GiftCardTile isGiftCardApplied {...appliedProps} />);
    expect(component).toMatchSnapshot();
  });
});
