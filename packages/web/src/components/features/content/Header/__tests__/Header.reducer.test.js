import { fromJS } from 'immutable';
import HEADER_CONSTANTS from '@tcp/core/src/components/common/organisms/Header/container/Header.constants';
import HeaderReducer from '@tcp/core/src/components/common/organisms/Header/container/Header.reducer';
import {
  openNavigationDrawer,
  closeNavigationDrawer,
  openMiniBag,
  closeMiniBag,
} from '@tcp/core/src/components/common/organisms/Header/container/Header.actions';

describe('Header Reducer', () => {
  let state = '';
  beforeEach(() => {
    state = fromJS({});
  });
  test('should return intial state', () => {
    state = HeaderReducer(undefined, { type: 'DEFAULT_STATE' });
    expect(state).toBeDefined();
  });
  test('should load Header data', () => {
    const action = {
      type: HEADER_CONSTANTS.LOAD_HEADER_DATA,
      data: 'Header data',
    };
    const newState = state.set('data', fromJS(action));
    expect(newState.get('data')).toEqual(fromJS(action));
  });
  test('should open Navigation Drawer', () => {
    state = HeaderReducer(state, openNavigationDrawer(true));
    expect(state.navigationDrawer).toEqual({
      open: true,
      close: false,
    });
  });

  test('should close Navigation Drawer', () => {
    state = HeaderReducer(state, closeNavigationDrawer());
    expect(state.navigationDrawer).toEqual({
      open: false,
      close: true,
    });
  });

  test('should open MiniBag', () => {
    state = HeaderReducer(state, openMiniBag(true));
    expect(state.miniBag).toEqual(true);
  });
  test('should close MiniBag', () => {
    state = HeaderReducer(state, closeMiniBag(false));
    expect(state.miniBag).toEqual(false);
  });
});
