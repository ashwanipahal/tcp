import { fromJS } from 'immutable';
import SocialReducer from '../Social.reducer';
import SOCIAL_CONSTANTS from '../../social.constants';

describe('SocialReducer List reducer', () => {
  it('should return  default state', () => {
    const initialState = fromJS({
      socialDataOnLoad: {},
      isFetching: false,
    });
    expect(SocialReducer(initialState, {}));
  });

  it('should handle success SocialReducer', () => {
    const initialState = fromJS({
      socialDataOnLoad: {},
      isFetching: false,
    });

    // const result = fromJS({

    // })

    expect(
      SocialReducer(initialState, {
        type: SOCIAL_CONSTANTS.SET_SOCIAL_LOAD,
        payload: fromJS({}),
      })
    ).toEqual(
      fromJS({
        socialDataOnLoad: fromJS({}),
        isFetching: false,
      })
    );
  });
});
