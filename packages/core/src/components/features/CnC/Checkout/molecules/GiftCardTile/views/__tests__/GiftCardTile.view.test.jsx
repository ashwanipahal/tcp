import React from 'react';
import { Map } from 'immutable';
import { shallow } from 'enzyme';
import { GiftCardTileVanilla } from '../GiftCardTile.view';

describe('GiftCardTileVanilla', () => {
  const props = {
    labels: {},
    applyExistingGiftCardToOrder: jest.fn(),
    handleRemoveGiftCard: jest.fn(),
    className: 'test',
    cardData: { creditCardId: 123, name: 'test' },
    isFromReview: false,
  };

  it('should render gift card tile', () => {
    const component = shallow(<GiftCardTileVanilla {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('should render gift card tile if from review page', () => {
    props.isFromReview = true;
    props.isExpressCheckout = true;
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

  it('should render gift card tile with errors', () => {
    const giftCardErrors = { 123: 'some error message' };

    const component = shallow(<GiftCardTileVanilla giftCardErrors={giftCardErrors} {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('should render gift card tile with isGiftCardApplied', () => {
    const appliedProps = {
      labels: {},
      applyExistingGiftCardToOrder: jest.fn(),
      handleRemoveGiftCard: jest.fn(),
      className: 'test',
      cardData: Map({ accountNo: '*******2123', name: 'test' }),
    };
    const component = shallow(<GiftCardTileVanilla isGiftCardApplied {...appliedProps} />);
    expect(component).toMatchSnapshot();
  });
});
