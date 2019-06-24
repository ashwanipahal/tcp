import { fromJS } from 'immutable';
import ModuleDReducer from '../container/ModuleD.reducer';

describe('ModuleD Reducer', () => {
  let state = '';
  beforeEach(() => {
    state = fromJS({});
  });
  test('should return intial state', () => {
    state = ModuleDReducer(undefined, { type: 'DEFAULT_STATE' });
    expect(state).toBeDefined();
  });
});
