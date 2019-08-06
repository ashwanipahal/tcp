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

  it('GET_PRODUCT_SKU_INFO_SUCCESS', () => {
    const newState = CartItemTile(initialState, {
      ...getProductSkuInfoSuccess,
    });

    expect(newState.get('editableItemData').get('productId')).toEqual(
      getProductSkuInfoSuccess.payload.product.productId
    );
  });
});
