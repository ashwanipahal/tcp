import { fromJS } from 'immutable';
import {
  getEarnExtraPointsDataState,
  getEarnedPointsNotificationState,
  getCommonLabels,
  getEarnExtraPointsLabels,
  getEarnExtraPointsFetchingState,
} from '../EarnExtraPointsTile.selectors';

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

  it('#getEarnExtraPointsFetchingState should return earnExtraPointsDataReducer state', () => {
    const ExtraPointsState = fromJS({
      isFetching: false,
    });
    const state = {
      earnExtraPointsReducer: ExtraPointsState,
    };
    expect(getEarnExtraPointsFetchingState(state)).toEqual(ExtraPointsState.get('isFetching'));
  });

  it('#getEarnedPointsNotificationState should return earnExtraPointsDataReducer state', () => {
    const earnedPointsNotificationState = fromJS({
      earnedPointsNotificationData: [],
    });
    const state = {
      earnExtraPointsReducer: earnedPointsNotificationState,
    };

    expect(getEarnedPointsNotificationState(state)).toEqual(
      earnedPointsNotificationState.get('earnedPointsNotificationData')
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

  it('#getEarnExtraPointsLabels should return all the account labels', () => {
    const state = {
      Labels: {
        account: {
          earnExtraPoints: {},
        },
      },
    };
    expect(getEarnExtraPointsLabels(state)).toMatchObject({});
  });
});
