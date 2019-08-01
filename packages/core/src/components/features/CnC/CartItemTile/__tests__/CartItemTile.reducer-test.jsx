import { fromJS } from 'immutable';
import { DEFAULT_REDUCER_KEY } from '../../../../../utils/cache.util';
import CARTPAGE_CONSTANTS from '../CartItemTile.constants';
import CartPage from '../container/CartItemTile.reducer';

describe('AddGiftCard Reducer', () => {
  const initialState = fromJS({
    [DEFAULT_REDUCER_KEY]: null,
    items: [],
    editableItemData: {},
  });

  const getOrderDetailAction = {
    type: CARTPAGE_CONSTANTS.GET_ORDER_DETAILS_COMPLETE,
    payload: {
      orderDetails: {
        orderItems: [1],
      },
    },
  };

  const getProductSkuInfoSuccess = {
    type: CARTPAGE_CONSTANTS.GET_PRODUCT_SKU_INFO_SUCCESS,
    payload: {
      product: {
        productId: '1',
      },
    },
  };

  it('GET_ORDER_DETAILS_COMPLETE', () => {
    const newState = CartPage(initialState, {
      ...getOrderDetailAction,
    });

    expect(newState.orderDetails.length).toEqual(getOrderDetailAction.payload.orderDetails.length);
  });

  it('GET_PRODUCT_SKU_INFO_SUCCESS', () => {
    const newState = CartPage(initialState, {
      ...getProductSkuInfoSuccess,
    });

    expect(newState.editableItemData.productId).toEqual(
      getProductSkuInfoSuccess.payload.product.productId
    );
  });
});
