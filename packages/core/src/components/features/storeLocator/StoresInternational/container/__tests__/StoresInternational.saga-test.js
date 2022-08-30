import { takeLatest, put } from 'redux-saga/effects';
import { validateReduxCache } from '@tcp/core/src/utils/cache.util';
import StoresInternationalSagas, { fetchModuleX } from '../StoresInternational.saga';
import STORES_INTL_CONSTANTS from '../StoresInternational.constants';
import { setModuleXContent } from '../StoresInternational.actions';

describe('StoresInternational Saga', () => {
  describe('fetch successfully', () => {
    beforeAll(() => {
      jest.mock('../StoresInternational.actions', () => ({
        setModuleXContent: jest.fn(),
      }));
      jest.mock('@tcp/core/src/services/abstractors/common/moduleX', () => ({
        getModuleX: jest.fn(),
      }));
    });

    it('should fetch module x', () => {
      const moduleX = fetchModuleX({ payload: 'test' });
      moduleX.next();
      const result = moduleX.next({
        richText: 'test',
      });
      expect(result.value).toEqual(put(setModuleXContent('test')));
    });

    it('should work for empty payload', () => {
      const moduleX = fetchModuleX({});
      moduleX.next();
      const result = moduleX.next();
      expect(result.value).toEqual(null);
    });
  });

  it('should take latest on get module x action', () => {
    const result = StoresInternationalSagas().next();
    expect(JSON.stringify(result.value)).toEqual(
      JSON.stringify(
        takeLatest(
          STORES_INTL_CONSTANTS.STORES_INTERNATIONAL_GET_MODULEX,
          validateReduxCache(fetchModuleX)
        )
      )
    );
  });
});
