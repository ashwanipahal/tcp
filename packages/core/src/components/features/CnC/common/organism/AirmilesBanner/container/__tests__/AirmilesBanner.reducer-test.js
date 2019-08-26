import { fromJS } from 'immutable';
import AirmilesBannerReducer from '../AirmilesBanner.reducer';
import AIRMILES_BANNER_CONSTANTS from '../../AirmilesBanner.constants';

describe('AirmilesBanner Reducer', () => {
  const initialState = fromJS({
    error: null,
    onAddAirmilesBanner: false,
  });

  it('should return empty AirmilesBanner as default state', () => {
    expect(AirmilesBannerReducer(undefined, {}).get('onAddAirmilesBanner')).toBeFalsy();
  });

  it('should be called on AirmilesBanner request', () => {
    expect(
      AirmilesBannerReducer(initialState, {
        type: AIRMILES_BANNER_CONSTANTS.ADD_AIRMILES_BANNER_REQUEST,
      })
    ).toEqual(fromJS({ onAddAirmilesBanner: true, error: null }));
  });

  it('should be called on failed', () => {
    const err = fromJS({
      statusCode: 400,
      message: 'Object not found inn res',
    });
    expect(
      AirmilesBannerReducer(initialState, {
        type: AIRMILES_BANNER_CONSTANTS.ADD_AIRMILES_BANNER_FAILED,
        payload: err,
      })
    ).toEqual(fromJS({ error: err, onAddAirmilesBanner: false }));
  });
});
