import { call, takeLatest } from 'redux-saga/effects';
import { addAirmilesBanner, AddAirmilesBannerSaga } from '../AirmilesBanner.saga';
import AIRMILES_BANNER_CONSTANTS from '../../AirmilesBanner.constants';
import addAirmilesBannerApi from '../../../../../../../../services/abstractors/CnC/AirmilesBanner';

describe('AddAirmilesBanner saga', () => {
  let gen;
  const payload = {
    promoId: '12312312312',
    cardNumber: '',
    orderId: '2232112',
  };

  beforeEach(() => {
    gen = addAirmilesBanner({ payload });
  });

  it('should Add airmilesBanner address', () => {
    expect(gen.next().value).toEqual(call(addAirmilesBannerApi, payload));
  });

  it('should test AirmilesBanner', () => {
    gen = AddAirmilesBannerSaga();
    expect(gen.next().value).toEqual(
      takeLatest(AIRMILES_BANNER_CONSTANTS.ADD_AIRMILES_BANNER_REQUEST, addAirmilesBanner)
    );
    expect(gen.next().done).toBeTruthy();
  });
});
