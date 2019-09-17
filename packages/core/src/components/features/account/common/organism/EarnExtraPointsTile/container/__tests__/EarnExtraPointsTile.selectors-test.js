import { fromJS } from 'immutable';
import { getEarnExtraPointsDataState, getCommonLabels } from '../EarnExtraPointsTile.selectors';

describe('#earn Extra Points selector', () => {
  it('#getEarnExtraPointsDataState should return earnExtraPointsDataReducer state', () => {
    const earnExtraPointsDataState = fromJS({
      earnExtraPointsData: [],
    });
    const state = {
      earnExtraPointsReducer: earnExtraPointsDataState,
    };

    expect(getEarnExtraPointsDataState(state)).toEqual(
      earnExtraPointsDataState.get('earnExtraPointsData')
    );
  });

  it('#getCommonLabels should return all the account labels', () => {
    const state = {
      Labels: {
        account: {
          common: {},
        },
      },
    };
    expect(getCommonLabels(state)).toMatchObject({});
  });
});
