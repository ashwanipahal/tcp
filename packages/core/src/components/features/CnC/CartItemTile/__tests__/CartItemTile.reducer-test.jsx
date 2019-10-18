import { fromJS } from 'immutable';
import { DEFAULT_REDUCER_KEY } from '../../../../../utils/cache.util';
import CARTPAGE_CONSTANTS from '../CartItemTile.constants';
import CartItemTile from '../container/CartItemTile.reducer';

describe('AddGiftCard Reducer', () => {
  const initialState = fromJS({
    [DEFAULT_REDUCER_KEY]: null,
    items: [],
    editableItemData: {},
  });

  const getProductSkuInfoSuccess = {
    type: CARTPAGE_CONSTANTS.GET_PRODUCT_SKU_INFO_SUCCESS,
    payload: {
      product: {
        productId: '1',
      },
    },
  };

  const setToggleCartItemError = {
    type: CARTPAGE_CONSTANTS.SET_TOGGLE_CART_ITEM_ERROR,
    payload: {
      error: {
        errorMessage: 'ERROR',
      },
    },
  };

  const clearToggleCartItemError = {
    type: CARTPAGE_CONSTANTS.CLEAR_TOGGLE_CART_ITEM_ERROR,
  };

  it('GET_PRODUCT_SKU_INFO_SUCCESS', () => {
    const newState = CartItemTile(initialState, {
      ...getProductSkuInfoSuccess,
    });

    expect(newState.get('editableItemData').get('productId')).toEqual(
      getProductSkuInfoSuccess.payload.product.productId
    );
  });

  it('SET_TOGGLE_CART_ITEM_ERROR', () => {
    const newState = CartItemTile(initialState, {
      ...setToggleCartItemError,
    });

    expect(newState.getIn(['toggleError', 'error', 'errorMessage'])).toEqual('ERROR');
  });

  it('CLEAR_TOGGLE_CART_ITEM_ERROR', () => {
    const newState = CartItemTile(initialState, {
      ...clearToggleCartItemError,
    });

    expect(newState.get('toggleError')).toBeFalsy();
  });

  it('DEFAULT', () => {
    const newState = CartItemTile(initialState, {});
    expect(newState).toEqual(initialState);
  });
});
