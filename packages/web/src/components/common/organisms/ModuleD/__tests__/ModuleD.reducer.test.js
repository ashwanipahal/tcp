import { fromJS } from 'immutable';
import MODULE_D_CONSTANTS from '../ModuleD.constants';
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
  test('should load ModuleD data', () => {
    const action = {
      type: MODULE_D_CONSTANTS.LOAD_MODULE_D_DATA,
      data: 'Module data',
    };
    const newState = state.set('data', fromJS(action));
    expect(newState.get('data')).toEqual(fromJS(action));
  });
});
