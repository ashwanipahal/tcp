import BAGPAGE_CONSTANTS from '../BagPage.constants';
import BAG_PAGE_ACTIONS from '../container/BagPage.actions';

describe('#Bag Page actions', () => {
  it('applyGiftCard', () => {
    const data = {
      id: 123,
    };
    expect(BAG_PAGE_ACTIONS.addItemToSflList(data)).toEqual({
      payload: { id: 123 },
      type: BAGPAGE_CONSTANTS.ADD_ITEM_SAVE_FOR_LATER,
    });
  });
  it('setCartItemsSFL', () => {
    expect(BAG_PAGE_ACTIONS.setCartItemsSFL(true)).toEqual({
      payload: true,
      type: BAGPAGE_CONSTANTS.CART_ITEMS_SET_SFL,
    });
  });
  it('setCartItemsSflError', () => {
    const error = 'Error Message';
    expect(BAG_PAGE_ACTIONS.setCartItemsSflError(error)).toEqual({
      payload: error,
      type: BAGPAGE_CONSTANTS.CART_ITEMS_SET_SFL_ERROR,
    });
  });
});
