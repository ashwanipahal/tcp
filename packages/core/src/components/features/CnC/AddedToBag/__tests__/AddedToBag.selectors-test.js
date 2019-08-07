import { fromJS } from 'immutable';
import {
  getAddedToBagData,
  isOpenAddedToBag,
  getOrderItems,
  getQuantityValue,
  getPointsSummary,
} from '../container/AddedToBag.selectors';

describe('#Added to bag Selectors', () => {
  let AddedToBagState = fromJS({
    itemInfo: {
      quantity: '2',
    },
    error: false,
    isOpenAddedToBag: false,
  });
  AddedToBagState = AddedToBagState.set('itemInfo', {
    quantity: '2',
    orderItemId: 12345,
  });
  const CartPageState = fromJS({
    orderDetails: {
      pointsToNextReward: '2',
      estimatedRewards: '3',
      totalItems: '5',
      grandTotal: '100',
      giftCardsTotal: '6',
      orderItems: [
        {
          itemInfo: {
            itemId: 12345,
            quantity: '3',
          },
        },
      ],
    },
  });
  const state = {
    AddedToBagReducer: AddedToBagState,
    CartPageReducer: CartPageState,
  };
  it('#getAddedToBagData should return itemInfo', () => {
    expect(getAddedToBagData(state)).toEqual(AddedToBagState.get('itemInfo'));
  });
  it('#isOpenAddedToBag should return isOpenAddedToBag state', () => {
    expect(isOpenAddedToBag(state)).toEqual(AddedToBagState.get('isOpenAddedToBag'));
  });

  it('#getOrderItems should return state', () => {
    expect(getOrderItems(state)).toEqual(CartPageState.getIn(['orderDetails', 'orderItems']));
  });

  it('#getQuantityValue should return state', () => {
    expect(getQuantityValue(state)).toEqual('3');
  });

  it('#getQuantityValue should return state', () => {
    expect(
      getPointsSummary(CartPageState.get('orderDetails'), AddedToBagState.get('itemInfo'))
    ).toEqual({
      bagSubTotal: 94,
      itemPoints: 0,
      itemPrice: 0,
      pointsToNextReward: '2',
      totalItems: '5',
      userPoints: '3',
    });
  });
});
