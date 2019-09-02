import { select, takeLatest } from 'redux-saga/effects';
import { addAirmilesBanner, AddAirmilesBannerSaga } from '../AirmilesBanner.saga';
import AIRMILES_BANNER_CONSTANTS from '../../AirmilesBanner.constants';
import { getFormAirmilesNumber } from '../AirmilesBanner.selector';

describe('AddAirmilesBanner saga', () => {
  let gen;

  beforeEach(() => {
    gen = addAirmilesBanner();
  });
  it('should get airmilesBanner numbner', () => {
    expect(gen.next().value).toEqual(select(getFormAirmilesNumber));
  });

  it('should test AirmilesBanner', () => {
    gen = AddAirmilesBannerSaga();
    expect(gen.next().value).toEqual(
      takeLatest(AIRMILES_BANNER_CONSTANTS.ADD_AIRMILES_BANNER_REQUEST, addAirmilesBanner)
    );
    expect(gen.next().done).toBeTruthy();
  });
});
