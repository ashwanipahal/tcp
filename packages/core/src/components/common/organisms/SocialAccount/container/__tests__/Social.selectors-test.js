import { fromJS } from 'immutable';

import {
  getSocialResponse,
  getsocialDataOnLoadState,
  getSocialDataFetchingState,
} from '../Social.selectors';

describe('#Social selector', () => {
  const SocialState = fromJS({
    socialDataOnLoad: {},
  });

  const state = {
    Social: SocialState,
  };

  it('#socialDataOnLoad should return socialDataOnLoad state', () => {
    expect(getSocialResponse(state)).toEqual(SocialState);
  });

  expect(getsocialDataOnLoadState(state)).toEqual(SocialState.get('socialDataOnLoad'));

  it('#getSocialDataFetchingState should return earnExtraPointsDataReducer state', () => {
    expect(getSocialDataFetchingState(state)).toEqual(SocialState.get('isFetching'));
  });
});
