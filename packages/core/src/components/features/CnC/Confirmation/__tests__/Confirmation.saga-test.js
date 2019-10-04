import { put } from 'redux-saga/effects';
import { fetchModuleX } from '../container/Confirmation.saga';
import { setUpdateOrderDetailsData } from '../container/Confirmation.actions';

describe('Module X Saga', () => {
  let moduleXGen;
  const payload = '66b73859-0893-4abe-9d0d-dc3d58fa2782';
  beforeEach(() => {
    moduleXGen = fetchModuleX({ payload });
  });
  describe('fetchmoduleX', () => {
    it('should dispatch setmoduleX action for success response', () => {
      const response = moduleXGen.next().value;
      expect(moduleXGen.next(response).value).toEqual(put(setUpdateOrderDetailsData(response)));
    });
  });
});
