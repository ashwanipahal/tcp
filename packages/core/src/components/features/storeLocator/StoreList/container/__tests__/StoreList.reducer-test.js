import { fromJS, Map } from 'immutable';
import StoreListReducer, { initialState } from '../StoreList.reducer';
import { setStoreList } from '../StoreList.actions';

describe('StoreList Reducer', () => {
  it('should return state as Map object if state is passsed as an object', () => {
    const state = StoreListReducer({}, {});
    expect(Map.isMap(state)).toBeTruthy();
  });
  it('should get an initial state when the reducer is called first', () => {
    const state = StoreListReducer(undefined, {});
    expect(state).toEqual(initialState);
  });

  it('should set the current store', () => {
    const payload = {
      id: 'US',
      stores: [
        {
          test: 'test',
        },
      ],
    };

    const expected = fromJS({
      cacheUntil: null,
      storesSummaryListUS: [
        {
          test: 'test',
        },
      ],
      storesSummaryListCA: [],
      storesSummaryListOthers: [],
    });
    const state = StoreListReducer(initialState, setStoreList(payload));
    expect(state.get('storesSummaryListUS').length).toEqual(
      expected.get('storesSummaryListUS').size
    );
  });
});
