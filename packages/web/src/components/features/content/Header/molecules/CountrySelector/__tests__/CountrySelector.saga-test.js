import { put } from 'redux-saga/effects';

import { fetchModuleX } from '../container/CountrySelector.saga';
import { setModuleXContent } from '../container/CountrySelector.actions';

describe('Country Selector Saga', () => {
  describe('fetchModuleX', () => {
    let ModuleXSaga;
    beforeEach(() => {
      ModuleXSaga = fetchModuleX('3a94a9e1-91d1-40d0-99f8-ff051604c874');
      ModuleXSaga.next();
      ModuleXSaga.next();
    });

    it('should dispatch setModuleX action after success response', () => {
      const result = {
        richText: '<b>NOTE:</b> If you change your shipping destination',
      };

      const moduleXResult = ModuleXSaga.next(result).value;
      expect(moduleXResult).toEqual(put(setModuleXContent(result.richText)));
    });
  });
});
