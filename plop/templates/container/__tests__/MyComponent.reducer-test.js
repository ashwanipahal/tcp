import { fromJS } from 'immutable';
import constants from '../MyComponent.constants';
import MyComponentReducer from '../MyComponent.reducer';

describe('MyComponent Reducer', () => {
  it('should return default state', () => {
    const initialState = fromJS({});
    expect(MyComponentReducer(initialState, {}).get('action_one')).not.toBeDefined();
  });

  it('should return success state', () => {
    const initialState = fromJS({});
    expect(
      MyComponentReducer(initialState, {
        type: constants.MY_COMPONENT_TEST_ACTION_ONE,
        payload: 'test',
      }).get('action_one')
    ).toEqual('test');
  });

  it('should return error state', () => {
    const initialState = fromJS({});
    expect(
      MyComponentReducer(initialState, {
        type: constants.MY_COMPONENT_TEST_ACTION_TWO,
        payload: 'test',
      }).get('action_two')
    ).toEqual('test');
  });
});
