import { fromJS } from 'immutable';
import SocialReducer from '../Social.reducer';
import SOCIAL_CONSTANTS from '../../social.constants';
import { DEFAULT_REDUCER_KEY } from '../../../../../../utils/cache.util';

describe('SocialReducer List reducer', () => {
  it('should return  default state', () => {
    expect(SocialReducer({}, {})).toEqual(fromJS({}));
  });

  it('should handle success SocialReducer', () => {
    const initialState = fromJS({
      [DEFAULT_REDUCER_KEY]: null,
      socialDataOnLoad: {},
      pointModalMountState: false,
    });
    const updatedState = SocialReducer(initialState, {
      type: SOCIAL_CONSTANTS.SET_SOCIAL_LOAD,
      payload: fromJS({}),
    });
    expect(updatedState.get('socialDataOnLoad')).toEqual(fromJS({}));
  });
});
