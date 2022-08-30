import GIFTCARD_CONSTANTS from '../../GiftCards.constants';
import GIFT_CARD_ACTIONS from '../GiftCards.action';

describe('#GiftCardActions', () => {
  it('applyGiftCard', () => {
    const data = {
      id: 123,
    };
    expect(GIFT_CARD_ACTIONS.applyGiftCard(data)).toEqual({
      payload: { id: 123 },
      type: GIFTCARD_CONSTANTS.APPLY_GIFT_CARD,
    });
  });
  it('removeGiftCard', () => {
    const piId = '92301';
    expect(GIFT_CARD_ACTIONS.removeGiftCard(piId)).toEqual({
      payload: '92301',
      type: GIFTCARD_CONSTANTS.REMOVE_GIFT_CARD,
    });
  });
  it('addGiftCard', () => {
    const data = { cardPin: 'foo', giftCardNumber: 'foo', recaptchaToken: 'wedseweweeeeeeeec' };
    expect(GIFT_CARD_ACTIONS.addGiftCard(data)).toEqual({
      payload: data,
      type: GIFTCARD_CONSTANTS.ADD_GIFT_CARD,
    });
  });
});
