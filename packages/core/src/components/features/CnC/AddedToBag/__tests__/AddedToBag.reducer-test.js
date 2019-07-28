import { Map, fromJS } from 'immutable';
import AddedToBagReducer from '../container/AddedToBag.reducer';
import {
  AddToCartError,
  SetAddedToBagData,
  openAddedToBag,
  closeAddedToBag,
} from '../container/AddedToBag.actions';

const payload = {
  isGiftCard: false,
  productName: 'Girls Short Sleeve Embellished Unicorn Frappe Graphic Striped Top',
  skuInfo: {
    skuId: '1299431',
    imageUrl: '/wcsstore/GlobalSAS/images/tcp/products/500/3003773_32CV.jpg',
    color: {
      name: 'RASPBERRY PINK',
      imagePath: '/wcsstore/GlobalSAS/images/tcp/products/swatches/3003773_32CV.jpg',
      family: 'PINK',
    },
    variantId: '00193511156691',
    unbxdProdId: '3003773_32CV',
    productId: '3003773_32CV',
    fit: '',
    size: 'L (10/12)',
  },
  quantity: 1,
  orderItemId: '1101151844',
};

describe('Added to bag Reducer', () => {
  it('should return itemInfo object for the data', () => {
    expect(AddedToBagReducer(undefined, SetAddedToBagData(payload)).get('itemInfo')).toBe(payload);
  });

  it('should return itemInfo object for the added to bag data if state is passed as an array', () => {
    const state = AddedToBagReducer(fromJS({}), {});
    expect(Map.isMap(state)).toBeTruthy();
  });

  it('should return isFetching true', () => {
    const initialState = fromJS({
      isOpenAddedToBag: false,
    });
    expect(AddedToBagReducer(initialState, openAddedToBag())).toEqual(
      fromJS({ isOpenAddedToBag: true })
    );
  });

  it('should return isFetching false', () => {
    const initialState = fromJS({
      isOpenAddedToBag: true,
    });
    expect(AddedToBagReducer(initialState, closeAddedToBag())).toEqual(
      fromJS({ isOpenAddedToBag: false })
    );
  });
  it('should return error as error if error occurs', () => {
    const err = fromJS({
      statusCode: 400,
      message: 'Object not found',
    });
    const initialState = fromJS({
      error: false,
    });
    expect(AddedToBagReducer(initialState, AddToCartError(err))).toEqual(fromJS({ error: err }));
  });
});
