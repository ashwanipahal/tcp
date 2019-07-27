import { fromJS } from 'immutable';
import { getAddedToBagData, isOpenAddedToBag } from '../container/AddedToBag.selectors';

describe('#Added to bag Selectors', () => {
  const AddedToBagState = fromJS({
    itemInfo: {},
    error: false,
    isOpenAddedToBag: false,
  });
  const state = {
    AddedToBagReducer: AddedToBagState,
  };
  it('#getAddedToBagData should return itemInfo', () => {
    expect(getAddedToBagData(state)).toEqual(AddedToBagState.get('itemInfo'));
  });
  it('#isOpenAddedToBag should return isOpenAddedToBag state', () => {
    expect(isOpenAddedToBag(state)).toEqual(AddedToBagState.get('isOpenAddedToBag'));
  });
});
