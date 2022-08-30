import { fromJS } from 'immutable';
import { getRewardsPointsBannerContent } from '../AccountHeader.selectors';
import { ACCOUNTHEADER_REDUCER_KEY } from '../../../../../../../../constants/reducer.constants';

describe('#AccountHeader selector', () => {
  it('#getRewardsPointsBannerContent should return rewardsPointsBannerContent', () => {
    const state = {
      [ACCOUNTHEADER_REDUCER_KEY]: fromJS({
        rewardsPointsBannerContent: 'test',
      }),
    };

    expect(getRewardsPointsBannerContent(state)).toEqual('test');
  });
});
