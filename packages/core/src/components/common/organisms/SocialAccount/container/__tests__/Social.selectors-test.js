import { fromJS } from 'immutable';

import { getSocialResponse, getsocialDataOnLoadState } from '../Social.selectors';

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
});
