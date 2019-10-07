import { fromJS } from 'immutable';
import { getLabels, getStoreFormattedList } from '../StoreList.selectors';

describe('#StoreList Selectors testcase', () => {
  it('#getLabels', () => {
    const state = {
      Labels: {
        StoreList: {},
      },
    };
    const result = getLabels(state);
    expect(result).toMatchObject({});
  });

  it('#getStoreFormattedList', () => {
    const state = {
      StoreListReducer: fromJS({
        storesSummaryListUS: [],
      }),
    };
    expect(getStoreFormattedList(state, 'US').size).toEqual(0);
  });
});
