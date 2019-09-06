import { fromJS } from 'immutable';
import CreateAccountReducer from '../CreateAccount.reducer';
import { resetCreateAccountErr, createAccountErr } from '../CreateAccount.actions';

const initialState = fromJS({
  error: null,
});

describe('CreateAccount Reducer', () => {
  it('should return default state', () => {
    const state = CreateAccountReducer(undefined, {});
    expect(state.get('error')).toBeNull();
  });

  it('should return resetCreateAccount error state', () => {
    const state = CreateAccountReducer(initialState, resetCreateAccountErr('error'));
    expect(state.get('error')).toBeNull();
  });

  it('should return createAccount error state', () => {
    const state = CreateAccountReducer(initialState, createAccountErr('error'));
    expect(state.get('error')).toBe('error');
  });
});
