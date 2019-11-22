import { fromJS } from 'immutable';
import {
  getAddedToBagData,
  isOpenAddedToBag,
  getOrderItems,
  getQuantityValue,
  getPointsSummary,
  getAddedToPickupError,
  getMultipleItemsAddedToBagError,
  getAddedToBagInterval,
} from '../container/AddedToBag.selectors';

describe('#Added to bag Selectors', () => {
  let AddedToBagState = fromJS({
    itemInfo: {
      quantity: '2',
    },
    error: false,
    pickupError: false,
    multipleItemsError: false,
    isOpenAddedToBag: false,
  });
  AddedToBagState = AddedToBagState.set('itemInfo', {
    quantity: '2',
    orderItemId: 12345,
  });
  AddedToBagState = AddedToBagState.set('itemInfoArray', [
    {
      quantity: 1,
      orderItemId: 12345,
    },
  ]);
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
            offerPrice: 2,
            itemPoints: 0,
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

  it('#getMultipleItemsAddedToBagError should return state', () => {
    expect(getMultipleItemsAddedToBagError(state)).toEqual(false);
  });

  it('#getAddedToPickupError should return state', () => {
    expect(getAddedToPickupError(state)).toEqual(false);
  });

  it('#getQuantityValue should return state', () => {
    expect(getQuantityValue(state)).toEqual('3');
  });

  it('#getPointsSummary should return state', () => {
    expect(
      getPointsSummary(CartPageState.get('orderDetails'), AddedToBagState.get('itemInfo'))
    ).toEqual({
      bagSubTotal: 94,
      itemPoints: 0,
      itemPrice: 2,
      pointsToNextReward: '2',
      totalItems: '5',
      userPoints: '3',
    });
  });
  it('#getPointsSummary should return state with multiple items', () => {
    expect(
      getPointsSummary(CartPageState.get('orderDetails'), AddedToBagState.get('itemInfoArray'))
    ).toEqual({
      bagSubTotal: 94,
      itemPoints: 0,
      itemPrice: 2,
      pointsToNextReward: '2',
      totalItems: '5',
      userPoints: '3',
    });
  });
});

describe('#Added to Bag Interval Selectors', () => {
  const sessionState = {
    siteDetails: {
      SFL_MAX_COUNT: '200',
      IS_SAVE_FOR_LATER_ENABLED: true,
    },
  };
  const state = {
    session: sessionState,
  };
  it('#getAddedToBagInterval should return Interval', () => {
    expect(getAddedToBagInterval(state)).toEqual(0);
  });
});
